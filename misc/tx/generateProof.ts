/* eslint-disable import/no-extraneous-dependencies */
import { Secp256k1HdWallet, Secp256k1Wallet, serializeSignDoc } from '@cosmjs/amino'
import { stringToPath } from '@cosmjs/crypto'
import { LedgerSigner } from '@cosmjs/ledger-amino'
import { toBase64 } from '@cosmjs/encoding'
import TerraApp from '@terra-money/ledger-terra-js'
import {
  Extension,
  AuthInfo,
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

const generateProof = async (
  signerAddress: string,
  mnemonicOrPrivateKey: string,
  option: WalletOption,
  ledgerTransport?: any,
  isKeplr?: boolean,
  isTerraStation?: boolean,
  proofText?: string
): Promise<{ proof: ChainLinkProof; address: string }> => {
  // Raw proof text given
  if (proofText) {
    try {
      const proofObj = JSON.parse(proofText)
      return {
        proof: {
          plainText: proofObj.proof.plain_text,
          pubKey: {
            typeUrl: '/cosmos.crypto.secp256k1.PubKey',
            value: proofObj.proof.pub_key.value,
          },
          signature: proofObj.proof.signature,
        },
        address: proofObj.address.value,
      }
    } catch (err) {
      throw new Error('Invalid Proof')
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

  if (option.isPrivateKey) {
    const signer = await Secp256k1Wallet.fromKey(
      Buffer.from(mnemonicOrPrivateKey, 'hex'),
      option.prefix
    )
    const [ac] = await signer.getAccounts()
    const { signature } = await signer.signAmino(ac.address, proof)
    return {
      proof: {
        plainText: Buffer.from(JSON.stringify(proof, null, 0)).toString('hex'),
        pubKey: {
          typeUrl: '/cosmos.crypto.secp256k1.PubKey',
          value: toBase64(ac.pubkey),
        },
        signature: Buffer.from(signature.signature, 'base64').toString('hex'),
      },
      address: ac.address,
    }
  }

  if (isKeplr) {
    const { account, result } = await signProofWithKeplr(
      proof,
      option.chainId,
      option.keplrChainInfo
    )

    return {
      proof: {
        plainText: Buffer.from(JSON.stringify(proof, null, 0)).toString('hex'),
        pubKey: {
          typeUrl: '/cosmos.crypto.secp256k1.PubKey',
          value: result.signature.pub_key.value,
        },
        signature: Buffer.from(result.signature.signature, 'base64').toString('hex'),
      },
      address: account.address,
    }
  }

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

    if (signMode === 'SIGN_MODE_DIRECT') {
      const txBody = get(result, 'result.body', {})
      const signDoc = new SignDoc(
        proof.chain_id,
        auth.getAccountNumber(),
        get(result, 'result.auth_info.signer_infos[0].sequence', ''),
        AuthInfo.fromData(get(result, 'result.auth_info', {})),
        TxBody.fromData(txBody)
      )
      return {
        proof: {
          plainText: Buffer.from(signDoc.toBytes()).toString('hex'),
          pubKey: {
            typeUrl: '/cosmos.crypto.secp256k1.PubKey',
            value: pubkey,
          },
          signature: Buffer.from(signature, 'base64').toString('hex'),
        },
        address: terraAddress,
      }
    }
    proof.msgs = get(result, 'result.body.messages', []).map((m) => MsgSend.fromData(m).toAmino())
    proof.sequence = get(result, 'result.auth_info.signer_infos[0].sequence', '')

    proof.account_number = String(auth.getAccountNumber())
    return {
      proof: {
        plainText: Buffer.from(sortedJsonStringify(proof)).toString('hex'),
        pubKey: {
          typeUrl: '/cosmos.crypto.secp256k1.PubKey',
          value: pubkey,
        },
        signature: Buffer.from(signature, 'base64').toString('hex'),
      },
      address: terraAddress,
    }
  }

  if (option.ledgerAppName === 'terra' && ledgerTransport) {
    const app = new TerraApp(ledgerTransport)
    const hdPath = [44, option.coinType, option.account || 0, option.change || 0, option.index || 0]
    const result = await app.getAddressAndPubKey(hdPath, option.prefix)
    const { signature } = await app.sign(hdPath, serializeSignDoc(proof))
    return {
      proof: {
        plainText: Buffer.from(JSON.stringify(proof, null, 0)).toString('hex'),
        pubKey: {
          typeUrl: '/cosmos.crypto.secp256k1.PubKey',
          value: toBase64(Buffer.from(result.compressed_pk.data)),
        },
        signature: Buffer.from(signatureImport(Buffer.from(signature as any))).toString('hex'),
      },
      address: result.bech32_address,
    }
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
  let signer
  if (!ledgerTransport) {
    signer = await Secp256k1HdWallet.fromMnemonic(mnemonicOrPrivateKey, signerOptions)
  } else {
    signer = new LedgerSigner(ledgerTransport, {
      ...signerOptions,
      ledgerAppName: option.ledgerAppName,
    } as any)
  }
  const [ac] = await signer.getAccounts()

  const { signature } = await signer.signAmino(ac.address, proof)

  return {
    proof: {
      plainText: Buffer.from(JSON.stringify(proof, null, 0)).toString('hex'),
      pubKey: {
        typeUrl: '/cosmos.crypto.secp256k1.PubKey',
        value: toBase64(ac.pubkey),
      },
      signature: Buffer.from(signature.signature, 'base64').toString('hex'),
    },
    address: ac.address,
  }
}

export default generateProof
