import isEqual from 'lodash/isEqual'
import React from 'react'
import sendMsgToChromeExt from '../misc/sendMsgToChromeExt'

interface WalletsState {
  isFirstTimeUser: boolean
  isUnlocked: boolean
  wallets: Wallet[]
  password: string
  unlockWallets?: (password: string) => void
  addWallet?: (wallet: CreateWalletParams) => void
  deleteWallet?: (pubkey: Uint8Array) => void
}

const initialState: WalletsState = {
  isFirstTimeUser: false,
  isUnlocked: false,
  wallets: [],
  password: '',
}

const WalletsContext = React.createContext<WalletsState>(initialState)

const WalletsProvider: React.FC = ({ children }) => {
  const [wallets, setWallets] = React.useState<Wallet[]>([])
  const [isFirstTimeUser, setIsFirstTimeUser] = React.useState(false)
  const [password, setPassword] = React.useState('')

  const checkIsFirstTimeUser = React.useCallback(async () => {
    const response = await sendMsgToChromeExt({ event: 'ping' })
    setIsFirstTimeUser(response.isFirstTimeUser)
  }, [])

  const unlockWallets = React.useCallback(
    async (pw: string) => {
      if (!isFirstTimeUser) {
        const response = await sendMsgToChromeExt({ event: 'getWallets', data: { password: pw } })
        setWallets(response.wallets)
      }
      setPassword(pw)
    },
    [isFirstTimeUser]
  )

  const addWallet = React.useCallback(
    async (wallet: CreateWalletParams) => {
      await sendMsgToChromeExt({
        event: 'addWallet',
        data: { wallet, password },
      })
      setIsFirstTimeUser(false)
      setWallets((ws) => [{ name: wallet.name, pubkey: wallet.pubkey }, ...ws])
    },
    [password]
  )

  const deleteWallet = React.useCallback(
    async (pubkey: Uint8Array) => {
      await sendMsgToChromeExt({
        event: 'deleteWallet',
        data: { pubkey },
      })
      setWallets((ws) => ws.filter((w) => !isEqual(w.pubkey, pubkey)))
    },
    [wallets, password]
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
        password,
        unlockWallets,
        addWallet,
        deleteWallet,
      }}
    >
      {children}
    </WalletsContext.Provider>
  )
}

const useWalletsContext = () => React.useContext(WalletsContext)

export { WalletsProvider, useWalletsContext }
