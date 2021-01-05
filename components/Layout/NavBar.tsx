import { Box, IconButton, useTheme } from '@material-ui/core'
import React from 'react'
import useStyles from './styles'
import NotiIcon from '../../assets/images/icons/icon_notification_32.svg'
import SettingsIcon from '../../assets/images/icons/icon_settings.svg'
import CurrencyMenuButton from './CurrencyMenuButton'
import LangMenuButton from './LangMenuButton'
import ThemeModeButton from './ThemeModeButton'

interface NavBarProps {}

export interface IconProps {
  width: number
  height: number
  fill: string
}

const NavBar: React.FC<NavBarProps> = () => {
  const theme = useTheme()
  const iconProps: IconProps = {
    width: theme.spacing(3),
    height: theme.spacing(3),
    fill: theme.palette.grey[300],
  }
  const classes = useStyles()

  return (
    <Box className={classes.navBar}>
      <CurrencyMenuButton {...iconProps} />
      <LangMenuButton {...iconProps} />
      <IconButton className={classes.navBarButton}>
        <NotiIcon {...iconProps} />
      </IconButton>
      <ThemeModeButton {...iconProps} />
      <IconButton className={classes.navBarButton}>
        <SettingsIcon {...iconProps} />
      </IconButton>
    </Box>
  )
}

export default React.memo(NavBar)
