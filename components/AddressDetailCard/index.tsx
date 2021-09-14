import { Box, Card, Grid, Button } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import get from 'lodash/get'
import { useRouter } from 'next/router'
import AccountAvatar from '../AccountAvatar'
import { useGeneralContext } from '../../contexts/GeneralContext'
import BalanceChart, { dateRanges } from '../BalanceChart'
import useStyles from './styles'
import { useWalletsContext } from '../../contexts/WalletsContext'
import StatBox from './StatBox'
import {
  formatCurrency,
  formatTokenAmount,
  getTokenAmountBalance,
  getTotalBalance,
  getTotalTokenAmount,
} from '../../misc/utils'
import useAccountsBalancesWithinPeriod from '../../graphql/hooks/useAccountsBalancesWithinPeriod'
import useIsMobile from '../../misc/useIsMobile'
import AddressSendDialog from '../AddressSendDialog'

export type FavAddress = {
  address: string
  crypto: string
  moniker: string
  note?: string
  img?: string
}

interface AddressDetailCardProps {
  address: FavAddress
  validators: Validator[]
  accountBalance: AccountBalance
  availableTokens: any
}

const AddressDetailCard: React.FC<AddressDetailCardProps> = ({ address, accountBalance }) => {
  const { lang, t } = useTranslation('common')
  const { currency } = useGeneralContext()
  const classes = useStyles()
  const isMobile = useIsMobile()

  const router = useRouter()
  const { accounts } = useWalletsContext()
  const account = accounts.find((a) => a.address === router.query.address)
  accounts.filter((a) => a.crypto === address.crypto)
  const [timestamps, setTimestamps] = React.useState<Date[]>(
    dateRanges.find((d) => d.isDefault).timestamps.map((timestamp) => new Date(timestamp))
  )
  const [sendDialogOpen, setSendDialogOpen] = React.useState(false)
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
            <AccountAvatar size="large" address={address} />
            <Box display="flex" mt={isMobile ? 2 : 0} ml={isMobile ? -2 : 0}>
              <Button
                classes={{ root: classes.sendButton }}
                variant="contained"
                onClick={() => setSendDialogOpen(true)}
              >
                {t('send')}
              </Button>
            </Box>
          </Box>
          <BalanceChart
            data={chartData}
            hideChart={isMobile}
            onDateRangeChange={(dateRange) => {
              setTimestamps(dateRange.timestamps.map((ts) => new Date(ts)))
            }}
            title={formatTokenAmount(totalTokenAmount, address.crypto, lang)}
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
                    address.crypto,
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
      <AddressSendDialog
        open={sendDialogOpen}
        onClose={() => setSendDialogOpen(false)}
        address={address}
      />
    </>
  )
}

export default AddressDetailCard
