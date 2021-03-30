import { Box, Grid, Typography } from '@material-ui/core'
import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import { addDays } from 'date-fns'
import Layout from '../components/Layout'
import WalletBalanceChart from '../components/WalletBalanceChart'
import AssetDistributionChart from '../components/AssetDistributionChart'
import AccountStatCard from '../components/AccountStatCard'
import useAccountBalancesWithinPeriod from '../graphql/hooks/useAccountBalancesWithinPeriod'

const now = new Date()

const Home: React.FC = () => {
  const { t } = useTranslation('common')
  const { accounts, wallets } = useAccountBalancesWithinPeriod(addDays(now, -7), now)

  return (
    <Layout passwordRequired activeItem="/">
      <Grid container spacing={3}>
        <Grid item md={6}>
          <WalletBalanceChart walletsWithBalance={wallets} />
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
