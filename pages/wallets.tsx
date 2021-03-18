import { Box, Grid, Typography } from '@material-ui/core'
import React from 'react'
import groupBy from 'lodash/groupBy'
import useTranslation from 'next-translate/useTranslation'
import Layout from '../components/Layout'
import AccountCard from '../components/AccountCard'
import { useWalletsContext } from '../contexts/WalletsContext'
import WalletMenuButton from '../components/WalletMenuButton'
import { useAccountInfo } from './hooks'

const Wallets: React.FC = () => {
  const { t } = useTranslation('common')
  const { wallets, accounts } = useWalletsContext()
  const accountsMap = React.useMemo(() => groupBy(accounts, 'walletId'), [accounts])

  const { accountBalance } = useAccountInfo()

  return (
    <Layout passwordRequired activeItem="/wallets">
      <Typography gutterBottom variant="h1">
        {t('wallet manage')}
      </Typography>
      {wallets.map((w) => (
        <Box key={w.id} mt={2}>
          <Box display="flex" alignItems="center" mb={1}>
            <Typography variant="h4">{w.name}</Typography>
            <WalletMenuButton walletId={w.id} />
          </Box>
          <Grid container spacing={3}>
            {(accountBalance || []).map((a) => (
              <Grid key={a.address} item xl={4} lg={6} xs={12}>
                <AccountCard accountInfo={a} />
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Layout>
  )
}

export default Wallets
