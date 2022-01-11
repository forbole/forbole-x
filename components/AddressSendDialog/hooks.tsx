import React from 'react'
import get from 'lodash/get'
import { gql, useQuery } from '@apollo/client'
import { getTokenAmountFromDenoms } from '../../misc/utils'
import { getLatestAccountBalance } from '../../graphql/queries/accountBalances'

interface useAddressSendDialogHookProps {
  crypto: any
  account: Account
}

export const useAddressSendDialogHook = ({ account, crypto }: useAddressSendDialogHookProps) => {
  const getAvailableAmount = () => {
    const { data: balanceData } = useQuery(
      gql`
        ${getLatestAccountBalance(crypto.name)}
      `,
      {
        variables: {
          address: account?.address || '',
        },
        pollInterval: 15000,
      }
    )
    const availableTokens = get(balanceData, 'account[0].available[0]', {
      coins: [],
      tokens_prices: [],
    })

    const availableAmount = React.useMemo(
      () => getTokenAmountFromDenoms(availableTokens.coins, availableTokens.tokens_prices),
      [availableTokens]
    )
    return {
      availableAmount,
      availableTokens,
    }
  }
  return {
    getAvailableAmount,
  }
}
