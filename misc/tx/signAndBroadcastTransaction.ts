/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing'
import { stringToPath } from '@cosmjs/crypto'
import { AminoTypes, SigningStargateClient } from '@cosmjs/stargate'
import set from 'lodash/set'
import get from 'lodash/get'
import cloneDeep from 'lodash/cloneDeep'
import { TextProposal } from 'cosmjs-types/cosmos/gov/v1beta1/gov'
import { ParameterChangeProposal } from 'cosmjs-types/cosmos/params/v1beta1/params'
import { SoftwareUpgradeProposal } from 'cosmjs-types/cosmos/upgrade/v1beta1/upgrade'
import { CommunityPoolSpendProposal } from 'cosmjs-types/cosmos/distribution/v1beta1/distribution'
import { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx'
import { PubKey } from 'cosmjs-types/cosmos/crypto/secp256k1/keys'
import Long from 'long'
import { LedgerSigner } from '@cosmjs/ledger-amino'
import { fromBase64 } from '@cosmjs/encoding'
import cryptocurrencies from '../cryptocurrencies'
import sendMsgToChromeExt from '../sendMsgToChromeExt'
import { Bech32Address } from '../../desmos-proto/profiles/v1beta1/models_chain_links'
import { aminoAdditions, registry } from './customTxTypes'

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
  if (transformedMsg.typeUrl === '/desmos.profiles.v1beta1.MsgLinkChainAccount') {
    set(
      transformedMsg,
      'value.chainAddress.value',
      Uint8Array.from(
        Bech32Address.encode(
          Bech32Address.fromPartial(get(transformedMsg, 'value.chainAddress.value', {}))
        ).finish()
      )
    )

    set(
      transformedMsg,
      'value.proof.pubKey.value',
      Uint8Array.from(
        PubKey.encode(
          PubKey.fromPartial({
            key: fromBase64(get(transformedMsg, 'value.proof.pubKey.value', '')),
          })
        ).finish()
      )
    )
    console.log(transformedMsg)
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

const signAndBroadcastCosmosTransaction = async (
  mnemonic: string,
  crypto: string,
  account: number,
  change: number,
  index: number,
  transactionData: any,
  ledgerTransport?: any,
  onSignEnd?: () => void
): Promise<any> => {
  const signerOptions = {
    hdPaths: [
      stringToPath(
        `m/44'/${cryptocurrencies[crypto].coinType}'/${account || 0}'/${change || 0}/${index || 0}`
      ),
    ],
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
    cryptocurrencies[crypto].rpcApiUrl,
    signer,
    {
      registry,
      aminoTypes: new AminoTypes({ additions: aminoAdditions, prefix: signerOptions.prefix }),
    }
  )
  const tx = await client.sign(
    accounts[0].address,
    transactionData.msgs.map((msg: any) => formatTransactionMsg(msg)),
    transactionData.fee,
    transactionData.memo
  )
  if (onSignEnd) {
    onSignEnd()
  }
  const result = await client.broadcastTx(TxRaw.encode(tx).finish())
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
  ledgerTransport?: any,
  onSignEnd?: () => void
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
      account.account,
      account.change,
      account.index,
      transactionData,
      ledgerTransport,
      onSignEnd
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
