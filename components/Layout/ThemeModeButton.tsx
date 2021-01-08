import { IconButton } from '@material-ui/core'
import React from 'react'
import useStyles from './styles'
import DarkModeIcon from '../../assets/images/icons/icon_dark_mode.svg'
import LightModeIcon from '../../assets/images/icons/icon_light_mode.svg'
import { useSettingsContext } from '../../contexts/SettingsContext'
import useIconProps from '../../misc/useIconProps'

interface ThemeModeButtonProps {}

const ThemeModeButton: React.FC<ThemeModeButtonProps> = () => {
  const { theme, setTheme } = useSettingsContext()
  const iconProps = useIconProps(3)
  const classes = useStyles()
  const isDarkMode = theme === 'dark'
  return (
    <IconButton
      onClick={() => setTheme(isDarkMode ? 'light' : 'dark')}
      className={classes.navBarButton}
    >
      {isDarkMode ? <LightModeIcon {...iconProps} /> : <DarkModeIcon {...iconProps} />}
    </IconButton>
  )
}

export default React.memo(ThemeModeButton)
