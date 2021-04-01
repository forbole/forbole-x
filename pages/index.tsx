import { Box, Grid, Typography } from '@material-ui/core'
import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import Layout from '../components/Layout'
import WalletBalanceChart from '../components/WalletBalanceChart'
import AssetDistributionChart from '../components/AssetDistributionChart'
import AccountStatCard from '../components/AccountStatCard'
import fetchAccountsBalancesWithinPeriod from '../graphql/fetch/fetchAccountsBalancesWithinPeriod'
import { useWalletsContext } from '../contexts/WalletsContext'
import { getWalletsBalancesFromAccountsBalances } from '../misc/utils'
import { dateRanges } from '../components/BalanceChart'

// const accounts = [
//   { address: 'desmos1s9z0nzuu23fvac8u0j4tgvhgyg83ulc4qxs6z6', crypto: 'DSM', walletId: '123' },
//   { address: 'desmos1dzn2s7l0wm9kekyazcnhapu8j95n90efmcmrad', crypto: 'DSM', walletId: '123' },
// ]
// const wallets = [{ id: '123' }]

const Home: React.FC = () => {
  const { t } = useTranslation('common')
  const { accounts, wallets } = useWalletsContext()

  const [accountsWithDailyBalance, setAccountsWithDailyBalance] = React.useState<
    AccountWithBalance[]
  >([])
  const [walletsWithBalance, setWalletsWithBalance] = React.useState<WalletWithBalance[]>([])
  const [timestamps, setTimestamps] = React.useState<Date[]>(
    dateRanges.find((d) => d.isDefault).timestamps.map((timestamp) => new Date(timestamp))
  )

  const getAccountsWithDailtBalances = React.useCallback(async () => {
    try {
      const dailyBalancesResult = await fetchAccountsBalancesWithinPeriod(
        accounts,
        dateRanges.find((d) => d.title === 'day').timestamps.map((timestamp) => new Date(timestamp))
      )
      setAccountsWithDailyBalance(dailyBalancesResult)
    } catch (err) {
      console.log(err)
    }
  }, [accounts])

  const getWalletsWithBalance = React.useCallback(async () => {
    try {
      const chartResult = await fetchAccountsBalancesWithinPeriod(accounts, timestamps)
      setWalletsWithBalance(getWalletsBalancesFromAccountsBalances(wallets, chartResult))
    } catch (err) {
      console.log(err)
    }
  }, [accounts, wallets, timestamps])

  React.useEffect(() => {
    getWalletsWithBalance()
  }, [getWalletsWithBalance])

  React.useEffect(() => {
    getAccountsWithDailtBalances()
  }, [getAccountsWithDailtBalances])

  return (
    <Layout passwordRequired activeItem="/">
      <Grid container spacing={3}>
        <Grid item md={6}>
          <WalletBalanceChart
            walletsWithBalance={walletsWithBalance}
            onTimestampsChange={setTimestamps}
          />
        </Grid>
        <Grid item md={6}>
          <AssetDistributionChart />
        </Grid>
      </Grid>
      <Box mt={2}>
        <Typography gutterBottom variant="h4">
          {t('accounts')}
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {accountsWithDailyBalance.map((account) => (
          <Grid key={account.address} item lg={4} md={6} xs={12}>
            <AccountStatCard account={account} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  )
}

export default Home
