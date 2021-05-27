import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Box, List, ListItem, ListItemIcon, ListItemText, Paper, useTheme } from '@material-ui/core'
import Link from 'next/link'
import OverviewIcon from '../../assets/images/icons/icon_overview.svg'
import WalletManageIcon from '../../assets/images/icons/icon_wallet_manage.svg'
import DelegateIcon from '../../assets/images/icons/icon_delegate_08.svg'
import MarketIcon from '../../assets/images/icons/icon_market.svg'
import ProposalIcon from '../../assets/images/icons/icon_proposal.svg'
import AddressBookIcon from '../../assets/images/icons/icon_address_book.svg'
import ExplorerIcon from '../../assets/images/icons/icon_explorer.svg'
import Logo from '../../assets/images/logo.svg'
import LogoExpended from '../../assets/images/logo_expended.svg'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'
import { MenuWidth } from '.'
import { useGeneralContext } from '../../contexts/GeneralContext'

interface LeftMenuProps {
  activeItem: string
  isMenuExpanded: boolean
  setIsMenuExpanded(isExpanded: boolean): void
}

const LeftMenu: React.FC<LeftMenuProps> = ({ activeItem, isMenuExpanded, setIsMenuExpanded }) => {
  const { t } = useTranslation('common')
  const themeStyle = useTheme()
  const iconProps = useIconProps(3)
  const classes = useStyles()
  const { theme } = useGeneralContext()
  const items = React.useMemo(
    () => [
      {
        title: t('overview'),
        icon: <OverviewIcon {...iconProps} />,
        href: '/',
      },
      {
        title: t('wallet manage'),
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
      // {
      //   title: t('proposals'),
      //   icon: <ProposalIcon {...iconProps} />,
      //   href: '/proposals',
      // },
      {
        title: t('address book'),
        icon: <AddressBookIcon {...iconProps} />,
        href: '/address-book',
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
        {items.map((item) => {
          const selected = item.href === activeItem
          return (
            <Link key={item.title} href={item.href} passHref>
              <ListItem selected={selected} className={classes.menuItem} button component="a">
                <ListItemIcon>
                  {React.cloneElement(item.icon, {
                    fill: selected ? themeStyle.palette.primary.main : themeStyle.palette.grey[300],
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
      </List>
    </Paper>
  )
}

export default React.memo(LeftMenu)
