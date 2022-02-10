import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@material-ui/core'
import React from 'react'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import useStyles from './styles'
// import NotiIcon from '../../assets/images/icons/icon_notification_71.svg'
import SettingsIcon from '../../assets/images/icons/icon_settings.svg'
import AddressBookIcon from '../../assets/images/icons/icon_address_book.svg'
import MenuIcon from '../../assets/images/icons/icon_menu.svg'
import BackIcon from '../../assets/images/icons/icon_back.svg'
import WalletManageIcon from '../../assets/images/icons/icon_wallet_manage.svg'
import CurrencyMenuButton from './CurrencyMenuButton'
// import LangMenuButton from './LangMenuButton'
import ThemeModeButton from './ThemeModeButton'
import useIconProps from '../../misc/useIconProps'

const NavBar: React.FC<{
  HeaderLeftComponent?: React.ReactNode
  ChromeExtTitleComponent?: React.ReactNode
  ChromeExtRightComponent?: React.ReactNode
  back?: boolean
  menuWidth: number
  isChromeExt: boolean
}> = ({
  HeaderLeftComponent,
  ChromeExtTitleComponent,
  ChromeExtRightComponent,
  menuWidth,
  isChromeExt,
  back,
}) => {
  const iconProps = useIconProps(3)
  const classes = useStyles()
  const { t } = useTranslation('common')
  const theme = useTheme()
  const router = useRouter()
  const [isChromeExtMenuOpen, setIsChromeExtMenuOpen] = React.useState(false)

  const chromeExtMenuItems = React.useMemo(
    () => [
      {
        title: t('wallet'),
        icon: <WalletManageIcon {...iconProps} />,
        href: '/wallets',
      },
      {
        title: t('settings'),
        icon: <SettingsIcon {...iconProps} />,
        href: '/settings',
      },
      {
        title: t('address book'),
        icon: <AddressBookIcon {...iconProps} />,
        href: '/address-book',
        // divider: true,
      },
      // {
      //   title: t('support'),
      //   href: '/settings?tab=support',
      // },
      // {
      //   title: t('feedback'),
      //   href: '/settings?tab=feedback',
      // },
      // {
      //   title: t('about'),
      //   href: '/settings?tab=about',
      // },
    ],
    [iconProps, t]
  )

  return isChromeExt ? (
    <>
      <Box
        className={classes.navBar}
        alignItems="center"
        style={{ justifyContent: 'space-between' }}
      >
        <IconButton onClick={() => (back ? router.back() : setIsChromeExtMenuOpen(true))}>
          {back ? <BackIcon {...iconProps} /> : <MenuIcon {...iconProps} />}
        </IconButton>
        {ChromeExtTitleComponent || null}
        {ChromeExtRightComponent || <Box p={3} />}
      </Box>
      <Drawer
        anchor="left"
        open={isChromeExtMenuOpen}
        onClose={() => setIsChromeExtMenuOpen(false)}
      >
        <Box display="flex" justifyContent="flex-end" m={2}>
          <ThemeModeButton />
        </Box>
        <List style={{ width: theme.spacing(menuWidth), padding: theme.spacing(0, 2) }} id="navBar">
          {chromeExtMenuItems.map((item) => {
            return (
              <React.Fragment key={item.title}>
                <Link href={item.href} passHref>
                  <ListItem className={classes.menuItem} button component="a">
                    {item.icon ? <ListItemIcon>{item.icon}</ListItemIcon> : null}
                    <ListItemText
                      primary={item.title}
                      primaryTypographyProps={{
                        variant: 'h6',
                        color: 'textSecondary',
                      }}
                    />
                  </ListItem>
                </Link>
                {/* {item.divider ? (
                  <Box mb={4}>
                    <Divider />
                  </Box>
                ) : null} */}
              </React.Fragment>
            )
          })}
        </List>
      </Drawer>
    </>
  ) : (
    <Box className={classes.navBar} id="navBar">
      {HeaderLeftComponent ? (
        <Box className={classes.navbarLeftComponentContainer} flex={1} ml={menuWidth}>
          {HeaderLeftComponent}
        </Box>
      ) : null}
      <CurrencyMenuButton />
      {/* <LangMenuButton />
      <IconButton className={classes.navBarButton}>
        <NotiIcon {...iconProps} />
      </IconButton> */}
      <ThemeModeButton />
      <Link href="/settings" passHref>
        <IconButton className={classes.navBarButton}>
          <SettingsIcon {...iconProps} />
        </IconButton>
      </Link>
    </Box>
  )
}

export default React.memo(NavBar)
