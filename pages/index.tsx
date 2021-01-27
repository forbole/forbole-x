import { Box, Grid, Typography } from '@material-ui/core'
import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import Layout from '../components/Layout'
import WalletBalanceChart from '../components/WalletBalanceChart'
import AssetDistributionChart from '../components/AssetDistributionChart'
import AccountCard from '../components/AccountCard'

export default function Home() {
  const { t } = useTranslation('common')
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
        <Grid item lg={4} md={6}>
          <AccountCard />
        </Grid>
        <Grid item lg={4} md={6}>
          <AccountCard />
        </Grid>
        <Grid item lg={4} md={6}>
          <AccountCard />
        </Grid>
      </Grid>
    </Layout>
  )
}
