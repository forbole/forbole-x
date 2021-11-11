import { Box, Button, Grid, Menu, MenuItem, Typography, useTheme } from '@material-ui/core'
import React from 'react'
import groupBy from 'lodash/groupBy'
import useTranslation from 'next-translate/useTranslation'
import Layout from '../components/Layout'
import AccountCard from '../components/AccountCard'
import { useWalletsContext } from '../contexts/WalletsContext'
import AddAccountButton from '../components/AddAccountButton/index'
import EditWalletButton from '../components/EditWalletButton/index'
import CreateWalletDialog from '../components/CreateWalletDialog'
import { CustomTheme } from '../misc/theme'
import LedgerIcon from '../assets/images/icons/usb_device.svg'

import ArrowDownIcon from '../assets/images/icons/icon_arrow down_title.svg'
import useIsChromeExt from '../misc/useIsChromeExt'
import useIconProps from '../misc/useIconProps'
import usePersistedState from '../misc/usePersistedState'

const Wallets: React.FC = () => {
  const { t } = useTranslation('common')
  const { wallets, accounts } = useWalletsContext()
  const accountsMap = React.useMemo(() => groupBy(accounts, 'walletId'), [accounts])
  const [isCreateWalletDialogOpen, setIsCreateWalletDialogOpen] = React.useState(false)
  const themeStyle: CustomTheme = useTheme()
  const iconProps = useIconProps()

  const { isChromeExt } = useIsChromeExt()
  const [chromeExtSelectedWalletIndex, setChromeExtSelectedWalletIndex] = usePersistedState(
    'chromeExtSelectedWalletIndex',
    0
  )
  const [walletsMenuAnchor, setWalletsMenuAnchor] = React.useState<Element>()
  const selectedWallet = wallets[chromeExtSelectedWalletIndex]

  return (
    <Layout
      passwordRequired
      activeItem="/wallets"
      ChromeExtTitleComponent={
        selectedWallet ? (
          <>
            <Button
              onClick={(e) => setWalletsMenuAnchor(e.currentTarget)}
              endIcon={<ArrowDownIcon {...iconProps} />}
            >
              {selectedWallet.type === 'ledger' ? (
                <LedgerIcon
                  fill={themeStyle.palette.text.primary}
                  style={{
                    marginRight: themeStyle.spacing(1),
                    marginTop: themeStyle.spacing(0.5),
                  }}
                />
              ) : null}
              <Box mt={1}>
                <Typography variant="h4">{selectedWallet.name}</Typography>
              </Box>
            </Button>
            <Menu
              anchorEl={walletsMenuAnchor}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              keepMounted
              open={!!walletsMenuAnchor}
              onClose={() => setWalletsMenuAnchor(undefined)}
            >
              {wallets.map((w, i) => (
                <MenuItem
                  key={w.id}
                  button
                  onClick={() => {
                    setChromeExtSelectedWalletIndex(i)
                    setWalletsMenuAnchor(undefined)
                  }}
                >
                  {w.type === 'ledger' ? (
                    <LedgerIcon
                      fill={themeStyle.palette.text.primary}
                      style={{ marginRight: themeStyle.spacing(0.75) }}
                    />
                  ) : null}
                  {w.name}
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : null
      }
      ChromeExtRightComponent={
        selectedWallet ? (
          <EditWalletButton
            wallet={selectedWallet}
            isChromeExt={isChromeExt}
            onCreateWallet={() => setIsCreateWalletDialogOpen(true)}
          />
        ) : null
      }
    >
      {isChromeExt ? null : (
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography gutterBottom variant="h1">
            {t('wallet')}
          </Typography>
          <Button
            style={{ color: themeStyle.palette.button, border: '1px solid' }}
            variant="outlined"
            onClick={() => setIsCreateWalletDialogOpen(true)}
          >
            {t('add wallet')}
          </Button>
        </Box>
      )}
      {isChromeExt && selectedWallet ? (
        <>
          <Box p={1} display="flex" justifyContent="space-between">
            <Typography variant="h4">{t('accounts')}</Typography>
            <AddAccountButton walletId={selectedWallet.id} />
          </Box>
          <Grid container spacing={3}>
            {(accountsMap[selectedWallet.id] || []).map((a) => (
              <Grid key={a.address} item xl={4} lg={6} xs={12}>
                <AccountCard account={a} ledgerIconDisabled isChromeExt />
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        wallets.map((w) => (
          <Box key={w.id} mt={2}>
            <Box display="flex" alignItems="center" mb={1}>
              {w.type === 'ledger' ? (
                <LedgerIcon
                  fill={themeStyle.palette.text.primary}
                  style={{ marginRight: themeStyle.spacing(0.75) }}
                />
              ) : null}
              <Typography variant="h4">{w.name}</Typography>
              <EditWalletButton wallet={w} />
              <AddAccountButton walletId={w.id} />
            </Box>
            <Grid container spacing={3}>
              {(accountsMap[w.id] || []).map((a) => (
                <Grid key={a.address + a.walletId} item xl={4} lg={6} xs={12}>
                  <AccountCard account={a} ledgerIconDisabled />
                </Grid>
              ))}
            </Grid>
          </Box>
        ))
      )}
      <CreateWalletDialog
        open={isCreateWalletDialogOpen}
        onClose={() => setIsCreateWalletDialogOpen(false)}
        // initialStage={CommonStage.AccessMyWalletStage}
      />
    </Layout>
  )
}

export default Wallets
