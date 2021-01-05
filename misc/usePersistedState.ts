import React from 'react'

const usePersistedState = <P>(
  key: string,
  initialValue: P
): [P, React.Dispatch<React.SetStateAction<P>>, boolean] => {
  const [value, setValue] = React.useState(initialValue)
  const [loaded, setLoaded] = React.useState(false)
  const retrievePersistedValue = React.useCallback(async () => {
    try {
      const persistedString = await localStorage.getItem(key)
      if (!persistedString) {
        setLoaded(true)
        return
      }
      const persistedValue = JSON.parse(persistedString)
      setValue(persistedValue)
      setLoaded(true)
    } catch (err) {
      // Does nothing
    }
  }, [])
  React.useEffect(() => {
    retrievePersistedValue()
  }, [])

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value])
  return [value, setValue, loaded]
}

export default usePersistedState
