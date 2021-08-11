import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  useTheme,
} from '@material-ui/core'
import Link from 'next/link'
import OverviewIcon from '../../assets/images/icons/icon_overview.svg'
import WalletManageIcon from '../../assets/images/icons/icon_wallet_manage.svg'
import DelegateIcon from '../../assets/images/icons/icon_delegate_08.svg'
import ProposalIcon from '../../assets/images/icons/icon_proposal.svg'
import AddressBookIcon from '../../assets/images/icons/icon_address_book.svg'
import Logo from '../../assets/images/logo.svg'
import LogoExpended from '../../assets/images/logo_expended.svg'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'
import { MenuWidth } from '.'
import { useGeneralContext } from '../../contexts/GeneralContext'
import { CustomTheme } from '../../misc/theme'
import cryptocurrencies from '../../misc/cryptocurrencies'
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
  const classes = useStyles()
  const { theme } = useGeneralContext()
  const { accounts } = useWalletsContext()
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
        title: t('delegate'),
        icon: <DelegateIcon {...iconProps} />,
        href: '/delegate',
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
        <Box>
          {items.map((item) => {
            const selected = item.href === activeItem
            return (
              <Link key={item.title} href={item.href} passHref>
                <ListItem
                  selected={selected}
                  className={classes.menuItem}
                  button
                  component="a"
                  style={{ background: selected ? themeStyle.palette.menuBackground : 'inherits' }}
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
              </Link>
            )
          })}
        </Box>
        {accounts.map((account) => {
          const crypto = cryptocurrencies[account.crypto]
          return account.fav === true ? (
            <Box className={classes.favMenu}>
              {isMenuExpanded ? (
                <ListItemText
                  primary={t('starredAccounts')}
                  primaryTypographyProps={{
                    variant: 'h6',
                    color: 'textSecondary',
                  }}
                  className={classes.starredAccounts}
                />
              ) : (
                <></>
              )}
              <Link href="/account/[address]" as={`/account/${account.address}`}>
                <ListItem className={classes.favMenuItem} button component="a">
                  <ListItemIcon>
                    <Avatar
                      alt={crypto.name}
                      src={crypto.image}
                      style={{ height: '24px', width: '24px' }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={crypto.name}
                    primaryTypographyProps={{
                      variant: 'h6',
                    }}
                  />
                </ListItem>
              </Link>
            </Box>
          ) : (
            <>{null}</>
          )
        })}
      </List>
    </Paper>
  )
}

export default React.memo(LeftMenu)
