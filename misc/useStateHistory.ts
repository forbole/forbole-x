import React from 'react'
import dropRight from 'lodash/dropRight'
import last from 'lodash/last'

const useStateHistory = <P>(
  initialState: P
): [
  P,
  (state: P, resetHistory?: boolean, replaceHistory?: boolean) => void,
  () => void,
  boolean
] => {
  const [states, setStates] = React.useState([initialState])
  const setNextState = React.useCallback(
    (state: P, resetHistory?: boolean, replaceHistory?: boolean) => {
      setStates((s) => {
        if (resetHistory) {
          return [state]
        }
        if (replaceHistory) {
          return [...dropRight(s), state]
        }
        return [...s, state]
      })
    },
    [setStates]
  )
  const toPrevStage = React.useCallback(() => {
    setStates((s) => dropRight(s))
  }, [setStates])

  const isPrevStateAvailable = React.useMemo(() => states.length > 1, [states.length])

  return [last(states), setNextState, toPrevStage, isPrevStateAvailable]
}

export default useStateHistory
