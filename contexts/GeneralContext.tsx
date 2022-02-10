import React from 'react'
import get from 'lodash/get'
import currencies from '../misc/currencies'
import usePersistedState from '../misc/usePersistedState'

type Theme = 'light' | 'dark'
type Currency = typeof currencies[number]
type FavValidators = string[]
type FavAddress = { address: string; crypto: string; moniker: string; note?: string; img?: string }
interface GeneralState {
  currency: Currency
  currencyRate: number // per USD rate
  theme: Theme
  alwaysRequirePassword: boolean
  setAlwaysRequirePassword?: React.Dispatch<React.SetStateAction<boolean>>
  favValidators: FavValidators
  favAddresses: FavAddress[]
  setCurrency?: React.Dispatch<React.SetStateAction<Currency>>
  setTheme?: React.Dispatch<React.SetStateAction<Theme>>
  addFavValidators?: (id: string) => void
  deleteFavValidators?: (id: string) => void
  addFavAddresses?: (n: FavAddress) => void
  deleteFavAddresses?: (id: string) => void
  updateFavAddresses?: (n: FavAddress) => void
}

const initialState: GeneralState = {
  currency: 'USD',
  currencyRate: 1,
  theme: 'light',
  alwaysRequirePassword: false,
  favValidators: [],
  favAddresses: [],
}

const GeneralContext = React.createContext<GeneralState>(initialState)

const GeneralProvider: React.FC = ({ children }) => {
  const [currency, setCurrency] = usePersistedState('currency', initialState.currency)
  const [currencyRate, setCurrencyRate] = usePersistedState(
    'currencyRate',
    initialState.currencyRate
  )
  const [theme, setTheme] = usePersistedState('theme', initialState.theme)
  const [alwaysRequirePassword, setAlwaysRequirePassword] = usePersistedState(
    'alwaysRequirePassword',
    initialState.alwaysRequirePassword
  )

  const [favValidators, setFavValidators] = usePersistedState('fav', initialState.favValidators)
  const [favAddresses, setFavAddresses] = usePersistedState('favAddress', initialState.favAddresses)
  const addFavValidators = React.useCallback(
    (address: string) => {
      setFavValidators((vs) => [address, ...vs])
    },
    [setFavValidators]
  )

  const deleteFavValidators = React.useCallback(
    (address: string) => {
      setFavValidators((vs) => vs.filter((a) => a !== address))
    },
    [setFavValidators]
  )

  const addFavAddresses = React.useCallback(
    (newAddress: FavAddress) => {
      setFavAddresses((vs) => [newAddress, ...vs])
    },
    [setFavAddresses]
  )

  const deleteFavAddresses = React.useCallback(
    (address: string) => {
      setFavAddresses((vs) => vs.filter((a) => a.address !== address))
    },
    [setFavAddresses]
  )

  const updateFavAddresses = React.useCallback(
    (editedAddress: {
      address: string
      crypto: string
      moniker: string
      note: string
      img: string
      newAddress: string
    }) => {
      setFavAddresses((vs) =>
        vs.map((a) =>
          a.address === editedAddress.address
            ? {
                address: editedAddress.newAddress,
                crypto: editedAddress.crypto,
                moniker: editedAddress.moniker,
                note: editedAddress.note,
                img: editedAddress.img,
              }
            : a
        )
      )
    },
    [setFavAddresses]
  )

  React.useEffect(() => {
    if (currency === 'USD') {
      setCurrencyRate(1)
    } else {
      fetch(
        `${process.env.NEXT_PUBLIC_ALPHAVANTAGE_API_URL}/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=${currency}&apikey=${process.env.NEXT_PUBLIC_ALPHAVANTAGE_API_KEY}`
      )
        .then((r) => r.json())
        .then((r) =>
          setCurrencyRate(
            Number(get(r, ['Realtime Currency Exchange Rate', '5. Exchange Rate'], ''))
          )
        )
    }
  }, [currency])

  return (
    <GeneralContext.Provider
      value={{
        currency,
        currencyRate,
        setCurrency,
        theme,
        setTheme,
        alwaysRequirePassword,
        setAlwaysRequirePassword,
        favValidators,
        addFavValidators,
        deleteFavValidators,
        favAddresses,
        addFavAddresses,
        deleteFavAddresses,
        updateFavAddresses,
      }}
    >
      {children}
    </GeneralContext.Provider>
  )
}

const useGeneralContext = (): GeneralState => React.useContext(GeneralContext)

export { GeneralProvider, useGeneralContext }
