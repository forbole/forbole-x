/* eslint-disable import/no-extraneous-dependencies */
import { Secp256k1HdWallet, serializeSignDoc } from '@cosmjs/amino'
import { stringToPath } from '@cosmjs/crypto'
import { LedgerSigner } from '@cosmjs/ledger-amino'
import { toBase64 } from '@cosmjs/encoding'
import TerraApp from '@terra-money/ledger-terra-js'
import { signatureImport } from 'secp256k1'
import { WalletOption } from './getWalletAddress'

const generateProof = async (
  signerAddress: string,
  mnemonic: string,
  option: WalletOption,
  ledgerTransport?: any
): Promise<ChainLinkProof> => {
  const proof = {
    account_number: '0',
    chain_id: '',
    fee: { amount: [], gas: '200000' },
    memo: signerAddress,
    msgs: [],
    sequence: '0',
  }

  if (option.ledgerAppName === 'terra' && ledgerTransport) {
    const app = new TerraApp(ledgerTransport)
    const hdPath = [44, option.coinType, option.account || 0, option.change || 0, option.index || 0]
    const result = await app.getAddressAndPubKey(hdPath, option.prefix)
    const { signature } = await app.sign(hdPath, serializeSignDoc(proof))
    return {
      plainText: Buffer.from(JSON.stringify(proof, null, 0)).toString('hex'),
      pubKey: {
        typeUrl: '/cosmos.crypto.secp256k1.PubKey',
        value: toBase64(Buffer.from(result.compressed_pk.data)),
      },
      signature: Buffer.from(signatureImport(Buffer.from(signature as any))).toString('hex'),
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
    signer = await Secp256k1HdWallet.fromMnemonic(mnemonic, signerOptions)
  } else {
    signer = new LedgerSigner(ledgerTransport, {
      ...signerOptions,
      ledgerAppName: option.ledgerAppName,
    } as any)
  }
  const [ac] = await signer.getAccounts()

  const { signature } = await signer.signAmino(ac.address, proof)

  return {
    plainText: Buffer.from(JSON.stringify(proof, null, 0)).toString('hex'),
    pubKey: {
      typeUrl: '/cosmos.crypto.secp256k1.PubKey',
      value: toBase64(ac.pubkey),
    },
    signature: Buffer.from(signature.signature, 'base64').toString('hex'),
  }
}

export default generateProof
