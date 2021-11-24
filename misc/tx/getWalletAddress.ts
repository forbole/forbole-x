import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing'
import { stringToPath } from '@cosmjs/crypto'
import { LedgerSigner } from '@cosmjs/ledger-amino'

export interface WalletOption {
  coinType: number
  account: number
  change: number
  index: number
  prefix: string
  ledgerAppName: string
}

const getWalletAddress = async (
  mnemonic: string,
  option: WalletOption,
  ledgerTransport?: any,
  showAddressOnLedger?: boolean
): Promise<string> => {
  // if (crypto === 'SOL') {
  //   const { getPubkeyFromConfig, SignerConfig } = await import('bd-solana-wasm')
  //   const address = getPubkeyFromConfig(new SignerConfig('', mnemonic, ''))
  //   return address
  // }
  let signer
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
  if (!ledgerTransport) {
    signer = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, signerOptions)
  } else {
    signer = new LedgerSigner(ledgerTransport, {
      ...signerOptions,
      ledgerAppName: option.ledgerAppName,
    } as any)
  }
  const accounts = await signer.getAccounts()
  if (ledgerTransport && showAddressOnLedger) {
    await signer.showAddressAndPubKey(accounts[0].address, option.prefix)
  }
  return accounts[0].address
}

export default getWalletAddress
