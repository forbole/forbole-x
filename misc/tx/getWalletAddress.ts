import { DirectSecp256k1HdWallet, DirectSecp256k1Wallet } from '@cosmjs/proto-signing'
import { stringToPath } from '@cosmjs/crypto'
import { LedgerSigner } from '@cosmjs/ledger-amino'
import TerraApp from '@terra-money/ledger-terra-js'

export interface WalletOption {
  coinType?: number
  account?: number
  change?: number
  index?: number
  prefix: string
  ledgerAppName?: string
  chainId?: string
  feeDenom?: string
  isPrivateKey?: boolean
}

const getWalletAddress = async (
  mnemonicOrPrivateKey: string,
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
  // Generate by Private Key
  if (!ledgerTransport && option.isPrivateKey) {
    signer = await DirectSecp256k1Wallet.fromKey(
      Buffer.from(mnemonicOrPrivateKey, 'hex'),
      option.prefix
    )
    const accounts = await signer.getAccounts()
    return accounts[0].address
  }
  if (option.ledgerAppName === 'terra' && ledgerTransport) {
    const app = new TerraApp(ledgerTransport)
    const hdPath = [
      44,
      option.coinType || 118,
      option.account || 0,
      option.change || 0,
      option.index || 0,
    ]
    const result = await app.getAddressAndPubKey(hdPath, option.prefix)
    if (showAddressOnLedger) {
      await app.showAddressAndPubKey(hdPath, option.prefix)
    }
    return result.bech32_address
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
  if (!ledgerTransport && !option.isPrivateKey) {
    signer = await DirectSecp256k1HdWallet.fromMnemonic(mnemonicOrPrivateKey, signerOptions)
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
