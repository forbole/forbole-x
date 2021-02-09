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
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'
import { MenuWidth } from '.'

interface LeftMenuProps {
  activeItem: string
  isMenuExpanded: boolean
  setIsMenuExpanded: React.Dispatch<React.SetStateAction<boolean>>
}

const LeftMenu: React.FC<LeftMenuProps> = ({ activeItem, isMenuExpanded, setIsMenuExpanded }) => {
  const { t } = useTranslation('common')
  const theme = useTheme()
  const iconProps = useIconProps(3)
  const classes = useStyles()
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
      {
        title: t('market'),
        icon: <MarketIcon {...iconProps} />,
        href: '/market',
      },
      {
        title: t('proposals'),
        icon: <ProposalIcon {...iconProps} />,
        href: '/proposals',
      },
      {
        title: t('address book'),
        icon: <AddressBookIcon {...iconProps} />,
        href: '/address-book',
      },
      {
        title: t('explorer'),
        icon: <ExplorerIcon {...iconProps} />,
        href: '/explorer',
      },
    ],
    [iconProps, t]
  )

  return (
    <Paper
      style={{ width: theme.spacing(isMenuExpanded ? MenuWidth.Expanded : MenuWidth.Collapsed) }}
      className={classes.leftMenuContainer}
    >
      <List className={classes.menu}>
        <ListItem className={classes.menuItem} button onClick={() => setIsMenuExpanded((e) => !e)}>
          <ListItemIcon>
            <Box ml={-1}>
              <Logo
                width={theme.spacing(5)}
                height={theme.spacing(5)}
                fill={theme.palette.primary.main}
              />
            </Box>
          </ListItemIcon>
          <ListItemText
            primary="PORTAL"
            primaryTypographyProps={{
              variant: 'h1',
              color: 'primary',
            }}
          />
        </ListItem>
        {items.map((item) => {
          const selected = item.href === activeItem
          return (
            <Link key={item.title} href={item.href} passHref>
              <ListItem selected={selected} className={classes.menuItem} button component="a">
                <ListItemIcon>
                  {React.cloneElement(item.icon, {
                    fill: selected ? theme.palette.primary.main : theme.palette.grey[300],
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
