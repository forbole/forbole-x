import React from 'react'
import {
  Box,
  Tabs,
  Tab,
  Divider,
  Avatar,
  Typography,
  useTheme,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { useGetStyles } from './styles'
import Table from './Table'
import { useGeneralContext } from '../../contexts/GeneralContext'
import MoreIcon from '../../assets/images/icons/icon_more.svg'
import useIconProps from '../../misc/useIconProps'
import EditAddressDialog from './EditAddressDialog'
import DeleteAddressDialog from './DeleteAddressDialog'

// interface AddressBookProps {
//   // address: Validator[]
//   // crypto: Cryptocurrency
//   // account: Account
//   // // eslint-disable-next-line camelcase
//   // availableTokens: { coins: Array<{ amount: string; denom: string }>; tokens_prices: TokenPrice[] }
//   // onRowClick?: (validatorInfo: Validator) => void
// }

export type FavAddress = {
  address: string
  crypto: string
  moniker: string
  notes?: string
  img?: string
}

const AddressBook: React.FC = () => {
  const { favAddresses, addFavAddresses, deleteFavAddresses } = useGeneralContext()
  console.log('favAddresses', favAddresses)
  const { classes } = useGetStyles()
  const { t } = useTranslation('common')
  const iconProps = useIconProps()
  const [currentTab, setCurrentTab] = React.useState(0)
  const theme = useTheme()
  const [anchor, setAnchor] = React.useState<Element>()

  const [editAddressOpen, setEditAddressOpen] = React.useState(false)
  const [deleteAddressOpen, setDeleteAddressOpen] = React.useState(false)
  const [addAddressOpen, setAddAddressOpen] = React.useState(false)
  const [currentAddress, setCurrentAddress] = React.useState<FavAddress>({})
  const router = useRouter()

  const onClose = React.useCallback(() => setAnchor(undefined), [setAnchor])
  const addressList = [
    {
      address: 'akash1zn2ff2x9usmdp44cxhxj80th8e9p3ure8nq9hw',
      img: 'https://raw.githubusercontent.com/forbole/big-dipper-networks/main/logos/desmos.svg?sanitize=true',
      moniker: 'Danny',
      crypto: 'AKT',
      notes: 'send it tokens',
    },
    {
      address: 'akash1zn2ff2x9usmdp44cxhxj80th8e9p3ure8nq9hw',
      img: 'https://raw.githubusercontent.com/forbole/big-dipper-networks/main/logos/desmos.svg?sanitize=true',
      moniker: 'Danny',
      crypto: 'AKT',
      notes: 'send it tokens',
    },
    {
      address: 'akash1zn2ff2x9usmdp44cxhxj80th8e9p3ure8nq9hw',
      img: 'https://raw.githubusercontent.com/forbole/big-dipper-networks/main/logos/desmos.svg?sanitize=true',
      moniker: 'Danny',
      crypto: 'AKT',
      notes: 'send it tokens',
    },
    {
      address: 'akash1zn2ff2x9usmdp44cxhxj80th8e9p3ure8nq9hw',
      img: 'https://raw.githubusercontent.com/forbole/big-dipper-networks/main/logos/desmos.svg?sanitize=true',
      moniker: 'Danny',
      crypto: 'AKT',
      notes: 'send it tokens',
    },
    {
      address: 'akash1zn2ff2x9usmdp44cxhxj80th8e9p3ure8nq9hw',
      img: 'https://raw.githubusercontent.com/forbole/big-dipper-networks/main/logos/desmos.svg?sanitize=true',
      moniker: 'Danny',
      crypto: 'ATOM',
      notes: 'send it tokens',
    },
    {
      address: 'akash1zn2ff2x9usmdp44cxhxj80th8e9p3ure8nq9hw',
      img: 'https://raw.githubusercontent.com/forbole/big-dipper-networks/main/logos/desmos.svg?sanitize=true',
      moniker: 'Danny',
      crypto: 'KAVA',
      notes: 'send it tokens',
    },
  ]
  // deleteFavAddresses('akash1zn2ff2x9usmdp44cxhxj80th8e9p3ure8nq9hw')

  const tabs = React.useMemo(
    () => [
      {
        label: 'all',
        address: favAddresses,
      },
      {
        label: 'ATOM',
        address: favAddresses.filter((x) => x.crypto === 'ATOM'),
      },
      {
        label: 'AKT',
        address: favAddresses.filter((x) => x.crypto === 'AKT'),
      },
      {
        label: 'BAND',
        address: favAddresses.filter((x) => x.crypto === 'BAND'),
      },
      {
        label: 'DSM',
        address: favAddresses.filter((x) => x.crypto === 'DSM'),
      },
      {
        label: 'FLOW',
        address: favAddresses.filter((x) => x.crypto === 'FLOW'),
      },
      {
        label: 'KAVA',
        address: favAddresses.filter((x) => x.crypto === 'KAVA'),
      },
      {
        label: 'SOL',
        address: favAddresses.filter((x) => x.crypto === 'SOL'),
      },
    ],
    [favAddresses]
  )

  const editAddress = (a: FavAddress) => {
    setCurrentAddress(a)
    setEditAddressOpen(true)
  }

  const toAddressDetail = async (a: FavAddress) => {
    await setCurrentAddress(a)
    console.log('currentAddress', currentAddress)
    // router.push(`/account/${currentAddress}`)
  }

  return (
    <Box>
      <Box p={4} pt={2}>
        <Tabs
          value={currentTab}
          classes={{ indicator: classes.tabIndicator }}
          onChange={(e, v) => setCurrentTab(v)}
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.label}
              label={`${tab.label === 'all' ? t(tab.label) : tab.label} (${tab.address.length})`}
            />
          ))}
        </Tabs>
        {tabs[currentTab].address.map((a) => {
          return (
            <Box onClick={() => toAddressDetail(a)}>
              <Divider />
              <Box display="flex" alignItems="flex-start" justifyContent="space-between">
                <Box display="flex" my={2} ml={2}>
                  <Avatar src={a.img} alt={a.address} />
                  <Box ml={2}>
                    <Typography>{a.moniker}</Typography>
                    <Box display="flex">
                      <Typography variant="subtitle2">{a.crypto}</Typography>{' '}
                      <Typography
                        variant="subtitle2"
                        color="textSecondary"
                        style={{ marginLeft: theme.spacing(1) }}
                      >
                        {a.address}
                      </Typography>
                    </Box>
                    <Typography variant="subtitle2" color="textSecondary">
                      {`${t('note')}: ${a.notes}`}
                    </Typography>
                  </Box>
                </Box>
                <IconButton
                  onClick={(e) => setAnchor(e.currentTarget)}
                  style={{ marginTop: theme.spacing(1) }}
                >
                  <MoreIcon {...iconProps} />
                </IconButton>
                <Menu
                  anchorEl={anchor}
                  getContentAnchorEl={null}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  keepMounted
                  open={!!anchor}
                  onClose={onClose}
                >
                  <MenuItem
                    className={classes.menuItem}
                    button
                    onClick={() => {
                      // setEditAddressOpen(true)
                      editAddress(a)
                      onClose()
                    }}
                  >
                    {t('edit address')}
                  </MenuItem>
                  <Divider style={{ margin: theme.spacing(1) }} />
                  <MenuItem
                    className={classes.menuItem}
                    button
                    onClick={() => {
                      setDeleteAddressOpen(true)
                      onClose()
                    }}
                  >
                    {t('delete address')}
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
          )
        })}
        <EditAddressDialog
          open={editAddressOpen}
          onClose={() => setEditAddressOpen(false)}
          address={currentAddress}
        />
        <DeleteAddressDialog
          open={deleteAddressOpen}
          onClose={() => setDeleteAddressOpen(false)}
          accountAddress={currentAddress.address}
        />
        {tabs[currentTab].address.length === 0 ? (
          <Box height={600} textAlign="center" style={{ position: 'relative' }}>
            <Box style={{ position: 'absolute', top: '50%', left: '43%' }}>
              <Typography style={{ marginBottom: theme.spacing(1.5) }}>
                {t('you have not added any address')}
              </Typography>
              <Button color="primary" variant="contained">
                {t('add address')}
              </Button>
            </Box>
          </Box>
        ) : (
          <Divider />
        )}
      </Box>
    </Box>
  )
}

export default AddressBook
