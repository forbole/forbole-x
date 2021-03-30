import { Box, Card, Avatar, Typography, Button, useTheme } from '@material-ui/core'
import React from 'react'
import { LineChart, Line, YAxis } from 'recharts'
import UpIcon from '@material-ui/icons/ArrowDropUp'
import DownIcon from '@material-ui/icons/ArrowDropDown'
import useTranslation from 'next-translate/useTranslation'
import last from 'lodash/last'
import get from 'lodash/get'
import { useRouter } from 'next/router'
import { addDays } from 'date-fns'
import useStyles from './styles'
import { useSettingsContext } from '../../contexts/SettingsContext'
import cryptocurrencies from '../../misc/cryptocurrencies'
import {
  createEmptyChartData,
  formatCrypto,
  formatCurrency,
  formatPercentage,
} from '../../misc/utils'

interface AccountStatCardProps {
  account: AccountWithBalance
}

const AccountStatCard: React.FC<AccountStatCardProps> = ({ account }) => {
  const crypto = cryptocurrencies[account.crypto]
  const classes = useStyles()
  const theme = useTheme()
  const { lang } = useTranslation()
  const { currency } = useSettingsContext()
  const router = useRouter()

  const balance = get(last(account.balances), 'balance', 0)
  const usdBalance = get(last(account.balances), 'price', 0) * balance

  const now = Date.now()
  const lastWeek = addDays(now, -7).getTime()

  const data = createEmptyChartData(
    account.balances
      .filter((b) => b.timestamp > lastWeek)
      .map((b) => ({
        balance: b.balance * b.price,
        time: b.timestamp,
      })),
    lastWeek,
    now
  )

  const firstBalance = get(data, '[0].balance', 0)
  const diff = Math.abs(usdBalance - firstBalance)
  const percentageChange = Math.round((100 * diff) / firstBalance) / 100 || 0
  const increasing = usdBalance - firstBalance > 0
  return (
    <Card
      className={classes.container}
      onClick={(e) => {
        const targetClassName = String((e.target as any).className)
        if (targetClassName.includes('MuiBox-root') || targetClassName.includes('MuiCard-root')) {
          router.push(`/account/${account.address}`)
        }
      }}
    >
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
