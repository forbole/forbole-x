import { Box, Grid, Typography } from '@material-ui/core'
import React from 'react'
import Layout from '../components/Layout'
import WalletBalanceChart from '../components/WalletBalanceChart'
import AssetDistributionChart from '../components/AssetDistributionChart'
import useTranslation from 'next-translate/useTranslation'

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
    </Layout>
  )
}
