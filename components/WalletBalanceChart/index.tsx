import { Box, Button, Card, Typography, useTheme } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import format from 'date-fns/format'
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from 'recharts'
import { useSettingsContext } from '../../contexts/SettingsContext'
import { useWalletsContext } from '../../contexts/WalletsContext'
import SelectWalletButton from './SelectWalletButton'
import useStyles from './styles'

interface WalletBalanceChartProps {}

const WalletBalanceChart: React.FC<WalletBalanceChartProps> = () => {
  const { wallets } = useWalletsContext()
  const classes = useStyles()
  const { t, lang } = useTranslation('common')
  const { currency } = useSettingsContext()
  const theme = useTheme()
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
      <Box mt={1} mb={2} display="flex" justifyContent="space-between" alignItems="flex-end">
        <Box>
          <Typography variant="h2" gutterBottom>
            {new Intl.NumberFormat(lang, { style: 'currency', currency }).format(balance)}
          </Typography>
          <Typography variant="h6">
            {new Intl.NumberFormat(lang, { signDisplay: 'never' }).format(btcBalance)} {'฿'}
          </Typography>
        </Box>
        <Box display="flex">
          <Button className={classes.timeRangeButton} size="small" variant="outlined">
            {t('day')}
          </Button>
          <Button className={classes.timeRangeButton} size="small" variant="outlined">
            {t('week')}
          </Button>
          <Button className={classes.timeRangeButton} size="small" variant="outlined">
            {t('month')}
          </Button>
        </Box>
      </Box>
      <ResponsiveContainer width="100%" aspect={2}>
        <LineChart data={data}>
          <CartesianGrid stroke={theme.palette.grey[100]} />
          <XAxis
            dataKey="time"
            tickFormatter={(v) => format(v, 'd MMM')}
            type="number"
            ticks={new Array(7).fill(null).map((_a, i) => now - (6 - i) * 24 * 3600000)}
            domain={['dataMin', 'dataMax']}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => new Intl.NumberFormat(lang, { signDisplay: 'never' }).format(v)}
          />
          <Tooltip
            formatter={(v, n) => [
              new Intl.NumberFormat(lang, { style: 'currency', currency }).format(v),
            ]}
            labelFormatter={(v) => format(v, 'd MMM h:ma')}
          />
          <Line
            type="monotone"
            dataKey="balance"
            stroke={theme.palette.success.main}
            dot={false}
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default WalletBalanceChart
