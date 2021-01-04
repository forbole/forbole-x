import { Box, Button, IconButton, useTheme } from '@material-ui/core'
import React from 'react'
import useStyles from './styles'
import CurrencyIcon from '../../assets/images/icons/icon_delegate_08.svg'
import LangIcon from '../../assets/images/icons/icon_language.svg'
import NotiIcon from '../../assets/images/icons/icon_notification_32.svg'
import DarkModeIcon from '../../assets/images/icons/icon_dark_mode.svg'
import SettingsIcon from '../../assets/images/icons/icon_settings.svg'

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  const theme = useTheme()
  const iconProps = {
    width: theme.spacing(3),
    height: theme.spacing(3),
    fill: theme.palette.grey[300],
  }
  const classes = useStyles()
  return (
    <Box className={classes.navBar}>
      <Button className={classes.navBarButton} startIcon={<CurrencyIcon {...iconProps} />}>
        USD
      </Button>
      <Button className={classes.navBarButton} startIcon={<LangIcon {...iconProps} />}>
        ENG
      </Button>
      <IconButton className={classes.navBarButton}>
        <NotiIcon {...iconProps} />
      </IconButton>
      <IconButton className={classes.navBarButton}>
        <DarkModeIcon {...iconProps} />
      </IconButton>
      <IconButton className={classes.navBarButton}>
        <SettingsIcon {...iconProps} />
      </IconButton>
    </Box>
  )
}

export default React.memo(NavBar)
