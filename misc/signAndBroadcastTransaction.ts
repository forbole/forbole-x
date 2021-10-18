/* eslint-disable import/no-extraneous-dependencies */
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing'
import { stringToPath } from '@cosmjs/crypto'
import { SigningStargateClient } from '@cosmjs/stargate'
import set from 'lodash/set'
import get from 'lodash/get'
import cloneDeep from 'lodash/cloneDeep'
import { TextProposal } from 'cosmjs-types/cosmos/gov/v1beta1/gov'
import { ParameterChangeProposal } from 'cosmjs-types/cosmos/params/v1beta1/params'
import { SoftwareUpgradeProposal } from 'cosmjs-types/cosmos/upgrade/v1beta1/upgrade'
import { CommunityPoolSpendProposal } from 'cosmjs-types/cosmos/distribution/v1beta1/distribution'
import Long from 'long'
import { LedgerSigner } from '@cosmjs/ledger-amino'
import cryptocurrencies from './cryptocurrencies'
import sendMsgToChromeExt from './sendMsgToChromeExt'

const formatTransactionMsg = (msg: TransactionMsg) => {
  const transformedMsg = cloneDeep(msg)
  if (transformedMsg.typeUrl === '/ibc.applications.transfer.v1.MsgTransfer') {
    set(
      transformedMsg,
      'value.timeoutTimestamp',
      new Long(get(transformedMsg, 'value.timeoutTimestamp', 0))
    )
  }
  if (
    transformedMsg.typeUrl === '/cosmos.gov.v1beta1.MsgDeposit' ||
    transformedMsg.typeUrl === '/cosmos.gov.v1beta1.MsgVote'
  ) {
    set(transformedMsg, 'value.proposalId', new Long(get(transformedMsg, 'value.proposalId', 0)))
  }

  if (get(msg, 'value.content.typeUrl') === '/cosmos.gov.v1beta1.TextProposal') {
    set(
      transformedMsg,
      'value.content.value',
      Uint8Array.from(
        TextProposal.encode(TextProposal.fromPartial(get(msg, 'value.content.value'))).finish()
      )
    )
  } else if (
    get(msg, 'value.content.typeUrl') === '/cosmos.params.v1beta1.ParameterChangeProposal'
  ) {
    set(
      transformedMsg,
      'value.content.value',
      Uint8Array.from(
        ParameterChangeProposal.encode(
          ParameterChangeProposal.fromPartial(get(msg, 'value.content.value'))
        ).finish()
      )
    )
  } else if (
    get(msg, 'value.content.typeUrl') === '/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal'
  ) {
    set(
      transformedMsg,
      'value.content.value.plan.height',
      new Long(get(transformedMsg, 'value.content.value.plan.height', 0))
    )
    set(
      transformedMsg,
      'value.content.value',
      Uint8Array.from(
        SoftwareUpgradeProposal.encode(
          SoftwareUpgradeProposal.fromPartial(get(transformedMsg, 'value.content.value'))
        ).finish()
      )
    )
  } else if (
    get(msg, 'value.content.typeUrl') === '/cosmos.distribution.v1beta1.CommunityPoolSpendProposal'
  ) {
    set(
      transformedMsg,
      'value.content.value',
      Uint8Array.from(
        CommunityPoolSpendProposal.encode(
          CommunityPoolSpendProposal.fromPartial(get(msg, 'value.content.value'))
        ).finish()
      )
    )
  }

  return transformedMsg
}

const signCosmosTransaction = async (
  mnemonic: string,
  crypto: string,
  index: number,
  transactionData: any,
  ledgerTransport?: any
): Promise<any> => {
  const signerOptions = {
    hdPaths: [stringToPath(`m/44'/${cryptocurrencies[crypto].coinType}'/${index}'/0/0`)],
    prefix: cryptocurrencies[crypto].prefix,
  }
  let signer
  if (!ledgerTransport) {
    signer = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, signerOptions)
  } else {
    signer = new LedgerSigner(ledgerTransport, {
      ...signerOptions,
      ledgerAppName: cryptocurrencies[crypto].ledgerAppName,
    } as any)
  }
  const accounts = await signer.getAccounts()
  const client = await SigningStargateClient.connectWithSigner(
    cryptocurrencies[crypto].rpcEndpoint,
    signer
  )
  const signResult = await client.sign(
    accounts[0].address,
    transactionData.msgs.map((msg: any) => formatTransactionMsg(msg)),
    transactionData.fee,
    transactionData.memo
  )
  // if (!signResult.rawLog.match(/^\[/)) {
  //   throw new Error(result.rawLog)
  // }
  return signResult
}

const signTransaction = async (
  password: string,
  account: Account,
  transactionData: any,
  securityPassword: string,
  ledgerTransport?: any
): Promise<any> => {
  const channel = new BroadcastChannel('forbole-x')
  try {
    const { mnemonic } = await sendMsgToChromeExt({
      event: 'viewMnemonicPhrase',
      data: { password, id: account.walletId, securityPassword },
    })
    // TODO: handle other ecosystem
    const signResult = await signCosmosTransaction(
      mnemonic,
      account.crypto,
      account.index,
      transactionData,
      ledgerTransport
    )
    channel.postMessage({
      event: 'transactionSuccess',
      data: signResult,
    })
    return signResult
  } catch (err) {
    channel.postMessage({
      event: 'transactionFail',
      data: err,
    })
    throw err
  }
}

const broadcastCosmosTransaction = async (
  mnemonic: string,
  crypto: string,
  index: number,
  transactionData: any,
  ledgerTransport?: any
): Promise<any> => {
  const signerOptions = {
    hdPaths: [stringToPath(`m/44'/${cryptocurrencies[crypto].coinType}'/${index}'/0/0`)],
    prefix: cryptocurrencies[crypto].prefix,
  }
  let signer
  if (!ledgerTransport) {
    signer = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, signerOptions)
  } else {
    signer = new LedgerSigner(ledgerTransport, {
      ...signerOptions,
      ledgerAppName: cryptocurrencies[crypto].ledgerAppName,
    } as any)
  }
  const accounts = await signer.getAccounts()
  const client = await SigningStargateClient.connectWithSigner(
    cryptocurrencies[crypto].rpcEndpoint,
    signer
  )
  // const signResult = await client.sign(accounts[0].address,
  //   transactionData.msgs.map((msg: any) => formatTransactionMsg(msg)),
  //   transactionData.fee,
  //   transactionData.memo)
  // const result = await client.signAndBroadcast(
  //   accounts[0].address,
  //   transactionData.msgs.map((msg: any) => formatTransactionMsg(msg)),
  //   transactionData.fee,
  //   transactionData.memo
  // )

  const broadcastResult = await client.broadcastTx(transactionData)
  if (!broadcastResult.rawLog.match(/^\[/)) {
    throw new Error(broadcastResult.rawLog)
  }
  return broadcastResult
}

const broadcastTransaction = async (
  password: string,
  account: Account,
  transactionData: any,
  securityPassword: string,
  ledgerTransport?: any
): Promise<any> => {
  const channel = new BroadcastChannel('forbole-x')
  try {
    const { mnemonic } = await sendMsgToChromeExt({
      event: 'viewMnemonicPhrase',
      data: { password, id: account.walletId, securityPassword },
    })
    // TODO: handle other ecosystem
    const result = await broadcastCosmosTransaction(
      mnemonic,
      account.crypto,
      account.index,
      transactionData,
      ledgerTransport
    )
    channel.postMessage({
      event: 'transactionSuccess',
      data: result,
    })
    return result
  } catch (err) {
    channel.postMessage({
      event: 'transactionFail',
      data: err,
    })
    throw err
  }
}

const signAndBroadcastCosmosTransaction = async (
  mnemonic: string,
  crypto: string,
  index: number,
  transactionData: any,
  signingTx: () => void,
  ledgerTransport?: any
): Promise<any> => {
  const signerOptions = {
    hdPaths: [stringToPath(`m/44'/${cryptocurrencies[crypto].coinType}'/${index}'/0/0`)],
    prefix: cryptocurrencies[crypto].prefix,
  }
  let signer
  if (!ledgerTransport) {
    signer = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, signerOptions)
  } else {
    signer = new LedgerSigner(ledgerTransport, {
      ...signerOptions,
      ledgerAppName: cryptocurrencies[crypto].ledgerAppName,
    } as any)
  }
  const accounts = await signer.getAccounts()
  const client = await SigningStargateClient.connectWithSigner(
    cryptocurrencies[crypto].rpcEndpoint,
    signer
  )

  const txRaw = await client.sign(
    accounts[0].address,
    transactionData.msgs.map((msg: any) => formatTransactionMsg(msg)),
    transactionData.fee,
    transactionData.memo
  )

  signingTx()

  const result = await client.broadcastTx(transactionData)

  console.log('signAndBroadcastCosmosTransaction', result)

  // const result = await client.signAndBroadcast(
  //   accounts[0].address,
  //   transactionData.msgs.map((msg: any) => formatTransactionMsg(msg)),
  //   transactionData.fee,
  //   transactionData.memo
  // )

  // const broadcastResult = await client.broadcastTx(transactionData)
  if (!result.rawLog.match(/^\[/)) {
    throw new Error(result.rawLog)
  }
  return result
}

const signAndBroadcastTransaction = async (
  password: string,
  account: Account,
  transactionData: any,
  securityPassword: string,
  signingTx: () => void,
  ledgerTransport?: any
): Promise<any> => {
  const channel = new BroadcastChannel('forbole-x')
  try {
    console.log('account', account)
    const { mnemonic } = await sendMsgToChromeExt({
      event: 'viewMnemonicPhrase',
      data: { password, id: account.walletId, securityPassword },
    })
    // TODO: handle other ecosystem
    const result = await signAndBroadcastCosmosTransaction(
      mnemonic,
      account.crypto,
      account.index,
      transactionData,
      ledgerTransport,
      signingTx()
    )
    // signer()
    channel.postMessage({
      event: 'transactionSuccess',
      data: result,
    })
    return result
  } catch (err) {
    channel.postMessage({
      event: 'transactionFail',
      data: err,
    })
    throw err
  }
}

export default signAndBroadcastTransaction
// export { signTransaction, broadcastTransaction }
