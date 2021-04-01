import { Box, Grid, Typography } from '@material-ui/core'
import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import { addDays } from 'date-fns'
import { useQuery } from '@apollo/client'
import Layout from '../components/Layout'
import WalletBalanceChart from '../components/WalletBalanceChart'
import AssetDistributionChart from '../components/AssetDistributionChart'
import AccountStatCard from '../components/AccountStatCard'
// import useAccountBalancesWithinPeriod from '../graphql/hooks/useAccountBalancesWithinPeriod'
import fetchAccountsBalancesWithinPeriod from '../graphql/fetch/fetchAccountsBalancesWithinPeriod'

const now = new Date()

const Home: React.FC = () => {
  const { t } = useTranslation('common')
  // const { accounts, wallets } = useAccountBalancesWithinPeriod(addDays(now, -7), now)
  // const result = useQuery(getAvailableBalance('DSM'), {
  //   variables: {
  //     address: 'desmos1dzn2s7l0wm9kekyazcnhapu8j95n90efmcmrad',
  //     timestamp: addDays(now, -10),
  //   },
  // })

  // console.log(result)
  React.useEffect(() => {
    fetchAccountsBalancesWithinPeriod(
      [
        {
          address: 'desmos1s9z0nzuu23fvac8u0j4tgvhgyg83ulc4qxs6z6',
          crypto: 'DSM',
          walletId: '123',
        },
        {
          address: 'desmos1dzn2s7l0wm9kekyazcnhapu8j95n90efmcmrad',
          crypto: 'DSM',
          walletId: '123',
        },
      ],
      [
        addDays(now, -6),
        addDays(now, -5),
        addDays(now, -4),
        addDays(now, -3),
        addDays(now, -2),
        addDays(now, -1),
        now,
      ]
    ).then((r) => console.log(r))
  })

  return (
    <Layout passwordRequired activeItem="/">
      {/* <Grid container spacing={3}>
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
      </Grid> */}
    </Layout>
  )
}

export default Home
