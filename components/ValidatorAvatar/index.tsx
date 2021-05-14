import { Box, Avatar, Typography, Link } from '@material-ui/core'
import React from 'react'
import useStyles from './styles'

interface ValidatorAvatarProps {
  validator: Validator
  crypto: Cryptocurrency
  size?: 'small' | 'base' | 'large'
  withoutLink?: boolean
}

const ValidatorAvatar: React.FC<ValidatorAvatarProps> = ({
  validator,
  crypto,
  size = 'base',
  withoutLink,
}) => {
  const classes = useStyles()

  let avatarClass = ''
  let titleVariant: 'h3' | 'h5' | 'body1' = 'h5'
  if (size === 'small') {
    avatarClass = classes.smallAvatar
    titleVariant = 'body1'
  } else if (size === 'large') {
    avatarClass = classes.largeAvatar
    titleVariant = 'h3'
  }

  return withoutLink ? (
    <Box display="flex" alignItems="center">
      <Avatar className={avatarClass} alt={validator.name} src={validator.image} />
      <Box ml={1}>
        <Typography className={classes.wrapText} color="textPrimary" variant={titleVariant}>
          {validator.name}
        </Typography>
      </Box>
    </Box>
  ) : (
    <Link
      href={`${crypto.blockExplorerBaseUrl}/validators/${validator.address}`}
      color="textPrimary"
      target="_blank"
    >
      <Box display="flex" alignItems="center">
        <Avatar className={avatarClass} alt={validator.name} src={validator.image} />
        <Box ml={1}>
          <Link className={classes.wrapText} color="textPrimary" variant={titleVariant}>
            {validator.name}
          </Link>
        </Box>
      </Box>
    </Link>
  )
}

export default ValidatorAvatar
