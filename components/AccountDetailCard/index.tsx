import { Box, Button, Card, Grid, Typography, useTheme } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import StarIcon from '../../assets/images/icons/icon_star.svg'
import EditIcon from '../../assets/images/icons/icon_edit_tool.svg'
import StarFilledIcon from '../../assets/images/icons/icon_star_marked.svg'
import AccountAvatar from '../AccountAvatar'
import BalanceChart from '../BalanceChart'
import { useSettingsContext } from '../../contexts/SettingsContext'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'
import { useWalletsContext } from '../../contexts/WalletsContext'
import StatBox from './StatBox'
import DelegationDialog from '../DelegateDialog'
import { formatCrypto, formatCurrency } from '../../misc/utils'

interface AccountDetailCardProps {
  account: Account
}

const AccountDetailCard: React.FC<AccountDetailCardProps> = ({ account }) => {
  const { lang, t } = useTranslation('common')
  const { currency } = useSettingsContext()
  const classes = useStyles()
  const iconProps = useIconProps()
  const theme = useTheme()
  const { updateAccount } = useWalletsContext()
  const [delegateDialogOpen, setDelegateDialogOpen] = React.useState(false)

  const toggleFav = React.useCallback(() => {
    updateAccount(account.address, { fav: !account.fav })
  }, [account.address, account.fav, updateAccount])

  // TODO: fetch data from backend
  const now = Date.now()
  const balance = 656333.849
  const btcBalance = 57.987519
  const delta = new Array(24 * 7).fill(null).map(() => (Math.random() - 0.5) / 10)
  const data = []
  delta.forEach((d, i) => {
    data.unshift({
      time: now - i * 3600000,
      balance: i === 0 ? balance : data[0].balance * (1 + d),
    })
  })

  return (
    <>
      <Card className={classes.container}>
        <Box p={4}>
          <Box mb={4} display="flex" justifyContent="space-between" alignItems="flex-start">
            <AccountAvatar size="large" account={account} />
            <Box display="flex">
              <Button
                classes={{ root: classes.fixedWidthButton }}
                variant="contained"
                color="primary"
                onClick={() => setDelegateDialogOpen(true)}
              >
                Delegate
              </Button>
              <Button
                classes={{ root: classes.fixedWidthButton }}
                variant="contained"
                color="secondary"
              >
                Claim Rewards
              </Button>
              <Button classes={{ root: classes.sendButton }} variant="contained" color="secondary">
                Send
              </Button>
              <Button classes={{ root: classes.iconButton }} variant="outlined" onClick={toggleFav}>
                {account.fav ? (
                  <StarFilledIcon {...iconProps} fill={theme.palette.warning.light} />
                ) : (
                  <StarIcon {...iconProps} />
                )}
              </Button>
              <Button classes={{ root: classes.iconButton }} variant="outlined">
                <EditIcon {...iconProps} />
              </Button>
            </Box>
          </Box>
          <BalanceChart
            data={data}
            ticks={new Array(7).fill(null).map((_a, i) => now - (6 - i) * 24 * 3600000)}
            title={formatCrypto(btcBalance, account.crypto, lang)}
            subtitle={formatCurrency(balance, currency, lang)}
          />
          <Box mt={10}>
            <Grid container spacing={4}>
              <StatBox
                title={t('available')}
                value={formatCrypto(btcBalance, account.crypto, lang)}
                subtitle={formatCurrency(balance, currency, lang)}
              />
              <StatBox
                title={t('delegated')}
                value={formatCrypto(btcBalance, account.crypto, lang)}
                subtitle={formatCurrency(balance, currency, lang)}
              />
              <StatBox
                title={t('unbonding')}
                value={formatCrypto(btcBalance, account.crypto, lang)}
                subtitle={formatCurrency(balance, currency, lang)}
              />
              <StatBox
                title={t('reward')}
                value={formatCrypto(btcBalance, account.crypto, lang)}
                subtitle={formatCurrency(balance, currency, lang)}
              />
              <StatBox
                title={t('commission')}
                value={formatCrypto(btcBalance, account.crypto, lang)}
                subtitle={formatCurrency(balance, currency, lang)}
              />
            </Grid>
          </Box>
        </Box>
      </Card>
      <DelegationDialog
        open={delegateDialogOpen}
        onClose={() => setDelegateDialogOpen(false)}
        account={account}
      />
    </>
  )
}

export default AccountDetailCard
