import React from 'react'
import get from 'lodash/get'
import cryptocurrencies from '../../misc/cryptocurrencies'
import { transformGqlAcountBalance } from '../../misc/utils'
import { getBalanceAtHeight } from '../queries/accountBalances'
import { getBlockAtTimestamp } from '../queries/blocks'

const fetchBalance = async (address: string, crypto: string, timestamp: Date) => {
  const block = await fetch(cryptocurrencies[crypto].graphqlHttpUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: getBlockAtTimestamp(crypto),
      variables: { timestamp },
    }),
  }).then((r) => r.json())
  const balance = await fetch(cryptocurrencies[crypto].graphqlHttpUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: getBalanceAtHeight(crypto),
      variables: { address, height: get(block, 'data.block[0].height', 0) },
    }),
  }).then((r) => r.json())
  return transformGqlAcountBalance(balance.data, timestamp.getTime())
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
