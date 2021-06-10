import { Box, Button, Card, Grid, useTheme } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import get from 'lodash/get'
import StarIcon from '../../assets/images/icons/icon_star.svg'
import EditIcon from '../../assets/images/icons/icon_edit_tool.svg'
import StarFilledIcon from '../../assets/images/icons/icon_star_marked.svg'
import AccountAvatar from '../AccountAvatar'
import { useGeneralContext } from '../../contexts/GeneralContext'
import BalanceChart, { dateRanges } from '../BalanceChart'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'
import { useWalletsContext } from '../../contexts/WalletsContext'
import StatBox from './StatBox'
import DelegationDialog from '../DelegationDialog'
import ClaimRewardsDialog from '../ClaimRewardsDialog'
import {
  formatCurrency,
  formatTokenAmount,
  getTokenAmountBalance,
  getTotalBalance,
  getTotalTokenAmount,
} from '../../misc/utils'
import useAccountsBalancesWithinPeriod from '../../graphql/hooks/useAccountsBalancesWithinPeriod'
import SendDialog from '../SendDialog'
import useIsMobile from '../../misc/useIsMobile'
import EditAccountDialog from '../EditAccountDialog'

interface AccountDetailCardProps {
  account: Account
  validators: Validator[]
  accountBalance: AccountBalance
  availableTokens: any
}

const AccountDetailCard: React.FC<AccountDetailCardProps> = ({
  account,
  accountBalance,
  availableTokens,
  validators,
}) => {
  const { lang, t } = useTranslation('common')
  const { currency } = useGeneralContext()
  const classes = useStyles()
  const iconProps = useIconProps()
  const theme = useTheme()
  const isMobile = useIsMobile()
  const { updateAccount } = useWalletsContext()
  const [delegateDialogOpen, setDelegateDialogOpen] = React.useState(false)
  const [claimRewardsDialogOpen, setClaimRewardsDialogOpen] = React.useState(false)
  const [sendDialogOpen, setSendDialogOpen] = React.useState(false)
  const [editAccountDialogOpen, setEditAccountDialogOpen] = React.useState(false)
  const [timestamps, setTimestamps] = React.useState<Date[]>(
    dateRanges.find((d) => d.isDefault).timestamps.map((timestamp) => new Date(timestamp))
  )
  // Chart Data
  const { data: accountsWithBalance, loading } = useAccountsBalancesWithinPeriod(
    [account],
    timestamps
  )
  const chartData = accountsWithBalance.length
    ? accountsWithBalance[0].balances.map((b) => getTotalBalance(b))
    : []
  // Balance Data
  const { totalTokenAmount, usdBalance } = React.useMemo(() => {
    return {
      totalTokenAmount: getTotalTokenAmount(accountBalance).amount,
      usdBalance: getTotalBalance(accountBalance).balance,
    }
  }, [accountBalance])

  const toggleFav = React.useCallback(() => {
    updateAccount(account.address, { fav: !account.fav })
  }, [account.address, account.fav, updateAccount])

  const displayItems =
    getTokenAmountBalance(get(accountBalance, 'balance.commissions', {})) === 0
      ? ['available', 'delegated', 'unbonding', 'rewards']
      : ['available', 'delegated', 'unbonding', 'rewards', 'commissions']
  return (
    <>
      <Card className={classes.container}>
        <Box p={4} position="relative">
          <Box
            mb={4}
            display={isMobile ? 'block' : 'flex'}
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <AccountAvatar size="large" account={account} />
            <Box display="flex" mt={isMobile ? 2 : 0} ml={isMobile ? -2 : 0}>
              <Button
                classes={{ root: classes.fixedWidthButton }}
                variant="contained"
                color="primary"
                onClick={() => setDelegateDialogOpen(true)}
              >
                {t('delegate')}
              </Button>
              <Button
                classes={{ root: classes.fixedWidthButton }}
                variant="contained"
                color="secondary"
                onClick={() => setClaimRewardsDialogOpen(true)}
              >
                {t('claim rewards')}
              </Button>
              <Button
                classes={{ root: classes.sendButton }}
                variant="contained"
                onClick={() => setSendDialogOpen(true)}
              >
                {t('send')}
              </Button>
              <Box
                display="flex"
                position={isMobile ? 'absolute' : 'static'}
                top={theme.spacing(2)}
                right={theme.spacing(2)}
              >
                <Button
                  classes={{ root: classes.iconButton }}
                  variant={isMobile ? 'text' : 'outlined'}
                  onClick={toggleFav}
                >
                  {account.fav ? (
                    <StarFilledIcon {...iconProps} fill={theme.palette.warning.light} />
                  ) : (
                    <StarIcon {...iconProps} />
                  )}
                </Button>
                <Button
                  classes={{ root: classes.iconButton }}
                  variant={isMobile ? 'text' : 'outlined'}
                  onClick={() => setEditAccountDialogOpen(true)}
                >
                  <EditIcon {...iconProps} />
                </Button>
              </Box>
            </Box>
          </Box>
          <BalanceChart
            data={chartData}
            hideChart={isMobile}
            onDateRangeChange={(dateRange) => {
              setTimestamps(dateRange.timestamps.map((ts) => new Date(ts)))
            }}
            title={formatTokenAmount(totalTokenAmount, account.crypto, lang)}
            subtitle={formatCurrency(usdBalance, currency, lang)}
            loading={loading}
          />
          <Box mt={isMobile ? 6 : 10}>
            <Grid container spacing={4}>
              {displayItems.map((key) => (
                <StatBox
                  key={key}
                  title={t(key)}
                  value={formatTokenAmount(
                    get(accountBalance, `balance.${key}`, {}),
                    account.crypto,
                    lang
                  )}
                  subtitle={formatCurrency(
                    getTokenAmountBalance(get(accountBalance, `balance.${key}`, {})),
                    currency,
                    lang
                  )}
                />
              ))}
            </Grid>
          </Box>
        </Box>
      </Card>
      <DelegationDialog
        open={delegateDialogOpen}
        onClose={() => setDelegateDialogOpen(false)}
        account={account}
        availableTokens={availableTokens}
        validators={validators.filter(({ status }) => status === 'active')}
      />
      <ClaimRewardsDialog
        open={claimRewardsDialogOpen}
        onClose={() => setClaimRewardsDialogOpen(false)}
        account={account}
        tokensPrices={availableTokens.tokens_prices}
        validators={validators.filter((v) => !!v.delegated)}
      />
      <SendDialog
        open={sendDialogOpen}
        onClose={() => setSendDialogOpen(false)}
        account={account}
        availableTokens={availableTokens}
      />
      <EditAccountDialog
        open={editAccountDialogOpen}
        onClose={() => setEditAccountDialogOpen(false)}
        account={account}
        availableTokens={availableTokens}
      />
    </>
  )
}

export default AccountDetailCard
