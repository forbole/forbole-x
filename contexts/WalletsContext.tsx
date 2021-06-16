import { Cosmos } from 'ledger-app-cosmos'
import cloneDeep from 'lodash/cloneDeep'
import React from 'react'
import { getAddress } from '../misc/ledger'
import sendMsgToChromeExt from '../misc/sendMsgToChromeExt'

interface WalletsState {
  isFirstTimeUser: boolean
  isUnlocked: boolean
  wallets: Wallet[]
  accounts: Account[]
  password: string
  unlockWallets?: (password: string) => void
  addWallet?: (wallet: CreateWalletParams, ledgerApp?: Cosmos) => void
  updateWallet?: (id: string, wallet: UpdateWalletParams) => void
  deleteWallet?: (id: string) => void
  addAccount?: (account: CreateAccountParams, securityPassword: string, ledgerApp?: Cosmos) => void
  updateAccount?: (address: string, account: UpdateAccountParams) => void
  deleteAccount?: (address: string) => void
  viewMnemonicPhrase?: (id: string, securityPassword: string) => Promise<string>
  viewMnemonicPhraseBackup?: (
    id: string,
    securityPassword: string,
    backupPassword: string
  ) => Promise<string>
  reset?: () => void
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

  const reset = React.useCallback(async () => {
    await sendMsgToChromeExt({
      event: 'reset',
    })
    setIsFirstTimeUser(true)
    setAccounts([])
    setWallets([])
    setPassword('')
  }, [setIsFirstTimeUser, setAccounts, setWallets, setPassword])

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
    async (params: CreateWalletParams, ledgerApp?: Cosmos) => {
      const wallet = cloneDeep(params)
      if (wallet.type === 'ledger') {
        const addresses = await Promise.all(wallet.cryptos.map((c) => getAddress(ledgerApp, c, 0)))
        wallet.addresses = addresses
      }
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
      await Promise.all(
        accounts
          .filter((a) => a.walletId === id)
          .map((a) =>
            sendMsgToChromeExt({
              event: 'deleteAccount',
              data: {
                address: a.address,
                password,
              },
            })
          )
      )
      setWallets((ws) => {
        const newWallets = ws.filter((w) => w.id !== id)
        if (!newWallets.length) {
          setIsFirstTimeUser(true)
        }
        return newWallets
      })
      setAccounts((acs) => acs.filter((a) => a.walletId !== id))
    },
    [password, accounts, setWallets, setIsFirstTimeUser, setAccounts]
  )

  const addAccount = React.useCallback(
    async (params: CreateAccountParams, securityPassword: string, ledgerApp?: Cosmos) => {
      const account = cloneDeep(params)
      if (ledgerApp) {
        account.index =
          Math.max(
            -1,
            ...accounts
              .filter((a) => a.walletId === account.walletId && a.crypto === account.crypto)
              .map((a) => a.index)
          ) + 1
        account.address = await getAddress(ledgerApp, account.crypto, account.index)
      }
      const result = await sendMsgToChromeExt({
        event: 'addAccount',
        data: {
          account,
          securityPassword,
          password,
        },
      })
      setAccounts((acs) => [result.account, ...acs])
    },
    [password, accounts, setAccounts]
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

  // Can be used to verify security password
  const viewMnemonicPhrase = React.useCallback(
    async (id: string, securityPassword: string) => {
      const { mnemonic } = await sendMsgToChromeExt({
        event: 'viewMnemonicPhrase',
        data: {
          id,
          securityPassword,
          password,
        },
      })
      return mnemonic
    },
    [password]
  )

  const viewMnemonicPhraseBackup = React.useCallback(
    async (id: string, securityPassword: string, backupPassword: string) => {
      const { mnemonic } = await sendMsgToChromeExt({
        event: 'viewMnemonicPhraseBackup',
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
        viewMnemonicPhraseBackup,
        viewMnemonicPhrase,
        reset,
      }}
    >
      {children}
    </WalletsContext.Provider>
  )
}

const useWalletsContext = (): WalletsState => React.useContext(WalletsContext)

export { WalletsProvider, useWalletsContext }
