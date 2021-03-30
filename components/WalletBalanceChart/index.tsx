import { Card } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import last from 'lodash/last'
import get from 'lodash/get'
import { useSettingsContext } from '../../contexts/SettingsContext'
import SelectWalletButton from './SelectWalletButton'
import useStyles from './styles'
import BalanceChart from '../BalanceChart'
import { formatCrypto, formatCurrency } from '../../misc/utils'

interface WalletBalanceChartProps {
  walletsWithBalance: WalletWithBalance[]
}

const WalletBalanceChart: React.FC<WalletBalanceChartProps> = ({ walletsWithBalance }) => {
  const classes = useStyles()
  const { lang } = useTranslation('common')
  const { currency } = useSettingsContext()
  const [currentWallet, setCurrentWallet] = React.useState(walletsWithBalance[0])
  const balance = get(last(currentWallet.balances), 'balance', 0)
  const btcBalance = 57.987519
  const data = currentWallet.balances.map((b) => ({ time: b.timestamp, balance: b.balance }))
  const ticks = React.useMemo(() => {
    const min = get(data, '[0].time', 0)
    const max = get(last(data), 'time', 0)
    const interval = (max - min) / 7
    return new Array(7).fill(0).map((_a, i) => min + i * interval)
  }, [data])

  return (
    <Card className={classes.container}>
      <SelectWalletButton
        wallets={walletsWithBalance}
        currentWallet={currentWallet}
        onWalletChange={setCurrentWallet}
      />
      <BalanceChart
        data={data}
        ticks={ticks}
        title={formatCurrency(balance, currency, lang)}
        subtitle={formatCrypto(btcBalance, '฿', lang)}
      />
    </Card>
  )
}

export default WalletBalanceChart
