declare module '*.svg' {
  const content: any
  export default content
}

interface Account {
  walletId: string
  address: string
  crypto: string
  index: number
  name: string
  fav: boolean
  createdAt: number
}

interface AccountBalance {
  balance: number // in coin
  price: number // USD price of coin
  timestamp: number
}

interface AccountWithBalance extends Account {
  balances: AccountBalance[]
}

interface CreateAccountParams {
  walletId: string
  crypto: string
  name: string
}

interface UpdateAccountParams {
  name?: string
  fav?: boolean
}

interface Wallet {
  name: string
  id: string
  createdAt: number
}

interface WalletBalance {
  balance: number // in USD
  timestamp: number
}

interface WalletWithBalance extends Wallet {
  balances: WalletBalance[]
}

interface Crypto {
  name: string
  coinType: number
}

interface Validator {
  image: string
  name: string
  commission: number
  vpRatios: number
  delegatedAmount: number
  amtRatio: number
  reward: number
}

interface CreateWalletParams {
  name: string
  cryptos: string[]
  mnemonic: string
  securityPassword: string
}

interface UpdateWalletParams {
  name?: string
  securityPassword?: string
  newSecurityPassword?: string
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
      event: 'getAccounts'
      data: { password: string }
    }
  | {
      event: 'addWallet'
      data: { wallet: CreateWalletParams; password: string }
    }
  | {
      event: 'updateWallet'
      data: { wallet: UpdateWalletParams; id: string; password: string }
    }
  | {
      event: 'deleteWallet'
      data: { id: string; password: string }
    }
  | {
      event: 'addAccount'
      data: { account: CreateAccountParams; password: string; securityPassword: string }
    }
  | {
      event: 'updateAccount'
      data: { account: UpdateAccountParams; address: string; password: string }
    }
  | {
      event: 'deleteAccount'
      data: { address: string; password: string }
    }
  | {
      event: 'generateMnemonic'
    }
  | {
      event: 'verifyMnemonic'
      data: {
        mnemonic: string
      }
    }
  | {
      event: 'verifyMnemonicBackup'
      data: {
        backupPhrase: string
        password: string
      }
    }
  | {
      event: 'viewMnemonicPhrase'
      data: {
        id: string
        securityPassword: string
        password: string
      }
    }
  | {
      event: 'viewMnemonicPhraseBackup'
      data: {
        id: string
        securityPassword: string
        backupPassword: string
        password: string
      }
    }
