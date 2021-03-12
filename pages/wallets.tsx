import { Box, Button, Grid, Typography } from '@material-ui/core'
import React from 'react'
import groupBy from 'lodash/groupBy'
import useTranslation from 'next-translate/useTranslation'
import Layout from '../components/Layout'
import AccountCard from '../components/AccountCard'
import { useWalletsContext } from '../contexts/WalletsContext'
import WalletMenuButton from '../components/WalletMenuButton'
import CreateWalletDialog from '../components/CreateWalletDialog'

const Wallets: React.FC = () => {
  const { t } = useTranslation('common')
  const { wallets, accounts } = useWalletsContext()
  const accountsMap = React.useMemo(() => groupBy(accounts, 'walletId'), [accounts])
  const [isCreateWalletDialogOpen, setIsCreateWalletDialogOpen] = React.useState(false)

  return (
    <Layout passwordRequired activeItem="/wallets">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography gutterBottom variant="h1">
          {t('wallet manage')}
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setIsCreateWalletDialogOpen(true)}
        >
          {t('add wallet')}
        </Button>
      </Box>
      {wallets.map((w) => (
        <Box key={w.id} mt={2}>
          <Box display="flex" alignItems="center" mb={1}>
            <Typography variant="h4">{w.name}</Typography>
            <WalletMenuButton walletId={w.id} />
          </Box>
          <Grid container spacing={3}>
            {(accountsMap[w.id] || []).map((a) => (
              <Grid key={a.address} item xl={4} lg={6} xs={12}>
                <AccountCard account={a} />
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
      <CreateWalletDialog
        open={isCreateWalletDialogOpen}
        onClose={() => setIsCreateWalletDialogOpen(false)}
      />
    </Layout>
  )
}

export default Wallets