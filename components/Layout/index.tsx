import React from 'react'
import { Box } from '@material-ui/core'
import useStyles from './styles'
import LeftMenu from './LeftMenu'
import NavBar from './NavBar'

interface LayoutProps {
  activeItem: string
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ activeItem, children }) => {
  const classes = useStyles()
  return (
    <>
      <NavBar />
      <LeftMenu activeItem={activeItem} />
      <Box className={classes.main}>{children}</Box>
    </>
  )
}

export default React.memo(Layout)
