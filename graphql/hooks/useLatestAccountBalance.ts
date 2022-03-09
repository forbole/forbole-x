import { gql, useQuery } from '@apollo/client'
import get from 'lodash/get'
import flatten from 'lodash/flatten'
import { getLatestAccountBalance } from '../queries/accountBalances'
import cryptocurrencies from '../../misc/cryptocurrencies'

export const transformHasuraActionResult = (queryResult: any, denom: string) => ({
  account: [
    {
      available: [
        {
          tokens_prices: get(queryResult, 'data.token_price', []),
          coins: get(queryResult, 'data.action_account_balance.coins', []),
        },
      ],
      delegated: get(queryResult, 'data.action_delegation.delegations', []).map((r) => ({
        amount: get(r, 'coins[0]', { amount: '0', denom }),
        validator: {
          validator_info: {
            operator_address: r.validator_address,
          },
        },
      })),
      unbonding: flatten(
        get(queryResult, 'data.action_unbonding_delegation.unbonding_delegations', []).map((r) =>
          get(r, 'entries', []).map((u) => ({
            amount: {
              amount: u.balance,
              denom,
            },
            completion_timestamp: u.completion_time,
            validator: {
              validator_info: {
                operator_address: r.validator_address,
              },
            },
          }))
        )
      ),
      rewards: flatten(
        get(queryResult, 'data.action_delegation_reward', []).map((r) => ({
          amount: r.coins,
          validator: {
            validator_info: {
              operator_address: r.validator_address,
            },
          },
        }))
      ).filter((c: any) => c.amount),
      commissions: get(queryResult, 'data.action_validator_commission_amount.coins', []).map(
        (r) => ({
          amount: r,
        })
      ),
    },
  ],
})

const useLatestAccountBalance = (crypto: string, address: string) => {
  const queryResult = useQuery(
    gql`
      ${getLatestAccountBalance(crypto, address)}
    `,
    {
      pollInterval: 15000,
    }
  )

  const data = transformHasuraActionResult(queryResult, cryptocurrencies[crypto].gasFee.denom)

  return { ...queryResult, data }
}

export default useLatestAccountBalance
