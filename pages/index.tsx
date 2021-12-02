import { Box, Grid, Typography } from '@material-ui/core'
import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import Layout from '../components/Layout'
import WalletBalanceChart from '../components/WalletBalanceChart'
import AccountStatCard from '../components/AccountStatCard'
import { useWalletsContext } from '../contexts/WalletsContext'
import AssetDistributionChart from '../components/AssetDistributionChart'
import Banner from '../components/Banner/index'

const Home: React.FC = () => {
  const { t } = useTranslation('common')
  const { accounts } = useWalletsContext()

  const [airdropEnabled, setAirdropEnabled] = React.useState(false)

  React.useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_DSM_AIRDROP_API_URL}/config`)
      .then((r) => r.json())
      .then((data) => setAirdropEnabled(data.airdrop_enabled))
  }, [])

  return (
    <Layout passwordRequired activeItem="/">
      {airdropEnabled ? <Banner /> : null}
      <Grid container spacing={3}>
        <Grid item md={6} sm={12} xs={12}>
          <WalletBalanceChart />
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
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
