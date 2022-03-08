import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Tooltip,
  useTheme,
} from '@material-ui/core'
import Link from 'next/link'
import { Lottie } from '@alfonmga/react-lottie-light-ts'
import DarkModeAnimationJsonData from '../../assets/lotties/starred-account-animation-dark.json'
import LightModeAnimationJsonData from '../../assets/lotties/starred-account-animation-light.json'
import OverviewIcon from '../../assets/images/icons/icon_overview.svg'
import WalletManageIcon from '../../assets/images/icons/icon_wallet_manage.svg'
import DelegateIcon from '../../assets/images/icons/icon_delegate_08.svg'
import ProposalIcon from '../../assets/images/icons/icon_proposal.svg'
import AddressBookIcon from '../../assets/images/icons/icon_address_book.svg'
import Logo from '../../assets/images/logo.svg'
import LogoExpended from '../../assets/images/logo_expended.svg'
import useStyles from './styles'
import StarredAccount from './StarredAccount'
import useIconProps from '../../misc/useIconProps'
import { MenuWidth } from '.'
import { useGeneralContext } from '../../contexts/GeneralContext'
import { CustomTheme } from '../../misc/theme'
import { useWalletsContext } from '../../contexts/WalletsContext'

interface LeftMenuProps {
  activeItem: string
  isMenuExpanded: boolean
  setIsMenuExpanded(isExpanded: boolean): void
}

const LeftMenu: React.FC<LeftMenuProps> = ({ activeItem, isMenuExpanded, setIsMenuExpanded }) => {
  const { t } = useTranslation('common')
  const themeStyle: CustomTheme = useTheme()
  const iconProps = useIconProps(3)
  const { theme } = useGeneralContext()
  const classes = useStyles({ mode: theme })
  const { accounts } = useWalletsContext()
  const favAccount = accounts.some((acc) => !!acc.fav)
  const items = React.useMemo(
    () => [
      {
        title: t('portfolio'),
        icon: <OverviewIcon {...iconProps} />,
        href: '/',
      },
      {
        title: t('wallet'),
        icon: <WalletManageIcon {...iconProps} />,
        href: '/wallets',
      },
      {
        title: t('staking'),
        icon: <DelegateIcon {...iconProps} />,
        href: '/staking',
      },
      // {
      //   title: t('market'),
      //   icon: <MarketIcon {...iconProps} />,
      //   href: '/market',
      // },
      {
        title: t('address book'),
        icon: <AddressBookIcon {...iconProps} />,
        href: '/address-book',
      },
      {
        title: t('proposals'),
        icon: <ProposalIcon {...iconProps} />,
        href: '/proposals',
      },
      // {
      //   title: t('explorer'),
      //   icon: <ExplorerIcon {...iconProps} />,
      //   href: '/explorer',
      // },
    ],
    [iconProps, t]
  )

  return (
    <Paper
      style={{
        width: themeStyle.spacing(isMenuExpanded ? MenuWidth.Expanded : MenuWidth.Collapsed),
      }}
      className={classes.leftMenuContainer}
    >
      <List className={classes.menu}>
        <ListItem
          className={classes.menuItem}
          button
          onClick={() => setIsMenuExpanded(!isMenuExpanded)}
        >
          <ListItemIcon>
            <Box ml={-1}>
              {isMenuExpanded ? (
                <LogoExpended
                  fill={
                    theme === 'light'
                      ? themeStyle.palette.primary.main
                      : themeStyle.palette.text.primary
                  }
                />
              ) : (
                <Logo
                  fill={
                    theme === 'light'
                      ? themeStyle.palette.primary.main
                      : themeStyle.palette.text.primary
                  }
                />
              )}
            </Box>
          </ListItemIcon>
        </ListItem>
        <Box className={classes.menuItems}>
          {items.map((item) => {
            const selected = item.href === activeItem
            return (
              <Link key={item.title} href={item.href} as={`${item.href}`} passHref>
                <Tooltip
                  classes={{ arrow: classes.arrow, tooltip: classes.tooltip }}
                  title={item.title}
                  placement="right"
                  arrow
                  disableFocusListener={isMenuExpanded}
                  disableHoverListener={isMenuExpanded}
                  disableTouchListener={isMenuExpanded}
                >
                  <ListItem
                    selected={selected}
                    className={classes.menuItem}
                    button
                    component="a"
                    style={{
                      background: selected ? themeStyle.palette.menuBackground : 'inherits',
                    }}
                  >
                    <ListItemIcon>
                      {React.cloneElement(item.icon, {
                        fill: selected
                          ? themeStyle.palette.primary.main
                          : themeStyle.palette.grey[300],
                      })}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.title}
                      primaryTypographyProps={{
                        variant: 'h6',
                        color: selected ? 'primary' : 'textSecondary',
                      }}
                    />
                  </ListItem>
                </Tooltip>
              </Link>
            )
          })}
        </Box>
        <Box className={classes.favMenu}>
          <ListItemText
            primary={t('starredAccounts')}
            primaryTypographyProps={{
              variant: 'h6',
              color: 'textSecondary',
            }}
            className={classes.starredAccounts}
            style={{
              display: isMenuExpanded ? 'block' : 'none',
              marginBottom: favAccount ? 0 : themeStyle.spacing(1),
            }}
          />
          <Lottie
            width="auto"
            height="auto"
            className="lottie-container basic"
            style={{ display: favAccount || !isMenuExpanded ? 'none' : 'block' }}
            config={{
              animationData:
                theme === 'light' ? LightModeAnimationJsonData : DarkModeAnimationJsonData,
              loop: true,
              autoplay: true,
            }}
          />
          <ListItemText
            primary={t('manageAccounts')}
            primaryTypographyProps={{
              variant: 'body1',
              color: 'textSecondary',
            }}
            style={{ display: favAccount || !isMenuExpanded ? 'none' : 'block' }}
            className={classes.manageAccounts}
          />
          <Link href="/wallets" passHref>
            <Button
              variant="contained"
              color="primary"
              style={{ display: favAccount || !isMenuExpanded ? 'none' : 'block' }}
              className={classes.starButton}
            >
              {t('star now')}
            </Button>
          </Link>
          {accounts
            .filter((account) => account.fav)
            .map((account) => (
              <StarredAccount key={account.address} account={account} />
            ))}
        </Box>
      </List>
    </Paper>
  )
}

export default React.memo(LeftMenu)
