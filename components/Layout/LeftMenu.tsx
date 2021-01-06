import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import OverviewIcon from '../../assets/images/icons/icon_overview.svg'
import WalletManageIcon from '../../assets/images/icons/icon_wallet_manage.svg'
import DelegateIcon from '../../assets/images/icons/icon_delegate_08.svg'
import MarketIcon from '../../assets/images/icons/icon_market.svg'
import ProposalIcon from '../../assets/images/icons/icon_proposal.svg'
import AddressBookIcon from '../../assets/images/icons/icon_address_book.svg'
import ExplorerIcon from '../../assets/images/icons/icon_explorer.svg'
import Logo from '../../assets/images/logo.svg'
import { useTheme } from '@material-ui/core/styles'
import { List, ListItem, ListItemIcon, ListItemText, Paper } from '@material-ui/core'
import useStyles from './styles'
import Link from 'next/link'

interface LeftMenuProps {
  activeItem: string
}

const LeftMenu: React.FC<LeftMenuProps> = ({ activeItem }) => {
  const theme = useTheme()
  const { t } = useTranslation('common')
  const iconProps = {
    width: theme.spacing(3),
    height: theme.spacing(3),
  }
  const classes = useStyles()
  const items = React.useMemo(
    () => [
      {
        title: t('overview'),
        icon: <OverviewIcon {...iconProps} />,
        href: '/',
      },
      {
        title: t('walletManage'),
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
        title: t('addressBook'),
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
    <Paper elevation={0} className={classes.leftMenuContainer}>
      <List className={classes.menu}>
        <ListItem className={classes.menuItem} button>
          <ListItemIcon>
            <Logo
              width={theme.spacing(5)}
              height={theme.spacing(5)}
              fill={theme.palette.primary.main}
            />
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
