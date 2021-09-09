import { Box, Avatar, Typography, Link, Snackbar, useTheme } from '@material-ui/core'
import React from 'react'
import { Alert } from '@material-ui/lab'
import useTranslation from 'next-translate/useTranslation'
import CopyIcon from '../../assets/images/icons/icon_copy.svg'
import useIconProps from '../../misc/useIconProps'
import cryptocurrencies from '../../misc/cryptocurrencies'
import useStyles from './styles'
import { CustomTheme } from '../../misc/theme'
import { useWalletsContext } from '../../contexts/WalletsContext'
import LedgerIcon from '../../assets/images/icons/usb_device.svg'

interface AccountAvatarProps {
  address?: {
    address: string
    crypto: string
    moniker: string
    note?: string
    img?: string
  }
  account?: Account
  hideAddress?: boolean
  disableCopyAddress?: boolean
  size?: 'small' | 'base' | 'large'
  ledgerIconDisabled?: boolean
}

const AccountAvatar: React.FC<AccountAvatarProps> = ({
  account,
  hideAddress,
  size = 'base',
  disableCopyAddress,
  address,
  ledgerIconDisabled,
}) => {
  const crypto = cryptocurrencies[account ? account.crypto : address.crypto]
  const { t } = useTranslation('common')
  const iconProps = useIconProps()
  const themeStyle: CustomTheme = useTheme()
  const classes = useStyles()
  const [isCopySuccess, setIsCopySuccess] = React.useState(false)
  const { wallets } = useWalletsContext()
  const walletAccountInfo = { ...account, ...wallets.find((wal) => wal.id === account.walletId) }

  let avatarClass = ''
  let titleVariant: 'h3' | 'h5' | 'body1' = 'h5'
  if (size === 'small') {
    avatarClass = classes.smallAvatar
    titleVariant = 'body1'
  } else if (size === 'large') {
    avatarClass = classes.largeAvatar
    titleVariant = 'h3'
  }

  const copyText = React.useCallback(() => {
    navigator.clipboard.writeText(account ? account.address : address.address)
    setIsCopySuccess(true)
  }, [account?.address, address?.address])

  return (
    <>
      <Box display="flex" alignItems="center">
        <Avatar className={avatarClass} alt={crypto.name} src={crypto.image} />
        <Box mx={1}>
          <Typography variant={titleVariant}>{account ? account.name : address.moniker}</Typography>
          {hideAddress || disableCopyAddress ? null : (
            <Link
              color="textSecondary"
              component="button"
              onClick={copyText}
              className={classes.addressButton}
            >
              <Link
                variant="body2"
                color="textSecondary"
                component="button"
                className={classes.address}
              >
                {account ? account.address : address.address}
              </Link>
              <Box display="inline" ml={1}>
                <CopyIcon {...iconProps} />
              </Box>
            </Link>
          )}
          {disableCopyAddress && !hideAddress ? (
            <Typography variant="body2" color="textSecondary">
              {account ? account.address : address.address}
            </Typography>
          ) : null}
        </Box>
        {walletAccountInfo.type === 'ledger' ? (
          <LedgerIcon
            fill={themeStyle.palette.text.primary}
            style={{ display: ledgerIconDisabled ? 'none' : 'block' }}
          />
        ) : null}
      </Box>
      <Snackbar
        open={isCopySuccess}
        autoHideDuration={5000}
        onClose={() => setIsCopySuccess(false)}
      >
        <Alert onClose={() => setIsCopySuccess(false)} severity="success">
          {t('copied to clipboard')}
        </Alert>
      </Snackbar>
    </>
  )
}

export default AccountAvatar
