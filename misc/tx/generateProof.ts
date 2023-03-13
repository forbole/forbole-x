/* eslint-disable import/no-extraneous-dependencies */
import {
  decodeSignature,
  Secp256k1HdWallet,
  Secp256k1Wallet,
  serializeSignDoc,
  StdFee,
} from '@cosmjs/amino'
import { stringToPath } from '@cosmjs/crypto'
import { LedgerSigner } from '@cosmjs/ledger-amino'
import { toBase64, toHex } from '@cosmjs/encoding'
import TerraApp from '@terra-money/ledger-terra-js'
import {
  AuthInfo,
  Extension,
  Fee,
  LCDClient,
  MsgSend,
  SignDoc,
  TxBody,
} from '@terra-money/terra.js'
import { signatureImport } from 'secp256k1'
import get from 'lodash/get'
import { sortedJsonStringify } from '@cosmjs/amino/build/signdoc'
import { ChainInfo } from '@keplr-wallet/types'
import { singleSignatureToAny } from '@desmoslabs/desmjs/build/aminomessages/profiles'
import {
  Proof,
  SignatureValueType,
  SingleSignature,
} from '@desmoslabs/desmjs-types/desmos/profiles/v3/models_chain_links'
import { SignerData } from '@cosmjs/stargate'
import { Any } from '@desmoslabs/desmjs-types/google/protobuf/any'
import { PubKey } from 'cosmjs-types/cosmos/crypto/secp256k1/keys'
import _ from 'lodash'
import { WalletOption } from './getWalletAddress'

let terraStation: Extension

const signProofWithTerraStation = (tx: any) =>
  new Promise((resolve, reject) => {
    if (!terraStation) {
      terraStation = new Extension()
    }
    if (!terraStation.isAvailable) {
      reject(new Error('no terra station'))
    }
    terraStation.connect()
    terraStation.once(({ error, address }) => {
      if (error) {
        reject(new Error(error.message || 'Unknown Error'))
      }
      terraStation.sign({
        msgs: [new MsgSend(address, address, { uluna: 0 })],
        memo: tx.memo,
        fee: Fee.fromAmino(tx.fee),
      })
      terraStation.once((payload) => {
        if (payload.error) {
          reject(new Error(payload.error.message || 'Unknown Error'))
        }
        resolve(payload)
      })
    })
  })

const signProofWithKeplr = async (proof: any, chainId: string, keplrChainInfo: ChainInfo) => {
  try {
    if (!window.keplr) {
      throw new Error('no keplr')
    }
    await window.keplr.enable(chainId)
    const signer = window.keplr.getOfflineSigner(chainId)
    const [account] = await signer.getAccounts()
    const result = await signer.signAmino(account.address, proof)
    return { account, result }
  } catch (err) {
    if (err.message.includes('There is no chain info') && keplrChainInfo) {
      // Suggest chain
      await window.keplr.experimentalSuggestChain(keplrChainInfo)
      await window.keplr.enable(chainId)
      const signer = window.keplr.getOfflineSigner(chainId)
      const [account] = await signer.getAccounts()
      const result = await signer.signAmino(account.address, proof)
      return { account, result }
    }
    throw err
  }
}

const signWithMnemonic = async (signerAddress: string, mnemonic: string, option: WalletOption) => {
  const fees: StdFee = {
    gas: '0',
    amount: [],
  }
  const signerData: any = {
    accountNumber: '0',
    chainId: option.chainId,
    sequence: '0',
  }

  const signerOptions: any = {
    hdPaths: [
      stringToPath(
        `m/44'/${option.coinType}'/${option.account || 0}'/${option.change || 0}/${
          option.index || 0
        }`
      ),
    ],
    prefix: option.prefix,
  }

  const signer = await Secp256k1HdWallet.fromMnemonic(mnemonic, signerOptions)
  const [ac] = await signer.getAccounts()

  return signer.signAmino(ac.address, {
    msgs: [],
    memo: signerAddress,
    fee: fees,
    sequence: signerData.sequence,
    chain_id: signerData.chainId,
    account_number: signerData.accountNumber,
  })
}

const generateProofMnemonic = async (
  signerAddress: string,
  mnemonic: string,
  option: WalletOption
) => {
  const fees: StdFee = {
    gas: '0',
    amount: [],
  }
  const signerData: any = {
    accountNumber: '0',
    chainId: option.chainId,
    sequence: '0',
  }

  const signerOptions: any = {
    hdPaths: [
      stringToPath(
        `m/44'/${option.coinType}'/${option.account || 0}'/${option.change || 0}/${
          option.index || 0
        }`
      ),
    ],
    prefix: option.prefix,
  }

  const signer = await Secp256k1HdWallet.fromMnemonic(mnemonic, signerOptions)
  const [ac] = await signer.getAccounts()

  const signResult = await signer.signAmino(ac.address, {
    msgs: [],
    memo: signerAddress,
    fee: fees,
    sequence: signerData.sequence,
    chain_id: signerData.chainId,
    account_number: signerData.accountNumber,
  })

  const proofPlainText = toHex(serializeSignDoc(signResult.signed))

  const proofSignature = singleSignatureToAny(
    SingleSignature.fromPartial({
      valueType: SignatureValueType.SIGNATURE_VALUE_TYPE_COSMOS_AMINO,
      signature: decodeSignature(signResult.signature).signature,
    })
  )

  const proofPubKey = {
    typeUrl: '/cosmos.crypto.secp256k1.PubKey',
    value: PubKey.encode(
      PubKey.fromPartial({
        key: ac.pubkey,
      })
    ).finish(),
  }

  return Proof.fromPartial({
    signature: proofSignature as any,
    plainText: proofPlainText,
    pubKey: proofPubKey,
  })
}

/**
 * Generate proof for chain links
 * The Uint8Array values are encoded into hex so they can be sent to the extension
 */
const generateProof = async (
  signerAddress: string,
  mnemonicOrPrivateKey: string,
  option: WalletOption,
  ledgerTransport?: any,
  isKeplr?: boolean,
  isTerraStation?: boolean,
  proofText?: string
): Promise<{ proof: ChainLinkProof; address: string }> => {
  // Reformat input proof if it is already provided

  // Proof has 3 components:
  // 1. plainText
  // 2. pubKey
  // 3. signature

  let proofPlainText
  let proofPubKey
  let proofSignature
  // address is not part of proof, but is expected as the return object of the function
  let proofAddress

  if (proofText) {
    try {
      const proofObj = JSON.parse(proofText)
      proofPlainText = proofObj.proof.plain_text
      proofSignature = singleSignatureToAny(
        SingleSignature.fromPartial({
          valueType: proofObj.proof.pub_key.valueType,
          signature: proofObj.proof.pub_key.value,
        })
      )
      proofPubKey = {
        typeUrl: '/cosmos.crypto.secp256k1.PubKey',
        value: proofObj.proof.pub_key.value,
      }

      proofAddress = proofObj.address.value
    } catch (err) {
      window.alert(`Error parsing proof object ${err.message} `)
    }
  }
  const proof = {
    account_number: '0',
    chain_id: option.chainId,
    fee: {
      amount: [
        {
          amount: '0',
          denom: option.feeDenom,
        },
      ],
      gas: '1',
    },
    memo: signerAddress,
    msgs: [],
    sequence: '0',
  }

  // private key wallets
  if (option.isPrivateKey) {
    const signer = await Secp256k1Wallet.fromKey(
      Buffer.from(mnemonicOrPrivateKey, 'hex'),
      option.prefix
    )
    const [ac] = await signer.getAccounts()
    const { signature: _signature } = await signer.signAmino(ac.address, proof)

    proofPlainText = Buffer.from(JSON.stringify(proof, null, 0)).toString('hex')
    proofPubKey = {
      typeUrl: '/cosmos.crypto.secp256k1.PubKey',
      value: PubKey.encode(
        PubKey.fromPartial({
          key: ac.pubkey,
        })
      ).finish(),
    }
    proofSignature = singleSignatureToAny(
      SingleSignature.fromPartial({
        valueType: SignatureValueType.SIGNATURE_VALUE_TYPE_COSMOS_AMINO,
        signature: decodeSignature(_signature).signature,
      })
    )
    proofAddress = ac.address
  }

  // Keplr wallet
  if (isKeplr) {
    const { account, result } = await signProofWithKeplr(
      proof,
      option.chainId,
      option.keplrChainInfo
    )

    proofPlainText = Buffer.from(sortedJsonStringify(result.signed)).toString('hex')
    proofPubKey = {
      typeUrl: '/cosmos.crypto.secp256k1.PubKey',
      value: result.signature.pub_key,
    }
    proofSignature = singleSignatureToAny(
      SingleSignature.fromPartial({
        valueType: SignatureValueType.SIGNATURE_VALUE_TYPE_COSMOS_AMINO,
        signature: Buffer.from(result.signature.signature, 'base64'),
      })
    )
    proofAddress = account.address
  }

  // TerraStation
  if (isTerraStation) {
    const result = await signProofWithTerraStation(proof)
    const terraAddress = get(result, 'result.body.messages[0].from_address', '')
    const signature = get(result, 'result.signatures[0]', '')
    const pubkey = get(result, 'result.auth_info.signer_infos[0].public_key.key', '')
    const signMode = get(result, 'result.auth_info.signer_infos[0].mode_info.single.mode', '')
    const terraLCDClient = new LCDClient({
      URL: 'https://lcd.terra.dev',
      chainID: option.chainId,
    })
    const auth = await terraLCDClient.auth.accountInfo(terraAddress)

    // TerraStation Direct Signing mode
    // @ts-ignore
    if (signMode === 'SIGN_MODE_DIRECT') {
      const txBody = get(result, 'result.body', {})
      const signDoc = new SignDoc(
        proof.chain_id,
        auth.getAccountNumber(),
        // @ts-ignore
        get(result, 'result.auth_info.signer_infos[0].sequence', ''),
        // @ts-ignore
        AuthInfo.fromData(get(result, 'result.auth_info', {})),
        // @ts-ignore
        TxBody.fromData(txBody)
      )
      proofPlainText = Buffer.from(signDoc.toBytes()).toString('hex')
      proofPubKey = {
        typeUrl: '/cosmos.crypto.secp256k1.PubKey',
        value: pubkey,
      }
      proofSignature = singleSignatureToAny(
        SingleSignature.fromPartial({
          valueType: SignatureValueType.SIGNATURE_VALUE_TYPE_COSMOS_DIRECT,
          signature: Buffer.from(signature, 'base64'),
        })
      )

      proofAddress = terraAddress
    }
    proof.msgs = get(result, 'result.body.messages', []).map((m) => MsgSend.fromData(m).toAmino())
    proof.sequence = get(result, 'result.auth_info.signer_infos[0].sequence', '')

    proof.account_number = String(auth.getAccountNumber())

    proofPlainText = Buffer.from(sortedJsonStringify(proof)).toString('hex')
    proofPubKey = {
      typeUrl: '/cosmos.crypto.secp256k1.PubKey',
      value: pubkey,
    }
    proofSignature = singleSignatureToAny(
      SingleSignature.fromPartial({
        valueType: SignatureValueType.SIGNATURE_VALUE_TYPE_COSMOS_AMINO,
        signature: Buffer.from(signature, 'base64'),
      })
    )

    proofAddress = terraAddress
  }

  if (option.ledgerAppName === 'terra' && ledgerTransport) {
    const app = new TerraApp(ledgerTransport)
    const hdPath = [44, option.coinType, option.account || 0, option.change || 0, option.index || 0]
    const result = await app.getAddressAndPubKey(hdPath, option.prefix)
    const { signature } = await app.sign(hdPath, serializeSignDoc(proof))

    proofPlainText = Buffer.from(JSON.stringify(proof, null, 0)).toString('hex')
    proofPubKey = {
      typeUrl: '/cosmos.crypto.secp256k1.PubKey',
      value: Buffer.from(result.compressed_pk.data),
    }
    proofSignature = singleSignatureToAny(
      SingleSignature.fromPartial({
        valueType: SignatureValueType.SIGNATURE_VALUE_TYPE_COSMOS_AMINO,
        signature: Buffer.from(signatureImport(Buffer.from(signature as any))),
      })
    )
  }
  const signerOptions = {
    hdPaths: [
      stringToPath(
        `m/44'/${option.coinType}'/${option.account || 0}'/${option.change || 0}/${
          option.index || 0
        }`
      ),
    ],
    prefix: option.prefix,
  }

  // ledger and mnemonic wallets
  let signer
  if (!ledgerTransport) {
    // @ts-ignore
    signer = await Secp256k1HdWallet.fromMnemonic(mnemonicOrPrivateKey, signerOptions)
  } else {
    signer = new LedgerSigner(ledgerTransport, {
      ...signerOptions,
      ledgerAppName: option.ledgerAppName,
    } as any)
  }
  const [ac] = await signer.getAccounts()

  const mnemonicSignResult = await generateProofMnemonic(
    signerAddress,
    mnemonicOrPrivateKey,
    option
  )

  proofSignature = mnemonicSignResult.signature
  proofPubKey = mnemonicSignResult.pubKey
  proofPlainText = mnemonicSignResult.plainText
  proofAddress = ac.address

  // TODO reorganize this
  // encode Uint8array values as hex so they can be JSON.stringified and compressed to the extension
  _.set(proofSignature, 'value', toHex(proofSignature.value))
  _.set(proofPubKey, 'value', toHex(proofPubKey.value))

  return {
    proof: {
      plainText: proofPlainText,
      signature: proofSignature,
      pubKey: proofPubKey,
    },
    address: proofAddress,
  }
}

export default generateProof
