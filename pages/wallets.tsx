import { Box, Grid, IconButton, Typography } from '@material-ui/core'
import React from 'react'
import groupBy from 'lodash/groupBy'
import useTranslation from 'next-translate/useTranslation'
import { makeStyles } from '@material-ui/core/styles'
import Layout from '../components/Layout'
import EditIcon from '../assets/images/icons/icon_edit.svg'
import AccountCard from '../components/AccountCard'
import { useWalletsContext } from '../contexts/WalletsContext'
import useIconProps from '../misc/useIconProps'

const useStyles = makeStyles(
  (theme) => ({
    editButton: {
      marginLeft: theme.spacing(1),
    },
  }),
  {
    name: 'HookGlobalStyles',
    index: 2,
  }
)

const Wallets: React.FC = () => {
  const { t } = useTranslation('common')
  const { wallets, accounts } = useWalletsContext()
  const accountsMap = React.useMemo(() => groupBy(accounts, 'walletId'), [accounts])
  const iconProps = useIconProps()
  const classes = useStyles()
  return (
    <Layout passwordRequired activeItem="/wallets">
      <Typography gutterBottom variant="h1">
        {t('wallet manage')}
      </Typography>
      {wallets.map((w) => (
        <Box key={w.id} mt={2}>
          <Box display="flex" alignItems="center" mb={1}>
            <Typography variant="h4">{w.name}</Typography>
            <IconButton className={classes.editButton}>
              <EditIcon {...iconProps} />
            </IconButton>
          </Box>
          <Grid container spacing={3}>
            {accountsMap[w.id].map((a) => (
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
