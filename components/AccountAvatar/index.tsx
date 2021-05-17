import { Box, Avatar, Typography, Link, Snackbar } from '@material-ui/core'
import React from 'react'
import { Alert } from '@material-ui/lab'
import useTranslation from 'next-translate/useTranslation'
import CopyIcon from '../../assets/images/icons/icon_copy.svg'
import useIconProps from '../../misc/useIconProps'
import cryptocurrencies from '../../misc/cryptocurrencies'
import useStyles from './styles'

interface AccountAvatarProps {
  account: Account
  hideAddress?: boolean
  size?: 'small' | 'base' | 'large'
}

const AccountAvatar: React.FC<AccountAvatarProps> = ({ account, hideAddress, size = 'base' }) => {
  const crypto = cryptocurrencies[account.crypto]
  const { t } = useTranslation('common')
  const iconProps = useIconProps()
  const classes = useStyles()
  const [isCopySuccess, setIsCopySuccess] = React.useState(false)

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
    navigator.clipboard.writeText(account.address)
    setIsCopySuccess(true)
  }, [account.address])

  return (
    <>
      <Box display="flex" alignItems="center">
        <Avatar className={avatarClass} alt={crypto.name} src={crypto.image} />
        <Box ml={1}>
          <Typography color="textPrimary" variant={titleVariant}>
            {account.name}
          </Typography>
          {hideAddress ? null : (
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
                {account.address}
              </Link>
              <Box display="inline" ml={1}>
                <CopyIcon {...iconProps} />
              </Box>
            </Link>
          )}
        </Box>
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
