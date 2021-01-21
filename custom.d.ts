declare module '*.svg' {
  const content: any
  export default content
}

interface Wallet {
  name: string
  pubkey: Uint8Array
}

interface CreateWalletParams {
  name: string
  pubkey: Uint8Array
  mnemonic: string
  securityPassword: string
}

type ChromeMessage =
  | {
      event: 'ping'
    }
  | {
      event: 'getWallets'
      data: { password: string }
    }
  | {
      event: 'addWallet'
      data: { wallet: CreateWalletParams; password: string }
    }
  | {
      event: 'deleteWallet'
      data: { pubkey: Uint8Array }
    }
