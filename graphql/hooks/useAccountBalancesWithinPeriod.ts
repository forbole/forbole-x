import { useQuery } from '@apollo/client'
import get from 'lodash/get'
import flatten from 'lodash/flatten'
import keyBy from 'lodash/keyBy'
import groupBy from 'lodash/groupBy'
import { getAccountBalances } from '../queries/accountBalances'
import { getBlocksByPeriod } from '../queries/blocks'
import { getTokenAmountFromDenoms } from '../../misc/utils'
import { useWalletsContext } from '../../contexts/WalletsContext'
import cryptocurrencies from '../../misc/cryptocurrencies'

export const useAccountBalancesWithinPeriodForSingleCrypto = (
  crypto: string,
  addresses: string[],
  from: Date,
  to: Date
): Array<{ address: string; balances: Array<{ balance: number; timestamp: string }> }> => {
  const { data: blockPeriod } = useQuery(getBlocksByPeriod(crypto), {
    variables: {
      from,
      to,
    },
  })
  const { data: balances } = useQuery(getAccountBalances(crypto), {
    variables: {
      addresses,
      minHeight: get(blockPeriod, 'fromBlock[0].height', 0),
      maxHeight: get(blockPeriod, 'toBlock[0].height', 0),
    },
  })

  const result = get(balances, 'account', []).map((a) => ({
    ...a,
    balances: a.balances.map((b) => ({
      balance: getTokenAmountFromDenoms(b.coins, crypto),
      timestamp: new Date(get(b, 'block.timestamp')).getTime(),
    })),
  }))
  return result
}

const useAccountBalancesWithinPeriod = (
  from: Date,
  to: Date
): { accounts: AccountWithBalance[]; wallets: WalletWithBalance[] } => {
  const { accounts, wallets } = useWalletsContext()
  // const accounts = [
  //   { address: 'desmos1s9z0nzuu23fvac8u0j4tgvhgyg83ulc4qxs6z6', crypto: 'DSM', walletId: '123' },
  //   { address: 'desmos1dzn2s7l0wm9kekyazcnhapu8j95n90efmcmrad', crypto: 'DSM', walletId: '123' },
  // ]
  // const wallets = [{ id: '123' }]
  const accountsByCrypto = groupBy(accounts, 'crypto')
  const results = flatten(
    Object.keys(cryptocurrencies).map((crypto) =>
      useAccountBalancesWithinPeriodForSingleCrypto(
        crypto,
        get(accountsByCrypto, crypto, []).map((a) => a.address),
        from,
        to
      )
    )
  )
  const resultsKey = keyBy(results, 'address')
  const accountsWithBalances = accounts.map((a) => ({
    ...a,
    balances: get(resultsKey, `${a.address}.balances`, []) as Balance[],
  }))

  // TODO: account for fiat value
  const walletsWithBalances = wallets.map((w) => {
    const walletAccounts = accountsWithBalances.filter((a) => a.walletId === w.id)
    const balances = flatten(
      walletAccounts.map((a) =>
        a.balances.map((b) => ({ ...b, balance: { [a.address]: b.balance } }))
      )
    ).sort((a, b) => b.timestamp - a.timestamp)
    const balancesBreakdownByAddress = balances.map((b, i) => {
      const balance = {}
      walletAccounts.forEach((a) => {
        balance[a.address] = get(
          b,
          `balance.${a.address}`,
          get(balances, `[${i - 1}]balance.${a.address}`, 0)
        )
      })
      return { ...b, balance }
    })
    return {
      ...w,
      balances: balancesBreakdownByAddress.map((b) => ({
        ...b,
        balance: Object.values<number>(b.balance).reduce((x, y) => x + y, 0),
      })),
    }
  })
  return {
    accounts: accountsWithBalances,
    wallets: walletsWithBalances,
  }
}

export default useAccountBalancesWithinPeriod
