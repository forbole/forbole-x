import React from 'react'
import currencies from '../misc/currencies'
import usePersistedState from '../misc/usePersistedState'

type Theme = 'light' | 'dark'
type Currency = typeof currencies[number]
type FavValidators = string[] | []

interface SettingsState {
  currency: Currency
  theme: Theme
  favValidators: FavValidators
  setCurrency?: React.Dispatch<React.SetStateAction<Currency>>
  setTheme?: React.Dispatch<React.SetStateAction<Theme>>
  setFavValidators?: React.Dispatch<React.SetStateAction<FavValidators>>
  addFavValidators?: (id: string) => void
  deleteFavValidators?: (id: string) => void
}

const initialState: SettingsState = {
  currency: 'USD',
  theme: 'light',
  favValidators: [],
}

const GeneralContext = React.createContext<SettingsState>(initialState)

const GeneralProvider: React.FC = ({ children }) => {
  const [currency, setCurrency] = usePersistedState('currency', initialState.currency)
  const [theme, setTheme] = usePersistedState('theme', initialState.theme)
  const [favValidators, setFavValidators] = React.useState<FavValidators>(
    initialState.favValidators
  )
  console.log('fav_general', favValidators)
  const addFavValidators = React.useCallback(
    async (address: string) => {
      setFavValidators([address, ...favValidators])
    },
    [setFavValidators, favValidators]
  )

  const deleteFavValidators = React.useCallback(
    async (address: string) => {
      setFavValidators((fav) => fav.filter((a) => a !== address))
    },
    [setFavValidators]
  )

  return (
    <GeneralContext.Provider
      value={{
        currency,
        setCurrency,
        theme,
        setTheme,
        favValidators,
        setFavValidators,
        addFavValidators,
        deleteFavValidators,
      }}
    >
      {children}
    </GeneralContext.Provider>
  )
}

const useGeneralContext = (): SettingsState => React.useContext(GeneralContext)

export { GeneralProvider, useGeneralContext }
