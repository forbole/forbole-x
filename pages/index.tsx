import { Box, Grid, Typography } from '@material-ui/core'
import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import { addDays } from 'date-fns'
import Layout from '../components/Layout'
import WalletBalanceChart from '../components/WalletBalanceChart'
import AssetDistributionChart from '../components/AssetDistributionChart'
import AccountStatCard from '../components/AccountStatCard'
import { useWalletsContext } from '../contexts/WalletsContext'
import useAccountBalancesWithinPeriod from '../graphql/hooks/useAccountBalancesWithinPeriod'

const now = new Date()

const Home: React.FC = () => {
  const { t } = useTranslation('common')
  const { accounts } = useWalletsContext()
  const result = useAccountBalancesWithinPeriod(
    'DSM',
    [
      'desmos1s9z0nzuu23fvac8u0j4tgvhgyg83ulc4qxs6z6',
      'desmos1dzn2s7l0wm9kekyazcnhapu8j95n90efmcmrad',
    ],
    addDays(now, -7),
    now
  )
  console.log(result)
  return (
    <Layout passwordRequired activeItem="/">
      <Grid container spacing={3}>
        <Grid item md={6}>
          <WalletBalanceChart />
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
        {accounts.map((account) => (
          <Grid key={account.address} item lg={4} md={6} xs={12}>
            <AccountStatCard account={account} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  )
}

export default Home
