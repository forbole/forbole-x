import { Box, Avatar, Typography, Link } from '@material-ui/core'
import React from 'react'
import CopyIcon from '../../assets/images/icons/icon_copy.svg'
import useIconProps from '../../misc/useIconProps'
import cryptocurrencies from '../../misc/cryptocurrencies'

interface AccountAvatarProps {
  account: Account
}

const AccountAvatar: React.FC<AccountAvatarProps> = ({ account }) => {
  const crypto = cryptocurrencies[account.crypto]
  const iconProps = useIconProps()

  return (
    <Box display="flex" alignItems="center">
      <Avatar alt={crypto.name} src={crypto.image} />
      <Box ml={1}>
        <Typography variant="h5">{account.name}</Typography>
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
      </Box>
    </Box>
  )
}

export default AccountAvatar
