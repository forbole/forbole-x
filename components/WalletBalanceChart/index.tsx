import { Card } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import get from 'lodash/get'
import last from 'lodash/last'
import { useGeneralContext } from '../../contexts/GeneralContext'
import { useWalletsContext } from '../../contexts/WalletsContext'
import SelectWalletButton from './SelectWalletButton'
import useStyles from './styles'
import BalanceChart, { dateRanges } from '../BalanceChart'
import {
  createEmptyChartData,
  formatCrypto,
  formatCurrency,
  getCoinPrice,
  getWalletsBalancesFromAccountsBalances,
} from '../../misc/utils'
import useAccountsBalancesWithinPeriod from '../../graphql/hooks/useAccountsBalancesWithinPeriod'

const WalletBalanceChart: React.FC = () => {
  const classes = useStyles()
  const { lang } = useTranslation('common')
  const { currency, currencyRate, hideAmount } = useGeneralContext()
  const { accounts, wallets } = useWalletsContext()
  const [currentWallet, setCurrentWallet] = React.useState(wallets[0])
  const [timestamps, setTimestamps] = React.useState<Date[]>(
    dateRanges.find((d) => d.isDefault).timestamps.map((timestamp) => new Date(timestamp))
  )
  const { data: accountsWithBalance, loading } = useAccountsBalancesWithinPeriod(
    accounts.filter((a) => a.walletId === get(currentWallet, 'id', '')),
    timestamps
  )
  const walletWithBalance = React.useMemo(
    () => getWalletsBalancesFromAccountsBalances([currentWallet], accountsWithBalance)[0],
    [currentWallet, accountsWithBalance]
  )
  const [btcPrice, setBtcPrice] = React.useState(0)

  const balance = walletWithBalance ? get(last(walletWithBalance.balances), 'balance', 0) : 0
  const btcBalance = btcPrice ? balance / btcPrice : 0

  const data = React.useMemo(
    () =>
      createEmptyChartData(
        get(walletWithBalance, 'balances', []),
        timestamps[0].getTime(),
        last(timestamps).getTime()
      ),
    [walletWithBalance, timestamps]
  )

  const getBtcPrice = React.useCallback(async () => {
    try {
      const price = await getCoinPrice('bitcoin')
      setBtcPrice(price)
    } catch (err) {
      console.log(err)
    }
  }, [])

  React.useEffect(() => {
    setCurrentWallet((c) => c || wallets[0])
  }, [wallets])

  React.useEffect(() => {
    getBtcPrice()
  }, [getBtcPrice])

  return (
    <Card className={classes.container}>
      <SelectWalletButton
        wallets={wallets}
        currentWallet={currentWallet}
        onWalletChange={setCurrentWallet}
      />
      <BalanceChart
        data={data}
        title={formatCurrency(balance * currencyRate, { currency, lang, hideAmount })}
        subtitle={formatCrypto(btcBalance, { unit: '฿', lang, hideAmount })}
        onDateRangeChange={(dateRange) => {
          setTimestamps(dateRange.timestamps.map((t) => new Date(t)))
        }}
        loading={loading}
      />
    </Card>
  )
}

export default WalletBalanceChart
