import React from 'react'
import { Box } from '@material-ui/core'
import useStyles from './styles'
import LeftMenu from './LeftMenu'
import NavBar from './NavBar'
import GetStarted from '../GetStarted'
import { useWalletsContext } from '../../contexts/WalletsContext'
import UnlockPasswordDialog from '../UnlockPasswordDialog'

interface LayoutProps {
  activeItem: string
  passwordRequired?: boolean
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ activeItem, passwordRequired, children }) => {
  const classes = useStyles()
  const { isFirstTimeUser, isUnlocked } = useWalletsContext()
  return (
    <>
      <NavBar />
      <LeftMenu activeItem={activeItem} />
      <Box className={classes.main}>
        {passwordRequired && isFirstTimeUser ? <GetStarted /> : null}
        {!passwordRequired || isUnlocked ? children : null}
      </Box>
      {passwordRequired && !isFirstTimeUser ? <UnlockPasswordDialog /> : null}
    </>
  )
}

export default React.memo(Layout)
