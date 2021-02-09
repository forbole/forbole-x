import React from 'react'
import { Box, useTheme } from '@material-ui/core'
import useStyles from './styles'
import LeftMenu from './LeftMenu'
import NavBar from './NavBar'
import GetStarted from '../GetStarted'
import { useWalletsContext } from '../../contexts/WalletsContext'
import UnlockPasswordDialog from '../UnlockPasswordDialog'
import usePersistedState from '../../misc/usePersistedState'

export enum MenuWidth {
  Expanded = 32,
  Collapsed = 11.5,
}

interface LayoutProps {
  activeItem: string
  passwordRequired?: boolean
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ activeItem, passwordRequired, children }) => {
  const classes = useStyles()
  const theme = useTheme()
  const [isMenuExpanded, setIsMenuExpanded] = usePersistedState('isMenuExpanded', true)
  console.log(isMenuExpanded)
  const { isFirstTimeUser, isUnlocked } = useWalletsContext()
  return (
    <>
      <NavBar />
      <LeftMenu
        activeItem={activeItem}
        isMenuExpanded={isMenuExpanded}
        setIsMenuExpanded={setIsMenuExpanded}
      />
      <Box
        className={classes.main}
        style={{
          marginLeft: theme.spacing(isMenuExpanded ? MenuWidth.Expanded : MenuWidth.Collapsed),
        }}
      >
        {passwordRequired && isFirstTimeUser ? <GetStarted /> : null}
        {!passwordRequired || isUnlocked ? children : null}
      </Box>
      {passwordRequired && !isFirstTimeUser ? <UnlockPasswordDialog /> : null}
    </>
  )
}

export default React.memo(Layout)
