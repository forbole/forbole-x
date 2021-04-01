import { Card } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import last from 'lodash/last'
import get from 'lodash/get'
import { useSettingsContext } from '../../contexts/SettingsContext'
import SelectWalletButton from './SelectWalletButton'
import useStyles from './styles'
import BalanceChart from '../BalanceChart'
import { createEmptyChartData, formatCrypto, formatCurrency } from '../../misc/utils'

interface WalletBalanceChartProps {
  walletsWithBalance: WalletWithBalance[]
  onTimestampsChange?(timestamps: Date[]): void
}

const WalletBalanceChart: React.FC<WalletBalanceChartProps> = ({
  walletsWithBalance,
  onTimestampsChange,
}) => {
  const classes = useStyles()
  const { lang } = useTranslation('common')
  const { currency } = useSettingsContext()
  const [currentWallet, setCurrentWallet] = React.useState(walletsWithBalance[0])
  const [dataFrom, setDataFrom] = React.useState(0)
  const [dataTo, setDataTo] = React.useState(1)
  const balance = currentWallet ? get(last(currentWallet.balances), 'balance', 0) : 0
  // TODO: calculate BTC value
  const btcBalance = 57.987519
  // TODO: handle date range change
  const data = createEmptyChartData(get(currentWallet, 'balances', []), dataFrom, dataTo)

  React.useEffect(() => {
    setCurrentWallet((c) => {
      if (c) {
        return walletsWithBalance.find((w) => w.id === c.id)
      }
      return walletsWithBalance[0]
    })
  }, [walletsWithBalance])

  return (
    <Card className={classes.container}>
      <SelectWalletButton
        wallets={walletsWithBalance}
        currentWallet={currentWallet}
        onWalletChange={setCurrentWallet}
      />
      <BalanceChart
        data={data}
        title={formatCurrency(balance, currency, lang)}
        subtitle={formatCrypto(btcBalance, '฿', lang)}
        onDateRangeChange={(dateRange) => {
          onTimestampsChange(dateRange.timestamps.map((t) => new Date(t)))
          setDataFrom(dateRange.timestamps[0])
          setDataTo(last(dateRange.timestamps))
        }}
      />
    </Card>
  )
}

export default WalletBalanceChart
