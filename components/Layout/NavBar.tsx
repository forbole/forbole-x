import { Box, IconButton } from '@material-ui/core'
import React from 'react'
import useStyles from './styles'
import NotiIcon from '../../assets/images/icons/icon_notification_71.svg'
import SettingsIcon from '../../assets/images/icons/icon_settings.svg'
import CurrencyMenuButton from './CurrencyMenuButton'
import LangMenuButton from './LangMenuButton'
import ThemeModeButton from './ThemeModeButton'
import useIconProps from '../../misc/useIconProps'

const NavBar: React.FC<{ HeaderLeftComponent?: React.ReactNode; menuWidth: number }> = ({
  HeaderLeftComponent,
  menuWidth,
}) => {
  const iconProps = useIconProps(3)
  const classes = useStyles()

  return (
    <Box className={classes.navBar}>
      {HeaderLeftComponent ? (
        <Box flex={1} ml={menuWidth}>
          {HeaderLeftComponent}
        </Box>
      ) : null}
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
