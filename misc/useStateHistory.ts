import React from 'react'
import dropRight from 'lodash/dropRight'
import last from 'lodash/last'

const useStateHistory = <P>(
  initialState: P
): [P, (state: P, resetHistory?: boolean) => void, () => void, boolean] => {
  const [states, setStates] = React.useState([initialState])
  const setNextState = React.useCallback(
    (state: P, resetHistory?: boolean) => {
      setStates((s) => (resetHistory ? [state] : [...s, state]))
    },
    [setStates]
  )
  const prevState = React.useCallback(() => {
    setStates((s) => dropRight(s))
  }, [setStates])

  const isPrevStateAvailable = React.useMemo(() => states.length > 1, [states.length])

  return [last(states), setNextState, prevState, isPrevStateAvailable]
}

export default useStateHistory
