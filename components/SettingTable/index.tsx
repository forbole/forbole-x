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
  Paper,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import useStyles from './styles'
import { useGeneralContext } from '../../contexts/GeneralContext'
import MoreIcon from '../../assets/images/icons/icon_more.svg'
import useIconProps from '../../misc/useIconProps'
import EditAddressDialog from './EditAddressDialog'
import GeneralTable from './GeneralTable'
import HelpTable from './HelpTable'
import cryptocurrencies from '../../misc/cryptocurrencies'
import currencies from '../../misc/currencies'

export type FavAddress = {
  address: string
  crypto: string
  moniker: string
  note?: string
  img?: string
}

const SettingTable: React.FC = () => {
  const { favAddresses } = useGeneralContext()
  const classes = useStyles()
  const { t } = useTranslation('common')
  const iconProps = useIconProps()
  const [currentTab, setCurrentTab] = React.useState(0)
  const theme = useTheme()
  const [anchor, setAnchor] = React.useState<Element>()
  const router = useRouter()
  const [editAddressOpen, setEditAddressOpen] = React.useState(false)
  const [deleteAddressOpen, setDeleteAddressOpen] = React.useState(false)
  const [addAddressOpen, setAddAddressOpen] = React.useState(false)

  const onClose = React.useCallback(() => setAnchor(undefined), [setAnchor])
  const tabs = [
    { label: 'general' },
    { label: 'help' },
    { label: 'feedback' },
    { label: 'follow us' },
    { label: 'about' },
  ]

  const cryptocurrenciesType = Object.keys(cryptocurrencies)
  // const tabs = React.useMemo(() => {
  //   cryptocurrenciesType.forEach((x) => {
  //     tabList.push({ label: x, address: favAddresses.filter((v) => v.crypto === x) })
  //   })
  //   return tabList
  // }, [favAddresses, cryptocurrencies])

  const [currentAddress, setCurrentAddress] = React.useState<FavAddress>({
    address: '',
    crypto: '',
    moniker: '',
  })

  function TabPanel(props) {
    const { children, value, index, ...other } = props

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    )
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }

  return (
    <>
      <Tabs
        value={currentTab}
        classes={{ indicator: classes.tabIndicator, root: classes.tab }}
        onChange={(e, v) => setCurrentTab(v)}
      >
        {tabs.map((tab) => (
          <Tab key={tab.label} label={t(tab.label)} />
        ))}
      </Tabs>
      <Box pt={3} />
      <TabPanel value={currentTab} index={0}>
        <GeneralTable />
      </TabPanel>
      <TabPanel value={currentTab} index={1}>
        <HelpTable />
      </TabPanel>
    </>
  )
}

export default SettingTable
