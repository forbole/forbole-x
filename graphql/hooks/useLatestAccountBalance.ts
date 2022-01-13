import { gql, useQuery } from '@apollo/client'
import React from 'react'
import get from 'lodash/get'
import set from 'lodash/set'
import cloneDeep from 'lodash/cloneDeep'
import { getLatestAccountBalance } from '../queries/accountBalances'

let isSkippedState = false

const useLatestAccountBalance = (crypto: string, address: string) => {
  const queryResult = useQuery(
    gql`
      ${getLatestAccountBalance(crypto)}
    `,
    {
      variables: {
        address,
      },
      pollInterval: 15000,
    }
  )
  const [result, setResult] = React.useState<any>({ data: {} })

  // HACK: prevent rewards returned from bdjuno to jump to 0
  React.useEffect(() => {
    setResult((r) => {
      const resultToReturn = cloneDeep(queryResult)
      if (
        get(resultToReturn, 'data.account[0].rewards', []).length === 0 &&
        get(r, 'data.account[0].rewards', []).length > 0 &&
        !isSkippedState
      ) {
        set(resultToReturn, 'data.account[0].rewards', get(r, 'data.account[0].rewards', []))
        isSkippedState = true
      } else {
        isSkippedState = false
      }
      return resultToReturn
    })
  }, [queryResult])

  return result
}

export default useLatestAccountBalance
