/* eslint-disable camelcase */
declare module '*.svg' {
  const content: any
  export default content
}
declare module '@ledgerhq/hw-transport-webusb'

type AppUnlockState = 'locked' | 'unlocking' | 'unlocked'

interface Account {
  walletId: string
  address: string
  crypto: string
  account: number // HD Path account
  change: number // HD Path change
  index: number // HD Path index
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

interface AvailableTokens {
  coins: Array<{ amount: string; denom: string }>
  tokens_prices: TokenPrice[]
}

interface AccountBalance {
  balance: {
    available: TokenAmount
    delegated: TokenAmount
    rewards: TokenAmount
    commissions: TokenAmount
    unbonding: TokenAmount
  }
  availableTokens: AvailableTokens
  timestamp: number
}

interface AccountWithBalance extends Account {
  balances: AccountBalance[]
}

interface CreateAccountParams {
  walletId: string
  crypto: string
  name: string
  address: string
  account: number
  change: number
  index: number
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

interface Chain {
  name: string
  image: string
  channel: string
  chainId: string
  addressPrefix: string
  crypto: string
}

interface Cryptocurrency {
  name: string
  prefix?: string
  ecosystem: 'cosmos'
  chainId: string
  chainName: string
  image: string
  coinType: number
  graphqlHttpUrl: string
  graphqlWsUrl: string
  blockExplorerBaseUrl: string
  lcdApiUrl: string
  rpcApiUrl: string
  ledgerAppName: string
  ibcChains: Chain[]
  gasAdjustment: number
  gasFee: { amount: number; denom: string }
  defaultGas: { [typeUrl: string]: number }
}

interface Validator {
  order: number
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
  missedBlockCounter: number
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
  quorum: number
  bondedTokens: number
  content?: any
}

interface Profile {
  bio: string
  coverPic: string
  dtag: string
  nickname: string
  profilePic: string
}

interface ChainConnection {
  creationTime: number
  externalAddress: string
  userAddress: string
  chainName: string
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

interface VestingPeriod {
  amount: TokenAmount
  date: number
}

interface CreateWalletParams {
  type: WalletType
  name: string
  cryptos: string[]
  mnemonic?: string // For mnemonic type
  addresses: string[]
  securityPassword: string
}

interface UpdateWalletParams {
  name?: string
  securityPassword?: string
  newSecurityPassword?: string
}

interface TransactionMsgDelegate {
  typeUrl: '/cosmos.staking.v1beta1.MsgDelegate'
  value: {
    delegatorAddress: string
    validatorAddress: string
    amount: { amount: string; denom: string }
  }
}

interface TransactionMsgUndelegate {
  typeUrl: '/cosmos.staking.v1beta1.MsgUndelegate'
  value: {
    delegatorAddress: string
    validatorAddress: string
    amount: { amount: string; denom: string }
  }
}

interface TransactionMsgRedelegate {
  typeUrl: '/cosmos.staking.v1beta1.MsgBeginRedelegate'
  value: {
    delegatorAddress: string
    validatorSrcAddress: string
    validatorDstAddress: string
    amount: { amount: string; denom: string }
  }
}

interface TransactionMsgWithdrawReward {
  typeUrl: '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward'
  value: {
    delegatorAddress: string
    validatorAddress: string
  }
}

interface TransactionMsgSend {
  typeUrl: '/cosmos.bank.v1beta1.MsgSend'
  value: {
    fromAddress: string
    toAddress: string
    amount: Array<{ amount: string; denom: string }>
  }
}

interface TransactionMsgMultiSend {
  typeUrl: '/cosmos.bank.v1beta1.MsgMultiSend'
  value: {
    inputs: Array<{ address: string; coins: Array<{ amount: string; denom: string }> }>
    outputs: Array<{ address: string; coins: Array<{ amount: string; denom: string }> }>
  }
}

interface TransactionMsgIBCTransfer {
  typeUrl: '/ibc.applications.transfer.v1.MsgTransfer'
  value: {
    sourcePort: string
    sourceChannel: string
    token: {
      denom: string
      amount: string
    }
    sender: string
    receiver: string
    timeoutTimestamp?: number
  }
}

interface TransactionMsgSubmitProposal {
  typeUrl: '/cosmos.gov.v1beta1.MsgSubmitProposal'
  value: {
    content:
      | {
          typeUrl: '/cosmos.gov.v1beta1.TextProposal'
          value: {
            description: string
            title: string
          }
        }
      | {
          typeUrl: '/cosmos.params.v1beta1.ParameterChangeProposal'
          value: {
            description: string
            title: string
            changes: { subspace: string; key: string; value: string }[]
          }
        }
      | {
          typeUrl: '/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal'
          value: {
            title: string
            description: string
            plan: {
              name: string
              time?: number
              height?: number
              info: string
              upgradedClientState?: any
            }
          }
        }
      | {
          typeUrl: '/cosmos.distribution.v1beta1.CommunityPoolSpendProposal'
          value: {
            title: string
            description: string
            recipient: string
            amount: Array<{ amount: string; denom: string }>
          }
        }
    initialDeposit: [
      {
        amount: string
        denom: string
      }
    ]
    proposer: string
  }
}

interface TransactionMsgVote {
  typeUrl: '/cosmos.gov.v1beta1.MsgVote'
  value: {
    option: 1 | 2 | 3 | 4 // Yes, Abstain, No, No with Veto
    proposalId: number
    voter: string
  }
}

interface TransactionMsgDeposit {
  typeUrl: '/cosmos.gov.v1beta1.MsgDeposit'
  value: {
    amount: {
      amount: string
      denom: string
    }[]
    depositor: string
    proposalId: number
  }
}

interface TransactionMsgSetWithdrawAddress {
  typeUrl: '/cosmos.distribution.v1beta1.MsgSetWithdrawAddress'
  value: {
    delegatorAddress: string
    withdrawAddress: string
  }
}

interface TransactionMsgSaveProfile {
  typeUrl: '/desmos.profiles.v1beta1.MsgSaveProfile'
  value: {
    dtag: string
    nickname?: string
    bio?: string
    profilePicture?: string
    coverPicture?: string
    creator: string
  }
}

interface ChainLinkProof {
  plainText: string
  pubKey: {
    typeUrl: '/cosmos.crypto.secp256k1.PubKey'
    value: string
  }
  signature: string
}

interface TransactionMsgLinkChainAccount {
  typeUrl: '/desmos.profiles.v1beta1.MsgLinkChainAccount'
  value: {
    chainAddress: {
      typeUrl: '/desmos.profiles.v1beta1.Bech32Address'
      value: {
        prefix: string
        value: string // address
      }
    }
    chainConfig: {
      name: string
    }
    proof: ChainLinkProof
    signer: string
  }
}

interface TransactionMsgUnlinkChainAccount {
  typeUrl: '/desmos.profiles.v1beta1.MsgUnlinkChainAccount'
  value: {
    chainName: string
    owner: string
    target: string
  }
}

type TransactionMsg =
  | TransactionMsgDelegate
  | TransactionMsgUndelegate
  | TransactionMsgRedelegate
  | TransactionMsgWithdrawReward
  | TransactionMsgSend
  | TransactionMsgMultiSend
  | TransactionMsgIBCTransfer
  | TransactionMsgSubmitProposal
  | TransactionMsgVote
  | TransactionMsgDeposit
  | TransactionMsgSetWithdrawAddress
  | TransactionMsgSaveProfile
  | TransactionMsgLinkChainAccount
  | TransactionMsgUnlinkChainAccount

interface Transaction {
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
      event: 'changeUnlockPassword'
      data: { password: string; oldPassword: string }
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
      data: { account: UpdateAccountParams; address: string; walletId: string; password: string }
    }
  | {
      event: 'deleteAccount'
      data: { address: string; walletId: string; password: string }
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
