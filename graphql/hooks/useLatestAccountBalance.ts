import { gql, useQuery } from '@apollo/client'
import React from 'react'
import get from 'lodash/get'
import flatten from 'lodash/flatten'
import { getLatestAccountBalance } from '../queries/accountBalances'

const useLatestAccountBalance = (crypto: string, address: string) => {
  const queryResult = useQuery(
    gql`
      ${getLatestAccountBalance(crypto, address)}
    `,
    {
      pollInterval: 15000,
    }
  )

  const data = {
    account: [
      {
        available: [
          {
            tokens_prices: get(queryResult, 'data.token_price', []),
            coins: get(queryResult, 'data.action_account_balance.coins', []),
          },
        ],
        delegated: get(queryResult, 'data.action_delegation_total.coins', []).map((r) => ({
          amount: r,
        })),
        unbonding: get(queryResult, 'data.action_unbonding_delegation_total.coins', []).map(
          (r) => ({
            amount: r,
          })
        ),
        rewards: flatten(
          get(queryResult, 'data.action_delegation_reward', []).map((r) => ({
            amount: r.coins,
          }))
        ).filter((c: any) => c.amount),
        commissions: get(queryResult, 'data.action_validator_commission_amount.coins', []).map(
          (r) => ({
            amount: r,
          })
        ),
      },
    ],
  }
  console.log(data)

  return { ...queryResult, data }
}

export default useLatestAccountBalance
