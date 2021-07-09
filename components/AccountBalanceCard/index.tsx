import { Box, Card, Divider, Typography, useTheme } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import get from 'lodash/get'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import useStyles from './styles'
import { CustomTheme } from '../../misc/theme'
import { formatCrypto, formatCurrency } from '../../misc/utils'
import { useGeneralContext } from '../../contexts/GeneralContext'

interface AccountBalanceCardProps {
  account: Account
  accountBalance: AccountBalance
}

const AccountBalanceCard: React.FC<AccountBalanceCardProps> = ({ accountBalance, account }) => {
  const classes = useStyles()
  const { t, lang } = useTranslation('common')
  const theme: CustomTheme = useTheme()
  const { currency } = useGeneralContext()
  const data = Object.keys(accountBalance.balance).map((k, i) => ({
    name: t(k),
    value: get(accountBalance, `balance.${k}.${account.crypto}.amount`, 0),
    color: theme.palette.pieChart[i % theme.palette.pieChart.length],
  }))
  const usdPrice = get(accountBalance, `balance.available.${account.crypto}.price`, 0)
  const totalBalance = data.map((d) => d.value).reduce((a, b) => a + b, 0)

  return (
    <Card className={classes.container}>
      <Typography variant="h4">{t('balance')}</Typography>
      <Box display="flex" my={2} alignItems="center">
        <ResponsiveContainer height={theme.spacing(20)} width={theme.spacing(20)}>
          <PieChart>
            <Pie
              data={data.filter((d) => !!d.value)}
              innerRadius={theme.spacing(8.5)}
              outerRadius={theme.spacing(8.5)}
              paddingAngle={12}
              dataKey="value"
            >
              {data
                .filter((d) => !!d.value)
                .map((d) => (
                  <Cell
                    key={d.name}
                    strokeLinejoin="round"
                    strokeWidth={theme.spacing(1.5)}
                    stroke={d.color}
                  />
                ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <Box flex={1} ml={10}>
          {data.map((d) => (
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box display="flex" alignItems="center" mb={0.5}>
                <Box
                  bgcolor={d.color}
                  width={theme.spacing(1.75)}
                  height={theme.spacing(1.75)}
                  borderRadius={theme.spacing(0.5)}
                  mr={1}
                />
                <Typography>{d.name}</Typography>
              </Box>
              <Typography>{formatCrypto(d.value, account.crypto, lang)}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Divider />
      <Box mt={2} display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h4">{t('total balance')}</Typography>
          <Typography>
            {formatCurrency(usdPrice, currency, lang, true)} / {account.crypto}
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="flex-end">
          <Typography variant="h1">{formatCrypto(totalBalance, account.crypto, lang)}</Typography>
          <Typography>{formatCurrency(usdPrice * totalBalance, currency, lang)}</Typography>
        </Box>
      </Box>
    </Card>
  )
}

export default AccountBalanceCard
