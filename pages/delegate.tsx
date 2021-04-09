import { Box, Button, Grid, Typography } from '@material-ui/core'
import React from 'react'
import times from 'lodash/times'
import groupBy from 'lodash/groupBy'
import useTranslation from 'next-translate/useTranslation'
import Layout from '../components/Layout'
import AccountCard from '../components/AccountCard'
import { useWalletsContext } from '../contexts/WalletsContext'
import { useSettingsContext } from '../contexts/GeneralContext'
import WalletMenuButton from '../components/WalletMenuButton'
import CreateWalletDialog from '../components/CreateWalletDialog'
import DelegateValidatorsTable from '../components/DelegateValidatorsTable'
import cryptocurrencies from '../misc/cryptocurrencies'

const Delegate: React.FC = () => {
  const { t } = useTranslation('common')
  const { wallets, accounts } = useWalletsContext()
  const accountsMap = React.useMemo(() => groupBy(accounts, 'walletId'), [accounts])
  const [isCreateWalletDialogOpen, setIsCreateWalletDialogOpen] = React.useState(false)

  return (
    <Layout passwordRequired activeItem="/delegate">
      <DelegateValidatorsTable
        account={{
          walletId: '',
          address: '',
          crypto: '',
          index: 0,
          name: '',
          fav: false,
          createdAt: 2890,
          displayName: '',
          id: '',
          rpDisplayName: '',
        }}
        validators={
          [
            {
              image:
                'https://cdn.arstechnica.net/wp-content/uploads/2016/02/5718897981_10faa45ac3_b-640x624.jpg',
              name: 'Forbole1',
              location: {
                name: 'Country/Area',
                image:
                  'https://www.flaticon.com/svg/vstatic/svg/206/206626.svg?token=exp=1617955509~hmac=d580f91959bc63fbeddb9601072151b8',
              },
              commission: 0.015,
              vpRatios: 0.05,
              delegatedAmount: 11887597,
              amtRatio: 0.05,
              reward: 122321,
              selfRatio: 0.1,
              status: 'unjail',
              isActive: false,
              address: 'desmos1s9z0nzuu23fvac8u0j4tgvhgyg83ulc4qxs6z2',
            },
            {
              image:
                'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg',
              name: 'Forbole2',
              location: {
                name: 'Country/Area',
                image:
                  'https://www.flaticon.com/svg/vstatic/svg/206/206626.svg?token=exp=1617955509~hmac=d580f91959bc63fbeddb9601072151b8',
              },
              commission: 0.015,
              vpRatios: 0.05,
              delegatedAmount: 11887597,
              amtRatio: 0.05,
              reward: 122321,
              selfRatio: 0.2,
              status: 'tombstone',
              isActive: false,
              address: 'desmos1s9z0nzuu23fvac8u0j4tgvhgyg83ulc4qxs6z5',
            },
            {
              image:
                'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
              name: 'Forbole3',
              location: {
                name: 'Country/Area',
                image:
                  'https://www.flaticon.com/svg/vstatic/svg/206/206626.svg?token=exp=1617955509~hmac=d580f91959bc63fbeddb9601072151b8',
              },
              commission: 0.015,
              vpRatios: 0.05,
              delegatedAmount: 11887597,
              amtRatio: 0.05,
              reward: 122321,
              selfRatio: 0.11,
              status: 'candidate',
              isActive: true,
              address: 'desmos1s9z0nzuu23fvac8u0j4tgvhgyg83ulc4qxs6z6',
            },
            {
              image:
                'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
              name: 'Forbole5',
              location: {
                name: 'Country/Area',
                image:
                  'https://www.flaticon.com/svg/vstatic/svg/206/206626.svg?token=exp=1617955509~hmac=d580f91959bc63fbeddb9601072151b8',
              },
              commission: 0.015,
              vpRatios: 0.05,
              delegatedAmount: 11887597,
              amtRatio: 0.05,
              reward: 122321,
              selfRatio: 0.1,
              status: 'candidate',
              isActive: true,
              address: 'desmos1s9z0nzuu23fvac8u0j4tgvhgyg83ulc4qxs6z6',
            },
          ]
          //   times(100).map(() => ({
          //   image:
          //     'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
          //   name: 'Forbole',
          //   location: {
          //     name: 'Country/Area',
          //     image:
          //       'https://www.flaticon.com/svg/vstatic/svg/555/555612.svg?token=exp=1616989324~hmac=9538f28cc72d43ec0ba214526649bed9',
          //   },
          //   commission: 0.015,
          //   vpRatios: 0.05,
          //   delegatedAmount: 11887597,
          //   amtRatio: 0.05,
          //   reward: 122321,
          //   selfRatio: '0.1',
          //   status: 'candidate',
          //   isActive: false,
          // }))
        }
        crypto={{
          name: '',
          coinType: 0,
        }}
      />
      {/* <Box display="flex" justifyContent="space-between" alignItems="center">
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
      /> */}
    </Layout>
  )
}

export default Delegate
