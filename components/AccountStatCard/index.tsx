import {
  Box,
  Card,
  Typography,
  useTheme,
  CircularProgress,
  IconButton,
  Button,
} from '@material-ui/core'
import React from 'react'
import { LineChart, Line, YAxis } from 'recharts'
import UpIcon from '@material-ui/icons/ArrowDropUp'
import DownIcon from '@material-ui/icons/ArrowDropDown'
import useTranslation from 'next-translate/useTranslation'
import get from 'lodash/get'
import { useRouter } from 'next/router'
import { gql, useSubscription } from '@apollo/client'
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
  transformGqlAcountBalance,
  transformValidatorsWithTokenAmount,
} from '../../misc/utils'
import useAccountsBalancesWithinPeriod from '../../graphql/hooks/useAccountsBalancesWithinPeriod'
import { dateRanges } from '../BalanceChart'
import AccountAvatar from '../AccountAvatar'
import StarIcon from '../../assets/images/icons/icon_star.svg'
import StarFilledIcon from '../../assets/images/icons/icon_star_marked.svg'
import { useWalletsContext } from '../../contexts/WalletsContext'
import useIconProps from '../../misc/useIconProps'
import DelegationDialog from '../DelegationDialog'
import { getValidators } from '../../graphql/queries/validators'
import { getLatestAccountBalance } from '../../graphql/queries/accountBalances'

const dailyTimestamps = dateRanges
  .find((d) => d.title === 'day')
  .timestamps.map((timestamp) => new Date(timestamp))

interface AccountStatCardProps {
  account: Account
}

const AccountStatCard: React.FC<AccountStatCardProps> = ({ account }) => {
  const crypto = cryptocurrencies[account.crypto]
  const iconProps = useIconProps()
  const classes = useStyles()
  const theme = useTheme()
  const { t, lang } = useTranslation('common')
  const { currency } = useGeneralContext()
  const { updateAccount } = useWalletsContext()
  const router = useRouter()
  // Historic data
  const {
    data: [accountWithBalance],
    loading,
  } = useAccountsBalancesWithinPeriod([account], dailyTimestamps)
  const [delegateDialogOpen, setDelegateDialogOpen] = React.useState(false)
  const data = createEmptyChartData(
    (get(accountWithBalance, 'balances', []) as AccountBalance[]).map((b) => getTotalBalance(b)),
    0,
    1
  )
  // Latest data
  const { data: latestData } = useSubscription(
    gql`
      ${getLatestAccountBalance(account.crypto)}
    `,
    { variables: { address: account.address } }
  )
  const { data: validatorsData } = useSubscription(
    gql`
      ${getValidators(crypto.name)}
    `
  )

  const { tokenAmounts, usdBalance, availableTokens, validators } = React.useMemo(() => {
    const accountBalance = transformGqlAcountBalance(latestData, Date.now())
    return {
      tokenAmounts: getTotalTokenAmount(accountBalance).amount,
      usdBalance: getTotalBalance(accountBalance).balance,
      validators: transformValidatorsWithTokenAmount(validatorsData, accountBalance),
      availableTokens: get(accountBalance, 'availableTokens', {
        coins: [],
        tokens_prices: [],
      }),
    }
  }, [data])

  const firstBalance = get(data, '[0].balance', 0)
  const diff = Math.abs(usdBalance - firstBalance)
  const percentageChange = Math.round((100 * diff) / firstBalance) / 100 || 0
  const increasing = usdBalance - firstBalance > 0

  const toggleFav = React.useCallback(() => {
    updateAccount(account.address, { fav: !account.fav })
  }, [account.address, account.fav, updateAccount])

  return (
    <>
      <Card
        className={classes.container}
        onClick={(e) => {
          if (
            String((e.target as any).className).includes('MuiButton-label') === false &&
            String((e.target as any).id) !== 'button' &&
            String((e.target as any).id) !== 'icon_star_marked_svg__Path_2_'
          ) {
            router.push(`/account/${account.address}`)
          }
        }}
      >
        <Box mb={3} display="flex" alignItems="center" justifyContent="space-between">
          <AccountAvatar account={account} hideAddress />
          <Button
            id="button"
            variant="outlined"
            className={classes.timeRangeButton}
            onClick={() => setDelegateDialogOpen(true)}
          >
            {t('delegate')}
          </Button>
        </Box>
        <Box>
          {Object.keys(tokenAmounts).length ? (
            Object.keys(tokenAmounts).map((ta) => (
              <Typography key={ta} variant="h4">
                {formatCrypto(tokenAmounts[ta].amount, ta, lang)}
              </Typography>
            ))
          ) : (
            <Typography variant="h4">{formatCrypto(0, crypto.name, lang)}</Typography>
          )}
          <Typography variant="h6">{formatCurrency(usdBalance, currency, lang)}</Typography>
          <Box>
            <Box>
              {loading ? (
                <Box
                  height={theme.spacing(8)}
                  mt={-3}
                  mx={8}
                  display="flex"
                  justifyContent="center"
                >
                  <CircularProgress />
                </Box>
              ) : (
                <LineChart height={theme.spacing(8)} data={data} width={theme.spacing(30)}>
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
              <Box />
              <Box display="flex" flex={1}>
                <Box display="flex" mt={1} alignItems="center">
                  {increasing ? (
                    <UpIcon htmlColor={theme.palette.success.main} />
                  ) : (
                    <DownIcon htmlColor={theme.palette.error.main} />
                  )}
                  <Box mr={2}>
                    <Typography color="textSecondary" variant="caption">
                      {formatPercentage(percentageChange, lang)} {t('24h')}
                    </Typography>
                  </Box>
                  <Typography variant="caption">{formatCurrency(diff, currency, lang)}</Typography>
                </Box>
                <Box display="flex" flex={1} flexDirection="column" alignItems="flex-end">
                  <IconButton onClick={toggleFav} id="button">
                    {account.fav ? (
                      <StarFilledIcon {...iconProps} fill={theme.palette.warning.light} />
                    ) : (
                      <StarIcon id="button" {...iconProps} />
                    )}
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Card>
      <DelegationDialog
        open={delegateDialogOpen}
        onClose={() => setDelegateDialogOpen(false)}
        account={account}
        availableTokens={availableTokens}
        validators={validators}
      />
    </>
  )
}

export default AccountStatCard
