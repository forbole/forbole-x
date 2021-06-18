import { Box, Card, Typography, useTheme, CircularProgress } from '@material-ui/core'
import React from 'react'
import { LineChart, Line, YAxis } from 'recharts'
import UpIcon from '@material-ui/icons/ArrowDropUp'
import DownIcon from '@material-ui/icons/ArrowDropDown'
import useTranslation from 'next-translate/useTranslation'
import last from 'lodash/last'
import get from 'lodash/get'
import { useRouter } from 'next/router'
import useStyles from './styles'
import { useGeneralContext } from '../../contexts/GeneralContext'
import cryptocurrencies from '../../misc/cryptocurrencies'
import {
  createEmptyChartData,
  formatCrypto,
  formatCurrency,
  formatPercentage,
  getTotalBalance,
  getTotalTokenAmount,
} from '../../misc/utils'
import useAccountsBalancesWithinPeriod from '../../graphql/hooks/useAccountsBalancesWithinPeriod'
import { dateRanges } from '../BalanceChart'
import AccountAvatar from '../AccountAvatar'

const dailyTimestamps = dateRanges
  .find((d) => d.title === 'day')
  .timestamps.map((timestamp) => new Date(timestamp))

interface AccountStatCardProps {
  account: Account
}

const AccountStatCard: React.FC<AccountStatCardProps> = ({ account }) => {
  const crypto = cryptocurrencies[account.crypto]
  const classes = useStyles()
  const theme = useTheme()
  const { t, lang } = useTranslation('common')
  const { currency } = useGeneralContext()
  const router = useRouter()
  const {
    data: [accountWithBalance],
    loading,
  } = useAccountsBalancesWithinPeriod([account], dailyTimestamps)

  const latestBalance = last(get(accountWithBalance, 'balances', []))
  const tokenAmounts = getTotalTokenAmount(latestBalance).amount
  const usdBalance = getTotalBalance(latestBalance).balance

  const data = createEmptyChartData(
    (get(accountWithBalance, 'balances', []) as AccountBalance[]).map((b) => getTotalBalance(b)),
    0,
    1
  )

  const firstBalance = get(data, '[0].balance', 0)
  const diff = Math.abs(usdBalance - firstBalance)
  const percentageChange = Math.round((100 * diff) / firstBalance) / 100 || 0
  const increasing = usdBalance - firstBalance > 0

  return (
    <>
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
          <AccountAvatar account={account} hideAddress />
          <Button variant="outlined" className={classes.timeRangeButton}>
            {t('delegate')}
          </Button>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            {loading ? (
              <Box
                width={theme.spacing(20)}
                height={theme.spacing(8)}
                mt={-3}
                display="flex"
                justifyContent="center"
              >
                <CircularProgress />
              </Box>
            ) : (
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
            )}
            <Box display="flex" mt={1} alignItems="center">
              {increasing ? (
                <UpIcon htmlColor={theme.palette.success.main} />
              ) : (
                <DownIcon htmlColor={theme.palette.error.main} />
              )}
              <Box mr={2}>
                <Typography color="textSecondary">
                  {formatPercentage(percentageChange, lang)} {t('24h')}
                </Typography>
              </Box>
              <Typography>{formatCurrency(diff, currency, lang)}</Typography>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="flex-end">
            {Object.keys(tokenAmounts).length ? (
              Object.keys(tokenAmounts).map((ta) => (
                <Typography key={ta} variant="h4" align="right">
                  {formatCrypto(tokenAmounts[ta].amount, ta.toUpperCase(), lang)}
                </Typography>
              ))
            ) : (
              <Typography variant="h4" align="right">
                {formatCrypto(0, crypto.name, lang)}
              </Typography>
            )}
            <Typography variant="h6" align="right">
              {formatCurrency(usdBalance, currency, lang)}
            </Typography>
          </Box>
        </Box>
      </Card>
    </>
  )
}

export default AccountStatCard
