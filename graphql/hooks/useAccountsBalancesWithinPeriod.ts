import React from 'react'
import get from 'lodash/get'
import flatten from 'lodash/flatten'
import cryptocurrencies from '../../misc/cryptocurrencies'
import { getTokenAmountFromDenoms } from '../../misc/utils'
import { getAccountBalanceAtHeight } from '../queries/accountBalances'
import { getBlockByTimestamp } from '../queries/blocks'

const fetchBalance = async (address: string, crypto: string, timestamp: Date) => {
  const block = await fetch(cryptocurrencies[crypto].graphqlHttpUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: getBlockByTimestamp(crypto),
      variables: { timestamp },
    }),
  }).then((r) => r.json())
  const balanceResult = await fetch(cryptocurrencies[crypto].graphqlHttpUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: getAccountBalanceAtHeight(crypto, address),
      variables: { height: get(block, 'data.block[0].height'), timestamp },
    }),
  }).then((r) => r.json())

  const denoms = get(balanceResult, 'data.token_price_history', [])

  const available = getTokenAmountFromDenoms(
    get(balanceResult, 'data.action_account_balance.coins', []),
    denoms
  )
  const delegated = getTokenAmountFromDenoms(
    flatten(get(balanceResult, 'data.action_delegation.delegations', []).map((d) => d.coins)),
    denoms
  )
  const unbonding = getTokenAmountFromDenoms(
    flatten(
      get(balanceResult, 'data.action_unbonding_delegation.unbonding_delegations', []).map((d) =>
        d.entries.map((e) => ({ amount: e.balance, denom: cryptocurrencies[crypto].gasFee.denom }))
      )
    ),
    denoms
  )

  const commissions = getTokenAmountFromDenoms(
    get(balanceResult, 'data.action_validator_commission_amount.coins', []),
    denoms
  )
  const rewards = getTokenAmountFromDenoms(
    flatten(get(balanceResult, 'data.action_delegation_reward', []).map((r) => r.coins)),
    denoms
  )

  return {
    balance: {
      available,
      delegated,
      unbonding,
      commissions,
      rewards,
    },
    timestamp: timestamp.getTime(),
    availableTokens: {
      coins: get(balanceResult, 'data.action_account_balance.coins', []),
      tokens_prices: denoms,
    },
  }
}

const fetchAccountsBalancesWithinPeriod = async (
  accounts: Account[],
  timestamps: Date[]
): Promise<AccountWithBalance[]> => {
  const results = await Promise.all(
    accounts.map((a) => Promise.all(timestamps.map((t) => fetchBalance(a.address, a.crypto, t))))
  )
  return accounts.map((a, i) => ({
    ...a,
    balances: results[i].sort((x, y) => x.timestamp - y.timestamp),
  }))
}

const useAccountsBalancesWithinPeriod = (
  accounts: Account[],
  timestamps: Date[]
): { data: AccountWithBalance[]; loading: boolean } => {
  const [loading, setLoading] = React.useState(false)
  const [data, setData] = React.useState<AccountWithBalance[]>([])

  const getWalletsWithBalance = React.useCallback(async () => {
    try {
      setLoading(true)
      const result = await fetchAccountsBalancesWithinPeriod(accounts, timestamps)
      setData(result)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }, [accounts.length, timestamps])

  React.useEffect(() => {
    getWalletsWithBalance()
  }, [getWalletsWithBalance])

  return { data, loading }
}

export default useAccountsBalancesWithinPeriod
