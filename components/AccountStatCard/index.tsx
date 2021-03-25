import { Box, Card, Avatar, Typography, Button, useTheme } from '@material-ui/core'
import React from 'react'
import { LineChart, Line, YAxis } from 'recharts'
import UpIcon from '@material-ui/icons/ArrowDropUp'
import DownIcon from '@material-ui/icons/ArrowDropDown'
import useTranslation from 'next-translate/useTranslation'
import useStyles from './styles'
import { useSettingsContext } from '../../contexts/SettingsContext'
import cryptocurrencies from '../../misc/cryptocurrencies'
import { formatCrypto, formatCurrency, formatPercentage } from '../../misc/utils'

interface AccountStatCardProps {
  account: Account
}

const AccountStatCard: React.FC<AccountStatCardProps> = ({ account }) => {
  const crypto = cryptocurrencies[account.crypto]
  const classes = useStyles()
  const theme = useTheme()
  const { lang } = useTranslation()
  const { currency } = useSettingsContext()
  // TODO: fetch data from backend
  const now = Date.now()
  const balance = 104387.26
  const usdBalance = 626323.54
  const delta = new Array(24).fill(null).map(() => (Math.random() - 0.5) / 10)
  const data = []
  delta.forEach((d, i) => {
    data.unshift({
      time: now - i * 3600000,
      balance: i === 0 ? usdBalance : data[0].balance * (1 + d),
    })
  })
  const lastBalance = data[23].balance
  const firstBalance = data[0].balance
  const diff = Math.abs(lastBalance - firstBalance)
  const percentageChange = Math.round((10000 * diff) / firstBalance) / 100
  const increasing = lastBalance - firstBalance > 0
  return (
    <Card className={classes.container}>
      <Box mb={7} display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Avatar alt={crypto.name} src={crypto.image} />
          <Typography className={classes.name} variant="h5">
            {account.name}
          </Typography>
        </Box>
        <Button variant="outlined">Delegate</Button>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <LineChart width={theme.spacing(20)} height={theme.spacing(5)} data={data}>
            <YAxis domain={['dataMin', 'dataMax']} hide />
            <Line
              type="monotone"
              dataKey="balance"
              stroke={increasing ? theme.palette.success.main : theme.palette.error.main}
              dot={false}
              strokeWidth={2}
            />
          </LineChart>
          <Box display="flex" mt={1} alignItems="center">
            {increasing ? (
              <UpIcon htmlColor={theme.palette.success.main} />
            ) : (
              <DownIcon htmlColor={theme.palette.error.main} />
            )}
            <Box mr={2}>
              <Typography color="textSecondary">
                {formatPercentage(percentageChange, lang)} (24h)
              </Typography>
            </Box>
            <Typography>{formatCurrency(diff, currency, lang)}</Typography>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="flex-end">
          <Typography variant="h4" align="right">
            {formatCrypto(balance, crypto.name, lang)}
          </Typography>
          <Typography variant="h6" align="right">
            {formatCurrency(usdBalance, currency, lang)}
          </Typography>
        </Box>
      </Box>
    </Card>
  )
}

export default AccountStatCard
