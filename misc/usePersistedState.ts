import React from 'react'

const usePersistedState = <P>(
  key: string,
  initialValue: P
): [P, React.Dispatch<React.SetStateAction<P>>] => {
  const [value, setValue] = React.useState(initialValue)
  const retrievePersistedValue = React.useCallback(() => {
    try {
      const persistedString = localStorage.getItem(key)
      if (!persistedString) {
        return
      }
      const persistedValue = JSON.parse(persistedString)
      setValue(persistedValue)
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
  return [value, setValue]
}

export default usePersistedState
