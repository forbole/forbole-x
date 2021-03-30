import get from 'lodash/get'
import keyBy from 'lodash/keyBy'
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
  crypto: string
): number => {
  const units = keyBy(get(cryptocurrencies[crypto], 'chainConfig.denomUnits', []), 'denom')
  const display = get(cryptocurrencies[crypto], 'chainConfig.display', '')
  const base = get(cryptocurrencies[crypto], 'chainConfig.base', '')
  return (
    coins
      .map((c) => Number(c.amount) * 10 ** (-1 * get(units[c.denom], 'exponent', 0)))
      .reduce((a, b) => a + b, 0) *
    10 ** (get(units[base], 'exponent', 0) - get(units[display], 'exponent', 0))
  )
}