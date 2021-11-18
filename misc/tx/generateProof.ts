/* eslint-disable import/no-extraneous-dependencies */
import { Secp256k1HdWallet } from '@cosmjs/amino'
import { stringToPath } from '@cosmjs/crypto'
import { LedgerSigner } from '@cosmjs/ledger-amino'
import { toBase64 } from '@cosmjs/encoding'
import cryptocurrencies from '../cryptocurrencies'

const generateProof = async (
  signerAddress: string,
  mnemonic: string,
  crypto: string,
  account: number,
  change: number,
  index: number,
  ledgerTransport?: any
): Promise<ChainLinkProof> => {
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
    signer = await Secp256k1HdWallet.fromMnemonic(mnemonic, signerOptions)
  } else {
    signer = new LedgerSigner(ledgerTransport, {
      ...signerOptions,
      ledgerAppName: cryptocurrencies[crypto].ledgerAppName,
    } as any)
  }
  const [ac] = await signer.getAccounts()

  const proof = {
    account_number: '0',
    chain_id: '',
    fee: { amount: [], gas: '200000' },
    memo: signerAddress,
    msgs: [],
    sequence: '0',
  }

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
