import React from 'react'
import sendMsgToChromeExt from '../misc/sendMsgToChromeExt'

interface WalletsState {
  isFirstTimeUser: boolean
  isUnlocked: boolean
  wallets: Wallet[]
  accounts: Account[]
  password: string
  unlockWallets?: (password: string) => void
  addWallet?: (wallet: CreateWalletParams) => void
  updateWallet?: (id: string, wallet: UpdateWalletParams) => void
  deleteWallet?: (id: string) => void
  addAccount?: (account: CreateAccountParams) => void
  updateAccount?: (address: string, account: UpdateAccountParams) => void
  deleteAccount?: (address: string) => void
  verifySecurityPassword?: (id: string, securityPassword: string) => Promise<{ success: boolean }>
  viewMnemonicPhrase?: (
    id: string,
    securityPassword: string,
    backupPassword: string
  ) => Promise<string>
}

const initialState: WalletsState = {
  isFirstTimeUser: false,
  isUnlocked: false,
  wallets: [],
  accounts: [],
  password: '',
}

const WalletsContext = React.createContext<WalletsState>(initialState)

const WalletsProvider: React.FC = ({ children }) => {
  const [wallets, setWallets] = React.useState<Wallet[]>([])
  const [accounts, setAccounts] = React.useState<Account[]>([])
  const [isFirstTimeUser, setIsFirstTimeUser] = React.useState(false)
  const [password, setPassword] = React.useState('')

  const checkIsFirstTimeUser = React.useCallback(async () => {
    const response = await sendMsgToChromeExt({
      event: 'ping',
    })
    setIsFirstTimeUser(response.isFirstTimeUser)
  }, [])

  const unlockWallets = React.useCallback(
    async (pw: string) => {
      if (!isFirstTimeUser) {
        const walletaResponse = await sendMsgToChromeExt({
          event: 'getWallets',
          data: {
            password: pw,
          },
        })
        const accountsResponse = await sendMsgToChromeExt({
          event: 'getAccounts',
          data: {
            password: pw,
          },
        })
        setWallets(walletaResponse.wallets)
        setAccounts(accountsResponse.accounts)
      }
      setPassword(pw)
    },
    [isFirstTimeUser, setPassword, setWallets, setAccounts]
  )

  const addWallet = React.useCallback(
    async (wallet: CreateWalletParams) => {
      const result = await sendMsgToChromeExt({
        event: 'addWallet',
        data: {
          wallet,
          password,
        },
      })
      setIsFirstTimeUser(false)
      setWallets((ws) => [result.wallet, ...ws])
      setAccounts((acs) => [...result.accounts, ...acs])
    },
    [password, setIsFirstTimeUser, setWallets, setAccounts]
  )

  const updateWallet = React.useCallback(
    async (id: string, wallet: UpdateWalletParams) => {
      const result = await sendMsgToChromeExt({
        event: 'updateWallet',
        data: {
          wallet,
          id,
          password,
        },
      })
      setWallets((ws) => ws.map((w) => (w.id === id ? result.wallet : w)))
    },
    [password, setWallets]
  )

  const deleteWallet = React.useCallback(
    async (id: string) => {
      await sendMsgToChromeExt({
        event: 'deleteWallet',
        data: {
          id,
          password,
        },
      })
      setWallets((ws) => ws.filter((w) => w.id !== id))
    },
    [password, setWallets]
  )

  const addAccount = React.useCallback(
    async (account: CreateAccountParams) => {
      const result = await sendMsgToChromeExt({
        event: 'addAccount',
        data: {
          account,
          password,
        },
      })
      setAccounts((acs) => [result.account, ...acs])
    },
    [password, setAccounts]
  )

  const updateAccount = React.useCallback(
    async (address: string, account: UpdateAccountParams) => {
      const result = await sendMsgToChromeExt({
        event: 'updateAccount',
        data: {
          account,
          address,
          password,
        },
      })
      setAccounts((acs) => acs.map((a) => (a.address === address ? result.account : a)))
    },
    [password, setAccounts]
  )

  const deleteAccount = React.useCallback(
    async (address: string) => {
      await sendMsgToChromeExt({
        event: 'deleteAccount',
        data: {
          address,
          password,
        },
      })
      setAccounts((acs) => acs.filter((a) => a.address !== address))
    },
    [password, setAccounts]
  )

  const verifySecurityPassword = React.useCallback(
    async (id: string, securityPassword: string) => {
      const result = await sendMsgToChromeExt({
        event: 'verifySecurityPassword',
        data: {
          id,
          securityPassword,
          password,
        },
      })
      return result
    },
    [password]
  )

  const viewMnemonicPhrase = React.useCallback(
    async (id: string, securityPassword: string, backupPassword: string) => {
      const { mnemonic } = await sendMsgToChromeExt({
        event: 'viewMnemonicPhrase',
        data: {
          id,
          securityPassword,
          backupPassword,
          password,
        },
      })
      return mnemonic
    },
    [password]
  )

  React.useEffect(() => {
    checkIsFirstTimeUser()
  }, [])

  return (
    <WalletsContext.Provider
      value={{
        isFirstTimeUser,
        isUnlocked: !!wallets.length,
        wallets,
        accounts,
        password,
        unlockWallets,
        addWallet,
        updateWallet,
        deleteWallet,
        addAccount,
        updateAccount,
        deleteAccount,
        verifySecurityPassword,
        viewMnemonicPhrase,
      }}
    >
      {children}
    </WalletsContext.Provider>
  )
}

const useWalletsContext = (): WalletsState => React.useContext(WalletsContext)

export { WalletsProvider, useWalletsContext }
