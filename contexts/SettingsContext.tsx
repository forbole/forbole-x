import React from 'react'
import currencies from '../misc/currencies'
import usePersistedState from '../misc/usePersistedState'

type Theme = 'light' | 'dark'
type Currency = typeof currencies[number]

interface SettingsState {
  currency: Currency
  setCurrency: (currency: Currency) => void
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: SettingsState = {
  currency: 'USD',
  setCurrency: () => null,
  theme: 'light',
  setTheme: () => null,
}

const SettingsContext = React.createContext<SettingsState>(initialState)

const SettingsProvider: React.FC = ({ children }) => {
  const [currency, setCurrency] = usePersistedState('currency', initialState.currency)
  const [theme, setTheme] = usePersistedState('theme', initialState.theme)

  return (
    <SettingsContext.Provider
      value={{
        currency,
        setCurrency,
        theme,
        setTheme,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

const useSettingsContext = () => React.useContext(SettingsContext)

export { SettingsProvider, useSettingsContext }
