import React from 'react'

const retrievePersistedValue = <P>(key: string, initialValue: P, expireWithinMs?: number) => {
  try {
    const persistedString = localStorage.getItem(key)
    if (!persistedString) {
      return initialValue
    }
    if (expireWithinMs) {
      const lastUpdatedAt = localStorage.getItem(`${key}-last-updated-at`)
      if (Number(lastUpdatedAt) + expireWithinMs < Date.now()) {
        localStorage.removeItem(key)
        localStorage.removeItem(`${key}-last-updated-at`)
        return initialValue
      }
    }
    const persistedValue = JSON.parse(persistedString)
    return persistedValue
  } catch (err) {
    return initialValue
  }
}

const usePersistedState = <P>(
  key: string,
  initialValue: P,
  expireWithinMs?: number,
  disabled?: boolean
): [P, React.Dispatch<React.SetStateAction<P>>, boolean] => {
  const persistedValue = retrievePersistedValue(key, initialValue, expireWithinMs)
  const [value, setValue] = React.useState(persistedValue)
  const [loaded, setLoaded] = React.useState(false)
  React.useEffect(() => {
    if (persistedValue !== value && !disabled) {
      localStorage.setItem(key, JSON.stringify(value))
      if (expireWithinMs) {
        localStorage.setItem(`${key}-last-updated-at`, String(Date.now()))
      }
    }
    if (disabled) {
      localStorage.removeItem(key)
      localStorage.removeItem(`${key}-last-updated-at`)
    }
  }, [value, persistedValue, expireWithinMs, disabled])
  // for conditional rendering in SSR
  React.useEffect(() => {
    setLoaded(true)
  }, [])
  return [value, setValue, loaded]
}

export default usePersistedState
