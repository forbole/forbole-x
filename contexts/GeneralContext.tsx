import React from 'react'
import sendMsgToChromeExt from '../misc/sendMsgToChromeExt'
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
  favValidators: ['desmos1s9z0nzuu23fvac8u0j4tgvhgyg83ulc4qxs6z6', '11111111111'],
}

const GeneralContext = React.createContext<SettingsState>(initialState)

const GeneralProvider: React.FC = ({ children }) => {
  const [currency, setCurrency] = usePersistedState('currency', initialState.currency)
  const [theme, setTheme] = usePersistedState('theme', initialState.theme)
  const [favValidators, setFavValidators] = React.useState<FavValidators>(
    initialState.favValidators
  )

  const addFavValidators = React.useCallback(
    async (address: string) => {
      console.log('addFavValidators', favValidators)
      // const result = await sendMsgToChromeExt({
      //   event: 'addFavValidators',
      //   data: {
      //     address,
      //   },
      // })
      setFavValidators([address, ...favValidators])
      console.log('ADDedfavValidators', favValidators)
    },
    [setFavValidators]
  )

  const deleteFavValidators = React.useCallback(
    async (address: string) => {
      console.log('deleteFavValidators', favValidators)
      // const result = await sendMsgToChromeExt({
      //   event: 'deleteFavValidators',
      //   data: {
      //     address,
      //   },
      // })
      console.log('address', address)
      setFavValidators((fav) => fav.filter((a) => a !== address, console.log('fav', fav)))
      console.log('General_favValidators', favValidators)
    },
    [setFavValidators]
  )
  // console.log('favValidators General', favValidators)

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

const useGeneralContext = () => React.useContext(GeneralContext)

export { GeneralProvider, useGeneralContext }
