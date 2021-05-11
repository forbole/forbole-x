import React from 'react'
import { Box, useTheme } from '@material-ui/core'
import { useRouter } from 'next/router'
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
  HeaderLeftComponent?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({
  activeItem,
  passwordRequired,
  HeaderLeftComponent,
  children,
}) => {
  const classes = useStyles()
  const theme = useTheme()
  const [isMenuExpanded, setIsMenuExpanded, loaded] = usePersistedState('isMenuExpanded', true)
  const { isFirstTimeUser, isUnlocked } = useWalletsContext()

  // Hide menu for chrome extension
  const { query } = useRouter()
  const isHideMenu = query['hide-menu'] || (process.browser && (window as any).hideMenu)
  React.useEffect(() => {
    if (query['hide-menu']) {
      // eslint-disable-next-line @typescript-eslint/no-extra-semi
      ;(window as any).hideMenu = true
    }
  }, [query['hide-menu']])

  return loaded ? (
    <>
      <NavBar
        HeaderLeftComponent={HeaderLeftComponent}
        // eslint-disable-next-line no-nested-ternary
        menuWidth={isHideMenu ? 0 : isMenuExpanded ? MenuWidth.Expanded : MenuWidth.Collapsed}
      />
      {isHideMenu ? null : (
        <LeftMenu
          activeItem={activeItem}
          isMenuExpanded={isMenuExpanded}
          setIsMenuExpanded={setIsMenuExpanded}
        />
      )}
      <Box
        className={classes.main}
        style={{
          marginLeft: isHideMenu
            ? 0
            : theme.spacing(isMenuExpanded ? MenuWidth.Expanded : MenuWidth.Collapsed),
        }}
      >
        {passwordRequired && isFirstTimeUser ? <GetStarted /> : null}
        {!passwordRequired || isUnlocked ? children : null}
      </Box>
      {passwordRequired && !isFirstTimeUser ? <UnlockPasswordDialog /> : null}
    </>
  ) : null
}

export default React.memo(Layout)
