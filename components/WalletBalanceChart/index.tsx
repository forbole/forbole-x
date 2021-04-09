import { Card } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import last from 'lodash/last'
import get from 'lodash/get'
import { useSettingsContext } from '../../contexts/SettingsContext'
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
import { useWalletsContext } from '../../contexts/WalletsContext'
import useAccountsBalancesWithinPeriod from '../../graphql/hooks/useAccountsBalancesWithinPeriod'

// const accounts = [
//   { address: 'desmos1s9z0nzuu23fvac8u0j4tgvhgyg83ulc4qxs6z6', crypto: 'DSM', walletId: '123' },
//   { address: 'desmos1dzn2s7l0wm9kekyazcnhapu8j95n90efmcmrad', crypto: 'DSM', walletId: '123' },
// ]
// const wallets = [{ id: '123' }]

const WalletBalanceChart: React.FC = () => {
  const classes = useStyles()
  const { lang } = useTranslation('common')
  const { currency } = useSettingsContext()
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
  console.log(walletWithBalance)
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
        title={formatCurrency(balance, currency, lang)}
        subtitle={formatCrypto(btcBalance, '฿', lang)}
        onDateRangeChange={(dateRange) => {
          setTimestamps(dateRange.timestamps.map((t) => new Date(t)))
        }}
        loading={loading}
      />
    </Card>
  )
}

export default WalletBalanceChart
