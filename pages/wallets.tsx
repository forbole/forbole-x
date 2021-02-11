import { Box, Grid, Typography } from '@material-ui/core'
import React from 'react'
import groupBy from 'lodash/groupBy'
import useTranslation from 'next-translate/useTranslation'
import Layout from '../components/Layout'
import AccountCard from '../components/AccountCard'
import { useWalletsContext } from '../contexts/WalletsContext'
import WalletMenuButton from '../components/WalletMenuButton'

const Wallets: React.FC = () => {
  const { t } = useTranslation('common')
  const { wallets, accounts } = useWalletsContext()
  const accountsMap = React.useMemo(() => groupBy(accounts, 'walletId'), [accounts])

  return (
    <Layout passwordRequired activeItem="/wallets">
      <Typography gutterBottom variant="h1">
        {t('wallet manage')}
      </Typography>
      {wallets.map((w) => (
        <Box key={w.id} mt={2}>
          <Box display="flex" alignItems="center" mb={1}>
            <Typography variant="h4">{w.name}</Typography>
            <WalletMenuButton />
          </Box>
          <Grid container spacing={3}>
            {(accountsMap[w.id] || []).map((a) => (
              <Grid key={a.address} item xl={4} lg={6}>
                <AccountCard account={a} />
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Layout>
  )
}

export default Wallets
