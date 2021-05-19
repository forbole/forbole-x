import React from 'react'

const retrievePersistedValue = <P>(key: string, initialValue: P) => {
  try {
    const persistedString = localStorage.getItem(key)
    if (!persistedString) {
      return initialValue
    }
    const persistedValue = JSON.parse(persistedString)
    return persistedValue
  } catch (err) {
    return initialValue
  }
}

const usePersistedState = <P>(
  key: string,
  initialValue: P
): [P, React.Dispatch<React.SetStateAction<P>>, boolean] => {
  const [value, setValue] = React.useState(retrievePersistedValue(key, initialValue))
  const [loaded, setLoaded] = React.useState(false)
  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value])
  // for conditional rendering in SSR
  React.useEffect(() => {
    setLoaded(true)
  }, [])
  return [value, setValue, loaded]
}

export default usePersistedState
