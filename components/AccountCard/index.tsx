import {
  Box,
  Card,
  Avatar,
  Typography,
  Button,
  useTheme,
  IconButton,
  Link,
} from '@material-ui/core'
import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import MoreIcon from '../../assets/images/icons/icon_more.svg'
import StarIcon from '../../assets/images/icons/icon_star.svg'
import StarFilledIcon from '../../assets/images/icons/icon_star_marked.svg'
import CopyIcon from '../../assets/images/icons/icon_copy.svg'
import useStyles from './styles'
import { useSettingsContext } from '../../contexts/SettingsContext'
import useIconProps from '../../misc/useIconProps'

interface AccountCardProps {
  account: Account
}

const AccountCard: React.FC<AccountCardProps> = () => {
  const classes = useStyles()
  const iconProps = useIconProps()
  const { lang } = useTranslation()
  const { currency } = useSettingsContext()
  // TODO: fetch data from backend
  const now = Date.now()
  const balance = 104387.26
  const usdBalance = 626323.54

  return (
    <Card className={classes.container}>
      <Box mb={5} display="flex" alignItems="flex-start" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Avatar
            alt="ATOM"
            src="https://research.binance.com/static/images/projects/cosmos-network/cosmoslogo.png"
          />
          <Box ml={1}>
            <Typography variant="h5">Account 12</Typography>
            <Link component="button" variant="body2" color="textSecondary">
              cosmos14kn0kk33szpwus9nh8n87fjel8djx0y0mmswhp
              <Box display="inline" ml={1}>
                <CopyIcon {...iconProps} />
              </Box>
            </Link>
          </Box>
        </Box>
        <IconButton>
          <MoreIcon {...iconProps} />
        </IconButton>
      </Box>
      <Box display="flex" alignItems="flex-end" justifyContent="space-between">
        <Box>
          <Typography variant="h4">
            {new Intl.NumberFormat(lang, {
              signDisplay: 'never',
            }).format(balance)}
            {' ATOM'}
          </Typography>
          <Typography variant="h6">
            {new Intl.NumberFormat(lang, {
              style: 'currency',
              currency,
            }).format(usdBalance)}{' '}
            {currency}
          </Typography>
        </Box>
        <IconButton>
          <StarIcon {...iconProps} />
        </IconButton>
      </Box>
    </Card>
  )
}

export default AccountCard
