import { Box, Avatar, Typography, Link } from '@material-ui/core'
import React from 'react'
import CopyIcon from '../../assets/images/icons/icon_copy.svg'
import useIconProps from '../../misc/useIconProps'
import cryptocurrencies from '../../misc/cryptocurrencies'
import useStyles from './styles'

interface AccountAvatarProps {
  account: Account
  hideAddress?: boolean
  size?: 'small' | 'base'
}

const AccountAvatar: React.FC<AccountAvatarProps> = ({ account, hideAddress, size = 'base' }) => {
  const crypto = cryptocurrencies[account.crypto]
  const iconProps = useIconProps()
  const classes = useStyles()

  return (
    <Box display="flex" alignItems="center">
      <Avatar
        className={size === 'small' ? classes.smallAvatar : ''}
        alt={crypto.name}
        src={crypto.image}
      />
      <Box ml={1}>
        <Typography variant={size === 'small' ? 'body1' : 'h5'}>{account.name}</Typography>
        {hideAddress ? null : (
          <Link
            component="button"
            variant="body2"
            color="textSecondary"
            onClick={() => navigator.clipboard.writeText(account.address)}
          >
            {account.address}
            <Box display="inline" ml={1}>
              <CopyIcon {...iconProps} />
            </Box>
          </Link>
        )}
      </Box>
    </Box>
  )
}

export default AccountAvatar
