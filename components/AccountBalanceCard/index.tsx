import {
  Avatar,
  Box,
  Card,
  Divider,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  useTheme,
  Button,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import get from 'lodash/get'
import { PieChart, Pie, Cell } from 'recharts'
import ArrowNextIcon from '../../assets/images/icons/icon_arrow_next.svg'
import useStyles from './styles'
import { CustomTheme } from '../../misc/theme'
import { formatCrypto, formatCurrency } from '../../misc/utils'
import { useGeneralContext } from '../../contexts/GeneralContext'
import cryptocurrencies from '../../misc/cryptocurrencies'
import useIconProps from '../../misc/useIconProps'

interface AccountBalanceCardProps {
  account: Account
  accountBalance: AccountBalance
  validators: Validator[]
  onVestingClick: () => void
  hideVestingButton?: boolean
}

const AccountBalanceCard: React.FC<AccountBalanceCardProps> = ({
  accountBalance,
  account,
  validators,
  onVestingClick,
  hideVestingButton,
}) => {
  const classes = useStyles()
  const { t, lang } = useTranslation('common')
  const theme: CustomTheme = useTheme()
  const { currency } = useGeneralContext()
  const isValidator = validators.some((v) => v.address === account.address)
  const data = isValidator
    ? Object.keys(accountBalance.balance).map((k, i) => ({
        name: t(k),
        value: get(accountBalance, `balance.${k}.${account.crypto}.amount`, 0),
        color: theme.palette.pieChart2[i % theme.palette.pieChart2.length],
      }))
    : Object.keys(accountBalance.balance)
        .filter((v) => v !== 'commissions')
        .map((k, i) => ({
          name: t(k),
          value: get(accountBalance, `balance.${k}.${account.crypto}.amount`, 0),
          color: theme.palette.pieChart2[i % theme.palette.pieChart2.length],
        }))
  const iconProps = useIconProps()
  const usdPrice = get(accountBalance, `balance.available.${account.crypto}.price`, 0)
  const totalBalance = data.map((d) => d.value).reduce((a, b) => a + b, 0)

  // Other Token
  const otherTokens = React.useMemo(() => {
    const balances = {}
    const rewards = {}
    const commissions = {}
    Object.keys(accountBalance.balance).forEach((k) => {
      Object.keys(accountBalance.balance[k]).forEach((tk) => {
        // Skip native token
        if (tk === account.crypto) {
          return
        }
        const amount = get(accountBalance, `balance.${k}.${tk}.amount`, 0)
        const price = get(accountBalance, `balance.${k}.${tk}.price`, 0)
        balances[tk] = {
          amount: get(balances, `${tk}.amount`, 0) + amount,
          price,
        }
        if (k === 'rewards') {
          rewards[tk] = {
            amount: get(rewards, `${tk}.amount`, 0) + amount,
            price,
          }
        }
        if (k === 'commissions') {
          commissions[tk] = {
            amount: get(commissions, `${tk}.amount`, 0) + amount,
            price,
          }
        }
      })
    })
    return { balances, rewards, commissions }
  }, [accountBalance, account])

  return (
    <>
      <Card className={classes.container}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">{t('balance')}</Typography>
          {hideVestingButton ? null : (
            <Button onClick={onVestingClick} endIcon={<ArrowNextIcon {...iconProps} />}>
              {t('vesting')}
            </Button>
          )}
        </Box>
        <Box display="flex" my={2} alignItems="center">
          <PieChart height={theme.spacing(20)} width={theme.spacing(20)}>
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
          <Box flex={1} ml={10}>
            {data.map((d) => (
              <Box key={d.name} display="flex" alignItems="center" justifyContent="space-between">
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
      {Object.keys(otherTokens.balances).length > 0 ? (
        <Card className={classes.container}>
          <Typography variant="h4">{t('other token balance')}</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('index')}</TableCell>
                <TableCell>{t('token')}</TableCell>
                <TableCell align="right">{t('rewards')}</TableCell>
                <TableCell align="right">{t('commissions')}</TableCell>
                <TableCell align="right">{t('balance')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(otherTokens.balances).map((token, index) => (
                <TableRow key={token} className={classes.tableRow}>
                  <TableCell># {index + 1}</TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Avatar
                        className={classes.avatar}
                        src={String(get(cryptocurrencies, `${token}.image`, ''))}
                      />
                      <Typography>{token}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    {otherTokens.rewards[token]
                      ? formatCrypto(otherTokens.rewards[token].amount, token, lang)
                      : ''}
                  </TableCell>
                  <TableCell align="right">
                    {otherTokens.commissions[token]
                      ? formatCrypto(otherTokens.commissions[token].amount, token, lang)
                      : ''}
                  </TableCell>
                  <TableCell align="right">
                    {formatCrypto(otherTokens.balances[token].amount, token, lang)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      ) : null}
    </>
  )
}

export default AccountBalanceCard
