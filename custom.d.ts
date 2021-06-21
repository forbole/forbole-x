/* eslint-disable camelcase */
declare module '*.svg' {
  const content: any
  export default content
}
declare module '@ledgerhq/hw-transport-webusb'

interface Account {
  walletId: string
  address: string
  crypto: string
  index: number
  name: string
  fav: boolean
  createdAt: number
}

type TokenAmount = {
  [unit: string]: {
    amount: number
    price: number
  }
}

interface AccountBalance {
  balance: {
    available: TokenAmount
    delegated: TokenAmount
    rewards: TokenAmount
    commissions: TokenAmount
    unbonding: TokenAmount
  }
  timestamp: number
}

interface AccountWithBalance extends Account {
  balances: AccountBalance[]
}

interface CreateAccountParams {
  walletId: string
  crypto: string
  name: string
  address?: string
  index?: number
}

interface UpdateAccountParams {
  name?: string
  fav?: boolean
}

type WalletType = 'ledger' | 'mnemonic'

interface Wallet {
  type: WalletType
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

interface Cryptocurrency {
  name: string
  prefix?: string
  ecosystem: 'cosmos'
  image: string
  coinType: number
  graphqlHttpUrl: string
  graphqlWsUrl: string
  blockExplorerBaseUrl: string
  defaultGasFee: {
    amount: Array<{ amount: string; denom: string }>
    gas: {
      [txType: string]: string
    }
  }
}

interface Validator {
  rank: number
  address: string
  image: string
  name: string
  commission: number
  votingPower: number
  selfRatio: number
  status: string
  isActive: boolean
  rewards?: TokenAmount
  delegated?: TokenAmount
  unbonding?: TokenAmount
}

interface Unbonding {
  amount: TokenAmount
  validator: {
    address: string
    image: string
    name: string
  }
  height: number
  completionDate: Date
}

interface Redelegation {
  amount: TokenAmount
  fromValidator: {
    address: string
    image: string
    name: string
  }
  toValidator: {
    address: string
    image: string
    name: string
  }
  height: number
  completionDate: Date
}

interface Activity {
  ref: string
  date: string
  tab: string
  tag: string
  success: boolean
  detail?: any
  amount?: TokenAmount
}

interface VoteDetail {
  voter: {
    name: string
    image: string
  }
  votingPower: number
  votingPowerPercentage: number
  votingPowerOverride: number
  answer: string
}

interface DepositDetail {
  depositor: {
    name: string
    image: string
    address: string
  }
  amount: TokenAmount
  time: string
}

interface Proposal {
  id: number
  proposer: {
    name: string
    address: string
    image: string
  }
  type: string
  isActive: boolean
  tag: string
  title: string
  description: string
  votingStartTime: string
  votingEndTime: string
  submitTime: string
  depositEndTime: string
  depositEndTimeRaw: timestamp
  duration: number
  depositDetails?: DepositDetail[]
  voteDetails?: VoteDetail[]
  totalDeposits?: TokenAmount
  minDeposit: TokenAmount
}

interface TokenUnit {
  denom: string
  exponent: number
  token: {
    token_units: Array<{
      denom: string
      exponent: number
    }>
  }
}

interface TokenPrice {
  unit_name: string
  price: number
  timestamp: string
  token_unit: TokenUnit
}

interface CreateWalletParams {
  type: WalletType
  name: string
  cryptos: string[]
  mnemonic?: string // For mnemonic type
  addresses?: string[] // For ledger type
  securityPassword: string
}

interface UpdateWalletParams {
  name?: string
  securityPassword?: string
  newSecurityPassword?: string
}

interface TransactionMsgDelegate {
  type: 'cosmos-sdk/MsgDelegate'
  value: {
    delegator_address: string
    validator_address: string
    amount: { amount: string; denom: string }
  }
}

interface TransactionMsgUndelegate {
  type: 'cosmos-sdk/MsgUndelegate'
  value: {
    delegator_address: string
    validator_address: string
    amount: { amount: string; denom: string }
  }
}

interface TransactionMsgRedelegate {
  type: 'cosmos-sdk/MsgBeginRedelegate'
  value: {
    delegator_address: string
    validator_src_address: string
    validator_dst_address: string
    amount: { amount: string; denom: string }
  }
}

interface TransactionMsgWithdrawReward {
  type: 'cosmos-sdk/MsgWithdrawDelegationReward'
  value: {
    delegator_address: string
    validator_address: string
  }
}

interface TransactionMsgSend {
  type: 'cosmos-sdk/MsgSend'
  value: {
    from_address: string
    to_address: string
    amount: Array<{ amount: string; denom: string }>
  }
}

type TransactionMsg =
  | TransactionMsgDelegate
  | TransactionMsgUndelegate
  | TransactionMsgRedelegate
  | TransactionMsgWithdrawReward
  | TransactionMsgSend

interface Transaction {
  account_number?: string
  chain_id?: string
  sequence?: string
  msgs: TransactionMsg[]
  memo: string
  fee?: {
    amount: Array<{ amount: string; denom: string }>
    gas: string
  }
}

type ChromeMessage =
  | {
      event: 'ping'
    }
  | { event: 'reset' }
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
  | { event: 'closeChromeExtension' }
