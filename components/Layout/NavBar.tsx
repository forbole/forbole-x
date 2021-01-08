import { Box, IconButton } from '@material-ui/core'
import React from 'react'
import useStyles from './styles'
import NotiIcon from '../../assets/images/icons/icon_notification_32.svg'
import SettingsIcon from '../../assets/images/icons/icon_settings.svg'
import CurrencyMenuButton from './CurrencyMenuButton'
import LangMenuButton from './LangMenuButton'
import ThemeModeButton from './ThemeModeButton'
import useIconProps from '../../misc/useIconProps'

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  const iconProps = useIconProps(3)
  const classes = useStyles()

  return (
    <Box className={classes.navBar}>
      <CurrencyMenuButton />
      <LangMenuButton />
      <IconButton className={classes.navBarButton}>
        <NotiIcon {...iconProps} />
      </IconButton>
      <ThemeModeButton />
      <IconButton className={classes.navBarButton}>
        <SettingsIcon {...iconProps} />
      </IconButton>
    </Box>
  )
}

export default React.memo(NavBar)
