import React from 'react'
import { Box, useTheme } from '@material-ui/core'
import { useRouter } from 'next/router'
import get from 'lodash/get'
import qs from 'query-string'
import useStyles from './styles'
import LeftMenu from './LeftMenu'
import NavBar from './NavBar'
import GetStarted from '../GetStarted'
import { useWalletsContext } from '../../contexts/WalletsContext'
import UnlockPasswordDialog from '../UnlockPasswordDialog'
import usePersistedState from '../../misc/usePersistedState'
import ConfirmTransactionDialog from '../ConfirmTransactionDialog'
import ChromeExtDialog from '../ChromeExtDialog'

export enum MenuWidth {
  Expanded = 32,
  Collapsed = 10,
}

interface LayoutProps {
  activeItem?: string
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
  const { isFirstTimeUser, isUnlocked, isChromeExtInstalled } = useWalletsContext()
  // Hide menu for chrome extension
  const router = useRouter()
  const hideMenuQueryParam = get(router, 'query.hideMenu', '')
  const isHideMenu = hideMenuQueryParam || (process.browser && (window as any).hideMenu)

  React.useEffect(() => {
    if (hideMenuQueryParam) {
      // eslint-disable-next-line @typescript-eslint/no-extra-semi
      ;(window as any).hideMenu = true
    }
  }, [hideMenuQueryParam])

  // Open ConfirmTransactionDialog with correct query params
  const { address, transactionData, open, onClose } = React.useMemo(() => {
    const { url, query } = qs.parseUrl(router.asPath)
    return {
      address: get(router, 'query.address', ''),
      transactionData: JSON.parse(get(router, 'query.transactionData', '""')),
      open: !!get(router, 'query.transactionData', ''),
      onClose: () =>
        router.replace(
          qs.stringifyUrl({
            url,
            query: { ...query, transactionData: undefined, address: undefined },
          })
        ),
    }
  }, [router])

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
      {passwordRequired && !isFirstTimeUser && isChromeExtInstalled ? (
        <UnlockPasswordDialog />
      ) : null}
      {!isChromeExtInstalled ? <ChromeExtDialog /> : null}
      {open ? (
        <ConfirmTransactionDialog
          address={address}
          transactionData={transactionData}
          open={open}
          onClose={onClose}
        />
      ) : null}
    </>
  ) : null
}

export default React.memo(Layout)
