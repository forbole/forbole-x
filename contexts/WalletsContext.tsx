import React from 'react'
import CryptoJS from 'crypto-js'
import usePersistedState from '../misc/usePersistedState'

interface Wallet {}

interface WalletsState {
  isFirstTimeUser: boolean
  wallets: Wallet[]
  password: string
  setPassword?: React.Dispatch<React.SetStateAction<string>>
}

const initialState: WalletsState = {
  isFirstTimeUser: false,
  wallets: [],
  password: '',
}

const WalletsContext = React.createContext<WalletsState>(initialState)

const WalletsProvider: React.FC = ({ children }) => {
  const [encryptedWalletsString, setEncryptedWalletsString] = usePersistedState('wallets', '')
  const [password, setPassword] = React.useState('')
  const wallets = React.useMemo(() => {
    try {
      if (password && encryptedWalletsString) {
        const decryptedWalletsString = CryptoJS.AES.decrypt(
          encryptedWalletsString,
          password
        ).toString(CryptoJS.enc.Utf8)
        return JSON.parse(decryptedWalletsString)
      }
      return []
    } catch (err) {
      console.log(err)
      return []
    }
  }, [password, encryptedWalletsString])
  return (
    <WalletsContext.Provider
      value={{
        isFirstTimeUser: !encryptedWalletsString,
        wallets,
        password,
        setPassword,
      }}
    >
      {children}
    </WalletsContext.Provider>
  )
}

const useWalletsContext = () => React.useContext(WalletsContext)

export { WalletsProvider, useWalletsContext }
