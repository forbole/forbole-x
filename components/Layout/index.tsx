import React from 'react'
import { Box } from '@material-ui/core'
import useStyles from './styles'
import LeftMenu from './LeftMenu'
import NavBar from './NavBar'
import GetStarted from '../GetStarted'
import { useWalletsContext } from '../../contexts/WalletsContext'

interface LayoutProps {
  activeItem: string
  passwordRequired?: boolean
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ activeItem, passwordRequired, children }) => {
  const classes = useStyles()
  const { isFirstTimeUser } = useWalletsContext()
  return (
    <>
      <NavBar />
      <LeftMenu activeItem={activeItem} />
      <Box className={classes.main}>
        {passwordRequired && isFirstTimeUser ? <GetStarted /> : children}
      </Box>
    </>
  )
}

export default React.memo(Layout)
