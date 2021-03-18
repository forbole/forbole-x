import { Card } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { useSettingsContext } from '../../contexts/SettingsContext'
import { useWalletsContext } from '../../contexts/WalletsContext'
import SelectWalletButton from './SelectWalletButton'
import useStyles from './styles'
import BalanceChart from '../BalanceChart'

const WalletBalanceChart: React.FC = () => {
  const { wallets } = useWalletsContext()
  const classes = useStyles()
  const { lang } = useTranslation('common')
  const { currency } = useSettingsContext()
  const [currentWallet, setCurrentWallet] = React.useState(wallets[0])
  // TODO: fetch data from backend
  const now = Date.now()
  const balance = 656333.849
  const btcBalance = 57.987519
  const delta = new Array(24 * 7).fill(null).map(() => (Math.random() - 0.5) / 10)
  const data = []
  delta.forEach((d, i) => {
    data.unshift({
      time: now - i * 3600000,
      balance: i === 0 ? balance : data[0].balance * (1 + d),
    })
  })

  return (
    <Card className={classes.container}>
      <SelectWalletButton
        wallets={wallets}
        currentWallet={currentWallet}
        onWalletChange={setCurrentWallet}
      />
      <BalanceChart
        data={data}
        ticks={new Array(7).fill(null).map((_a, i) => now - (6 - i) * 24 * 3600000)}
        title={`${new Intl.NumberFormat(lang, {
          style: 'currency',
          currency,
        }).format(balance)} ${currency}`}
        subtitle={`${new Intl.NumberFormat(lang, {
          signDisplay: 'never',
        }).format(btcBalance)} ฿`}
      />
    </Card>
  )
}

export default WalletBalanceChart
