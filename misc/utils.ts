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

export const createEmptyChartData = (
  rawData: Array<{
    balance: number
    time: number
  }>,
  from: number,
  to: number
): Array<{ balance: number; time: number }> => {
  // Create a straight line
  const data = cloneDeep(rawData)
  if (data.length === 0) {
    data.unshift(
      {
        balance: 0,
        time: from,
      },
      {
        balance: 0,
        time: to,
      }
    )
  } else if (data.length === 1) {
    data.unshift({ balance: data[0].balance, time: from })
  }
  return data
}
