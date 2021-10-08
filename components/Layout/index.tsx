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
import useIsChromeExt from '../../misc/useIsChromeExt'

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
  const { isFirstTimeUser, appUnlockState, isChromeExtInstalled, unlockWallets, password } =
    useWalletsContext()
  // Hide menu for chrome extension
  const router = useRouter()
  const defaultPassword = router.query.password
  const { isChromeExt } = useIsChromeExt()

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

  const initPassword = React.useCallback(async () => {
    try {
      if (appUnlockState !== 'unlocked') {
        if (defaultPassword) {
          await unlockWallets(String(defaultPassword))
        } else if (password) {
          await unlockWallets(password)
        }
      }
    } catch (err) {
      console.log(err)
    }
  }, [defaultPassword, password, appUnlockState, unlockWallets])

  React.useEffect(() => {
    initPassword()
  }, [initPassword])

  return loaded ? (
    <>
      <NavBar
        HeaderLeftComponent={HeaderLeftComponent}
        // eslint-disable-next-line no-nested-ternary
        menuWidth={isChromeExt ? 0 : isMenuExpanded ? MenuWidth.Expanded : MenuWidth.Collapsed}
      />
      {isChromeExt ? null : (
        <LeftMenu
          activeItem={activeItem}
          isMenuExpanded={isMenuExpanded}
          setIsMenuExpanded={setIsMenuExpanded}
        />
      )}
      <Box
        className={classes.main}
        style={{
          marginLeft: isChromeExt
            ? 0
            : theme.spacing(isMenuExpanded ? MenuWidth.Expanded : MenuWidth.Collapsed),
        }}
      >
        {passwordRequired && isFirstTimeUser ? <GetStarted /> : null}
        {!passwordRequired || appUnlockState === 'unlocked' ? children : null}
      </Box>
      {passwordRequired &&
      !isFirstTimeUser &&
      isChromeExtInstalled &&
      appUnlockState === 'locked' ? (
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
