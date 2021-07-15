import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing'
import { stringToPath } from '@cosmjs/crypto'
import { LedgerSigner } from '../@cosmjs/ledger-amino'
import cryptocurrencies from './cryptocurrencies'

const getWalletAddress = async (
  mnemonic: string,
  crypto: string,
  index: number,
  ledgerTransport?: any
): Promise<string> => {
  // if (crypto === 'SOL') {
  //   const { getPubkeyFromConfig, SignerConfig } = await import('bd-solana-wasm')
  //   const address = getPubkeyFromConfig(new SignerConfig('', mnemonic, ''))
  //   return address
  // }
  let signer
  const signerOptions = {
    hdPaths: [stringToPath(`m/44'/${cryptocurrencies[crypto].coinType}'/0'/0/${index}`)],
    prefix: cryptocurrencies[crypto].prefix,
  }
  if (!ledgerTransport) {
    signer = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, signerOptions)
  } else {
    signer = new LedgerSigner(ledgerTransport, signerOptions as any)
  }
  const accounts = await signer.getAccounts()
  return accounts[0].address
}

export default getWalletAddress
