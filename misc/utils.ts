import get from 'lodash/get'
import keyBy from 'lodash/keyBy'
import cloneDeep from 'lodash/cloneDeep'
import cryptocurrencies from './cryptocurrencies'

export const formatPercentage = (percent: number, lang: string): string =>
  new Intl.NumberFormat(lang, {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(percent)

export const formatCrypto = (
  amount: number,
  unit: string,
  lang: string,
  hideUnit?: boolean
): string =>
  `${new Intl.NumberFormat(lang, {
    signDisplay: 'never',
    maximumFractionDigits: 4,
  }).format(amount)}${hideUnit ? '' : ` ${unit}`}`

export const formatCurrency = (
  amount: number,
  currency: string,
  lang: string,
  hideUnit?: boolean,
  compact?: boolean
): string =>
  `${new Intl.NumberFormat(lang, {
    style: 'currency',
    currency,
    notation: compact ? 'compact' : undefined,
  }).format(amount)}${hideUnit ? '' : ` ${currency}`}`

export const getTokenAmountFromDenoms = (
  coins: Array<{ denom: string; amount: string }>,
  denoms: TokenPrice[]
): { [key: string]: { amount: number; price: number } } => {
  const result = {}
  coins.forEach((coin) => {
    denoms.forEach((d) => {
      const unit = get(d, 'token_unit.token.token_units', []).find((t) => t.denom === coin.denom)
      if (unit) {
        const base = get(d, 'token_unit.token.token_units', []).find((t) => t.denom === d.name)
        if (result[base.denom]) {
          result[base.denom].amount += Number(coin.amount) * 10 ** (unit.exponent - base.exponent)
        } else {
          result[base.denom] = {
            amount: Number(coin.amount) * 10 ** (unit.exponent - base.exponent),
            price: d.price,
          }
        }
      }
    })
  })
  return result
}

export const getTotalTokenAmount = ({
  balance,
  timestamp,
}: AccountBalance): { amount: TokenAmount; timestamp: number } => {
  const amount = {}
  Object.values(balance).forEach((ba) => {
    Object.keys(ba).forEach((t) => {
      if (!amount[t]) {
        amount[t] = { amount: 0, price: 0 }
      }
      amount[t].amount = (amount[t].amount || 0) + ba[t].amount
      amount[t].price = ba[t].price
    })
  })
  return {
    amount,
    timestamp,
  }
}

export const getTotalBalance = ({
  balance,
  timestamp,
}: AccountBalance): { balance: number; timestamp: number } => ({
  balance: Object.values(balance)
    .map((ba) =>
      Object.values(ba)
        .map((b) => b.amount * b.price)
        .reduce((x, y) => x + y, 0)
    )
    .reduce((x, y) => x + y, 0),
  timestamp,
})

export const getWalletsBalancesFromAccountsBalances = (
  wallets: Wallet[],
  accounts: AccountWithBalance[]
): WalletWithBalance[] =>
  wallets.map((w) => {
    const accBalances = accounts
      .filter((a) => a.walletId === w.id)
      .map((a) => a.balances.map((b) => getTotalBalance(b)))
    let balances = accBalances[0] || []
    accBalances.forEach((ab) => {
      balances = balances.map((b, i) => ({
        balance: b.balance + ab[i].balance,
        timestamp: b.timestamp,
      }))
    })
    return {
      ...w,
      balances,
    }
  })

export const createEmptyChartData = (
  rawData: Array<{
    balance: number
    timestamp: number
  }>,
  from: number,
  to: number
): Array<{ balance: number; timestamp: number }> => {
  // Create a straight line
  const data = cloneDeep(rawData)
  if (data.length === 0) {
    data.unshift(
      {
        balance: 0,
        timestamp: from,
      },
      {
        balance: 0,
        timestamp: to,
      }
    )
  } else if (data.length === 1) {
    data.unshift({ balance: data[0].balance, timestamp: from })
  }
  return data
}
