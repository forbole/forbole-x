import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import Layout from '../components/Layout'
import WalletBalanceChart from '../components/WalletBalanceChart'
import AssetDistributionChart from '../components/AssetDistributionChart'

export default function Home() {
  return (
    <Layout passwordRequired activeItem="/">
      <Grid container spacing={3}>
        <Grid item md={7}>
          <WalletBalanceChart />
        </Grid>
        <Grid item md={5}>
          <AssetDistributionChart />
        </Grid>
      </Grid>
    </Layout>
  )
}
