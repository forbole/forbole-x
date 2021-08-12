import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing'
import { stringToPath } from '@cosmjs/crypto'
import { SigningStargateClient } from '@cosmjs/stargate'
import camelCase from 'lodash/camelCase'
import set from 'lodash/set'
import get from 'lodash/get'
// eslint-disable-next-line import/no-extraneous-dependencies
import Long from 'long'
import { SigningCosmosClient, Secp256k1HdWallet, makeSignDoc } from '../@cosmjs/launchpad'
import { LedgerSigner } from '../@cosmjs/ledger-amino'
import cryptocurrencies from './cryptocurrencies'
import sendMsgToChromeExt from './sendMsgToChromeExt'

const typeUrlMap: any = {
  'cosmos-sdk/MsgDelegate': '/cosmos.staking.v1beta1.MsgDelegate',
  'cosmos-sdk/MsgUndelegate': '/cosmos.staking.v1beta1.MsgUndelegate',
  'cosmos-sdk/MsgBeginRedelegate': '/cosmos.staking.v1beta1.MsgBeginRedelegate',
  'cosmos-sdk/MsgWithdrawDelegationReward':
    '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
  'cosmos-sdk/MsgSend': '/cosmos.bank.v1beta1.MsgSend',
  'cosmos-sdk/MsgTransfer': '/ibc.applications.transfer.v1.MsgTransfer',
  'cosmos-sdk/MsgSubmitProposal': '/cosmos.gov.v1beta1.MsgSubmitProposal',
}

const formatTransactionMsg = (msg: any) => {
  const transformedMsg: any = {}
  if (msg.type === 'cosmos-sdk/MsgTransfer') {
    set(msg, 'value.timeout_timestamp', new Long(get(msg, 'value.timeout_timestamp', 0)))
  }
  transformedMsg.typeUrl = typeUrlMap[msg.type]
  transformedMsg.value = {}
  Object.keys(msg.value).forEach((k) => {
    transformedMsg.value[camelCase(k)] = msg.value[k]
  })
  return transformedMsg
}

const signAndBroadcastCosmosTransaction = async (
  mnemonic: string,
  crypto: string,
  index: number,
  transactionData: any,
  ledgerTransport?: any
): Promise<any> => {
  const signerOptions = {
    hdPaths: [stringToPath(`m/44'/${cryptocurrencies[crypto].coinType}'/0'/0/${index}`)],
    prefix: cryptocurrencies[crypto].prefix,
  }
  // if Stargate format not supported (governance)
  if (!typeUrlMap[get(transactionData, 'msgs[0].type', '')]) {
    let signer
    if (!ledgerTransport) {
      signer = await Secp256k1HdWallet.fromMnemonic(mnemonic, signerOptions)
    } else {
      signer = new LedgerSigner(ledgerTransport, signerOptions as any)
    }
    const accounts = await signer.getAccounts()
    const client = new SigningCosmosClient(
      cryptocurrencies[crypto].lcdEndpoint,
      accounts[0].address,
      signer
    )
    const chainId = await client.getChainId()
    const { accountNumber, sequence } = await client.getSequence(accounts[0].address)
    const signDoc = makeSignDoc(
      transactionData.msgs,
      transactionData.fee,
      chainId,
      transactionData.memo,
      accountNumber,
      sequence
    )
    const signAmino = await signer.signAmino(accounts[0].address, signDoc)
    const result = await client.broadcastTx({
      msg: transactionData.msgs,
      fee: transactionData.fee,
      memo: transactionData.memo,
      signatures: [signAmino.signature],
    })
    return result
  }
  let signer
  if (!ledgerTransport) {
    signer = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, signerOptions)
  } else {
    signer = new LedgerSigner(ledgerTransport, signerOptions as any)
  }
  const accounts = await signer.getAccounts()
  const client = await SigningStargateClient.connectWithSigner(
    cryptocurrencies[crypto].rpcEndpoint,
    signer
  )
  const result = await client.signAndBroadcast(
    accounts[0].address,
    transactionData.msgs.map((msg: any) => formatTransactionMsg(msg)),
    transactionData.fee,
    transactionData.memo
  )
  return result
}

const signAndBroadcastTransaction = async (
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
    const result = await signAndBroadcastCosmosTransaction(
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

export default signAndBroadcastTransaction
