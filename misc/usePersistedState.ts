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
): [P, React.Dispatch<React.SetStateAction<P>>] => {
  const [value, setValue] = React.useState(retrievePersistedValue(key, initialValue))

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value])
  return [value, setValue]
}

export default usePersistedState
