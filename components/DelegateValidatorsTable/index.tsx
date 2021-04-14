import React from 'react'
import { Box, Typography, Card, Tabs, Tab } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import { useGetStyles } from './styles'
import { useValidatorTableHook } from './hooks'
import ValidatorsTable from './Table'

export interface ValidatorInfo extends Validator {
  location: {
    name: string
    image: string
  }
  selfRatio: number
  status: string
  isActive: boolean
  address: string
  fav?: boolean
}

interface DelegateValidatorsTableProps {
  validators: ValidatorInfo[]
  crypto: Crypto
  account: Account
  onRowClick?: (validatorInfo: ValidatorInfo) => void
}

export interface TabPanelProps {
  children?: React.ReactNode
  dir?: string
  index: any
  value: any
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

const DelegateValidatorsTable: React.FC<DelegateValidatorsTableProps> = ({
  validators,
  crypto,
  account,
}) => {
  const { classes } = useGetStyles()
  const { t, lang } = useTranslation('common')
  const [currentTab, setCurrentTab] = React.useState(0)

  const { mapData, favValidatorList, addFavTag, mapFavList } = useValidatorTableHook({
    data: validators,
  })
  addFavTag()
  const mappedData = mapData()

  const tabs = [
    { label: 'active validators', count: mappedData.active.length || 0 },
    { label: 'inactive validators', count: mappedData.nonActive.length || 0 },
    { label: 'favourite', count: favValidatorList.length || 0 },
  ]

  return (
    <Card className={classes.container}>
      <Box p={4}>
        <Tabs
          value={currentTab}
          classes={{ indicator: classes.tabIndicator }}
          onChange={(e, v) => setCurrentTab(v)}
        >
          {tabs.map((tab) => (
            <Tab key={tab.label} label={`${t(tab.label)} (${tab.count})`} />
          ))}
        </Tabs>
        <Box mt={2} ml={-3} mr={-3}>
          <TabPanel value={currentTab} index={0}>
            <ValidatorsTable
              validators={mappedData.active}
              crypto={crypto}
              account={account}
              initialActiveSort="moniker"
              onToggle={mapFavList}
            />
          </TabPanel>
          <TabPanel value={currentTab} index={1}>
            <ValidatorsTable
              validators={mappedData.nonActive}
              crypto={crypto}
              account={account}
              initialActiveSort="moniker"
              onToggle={mapFavList}
            />
          </TabPanel>
          <TabPanel value={currentTab} index={2}>
            <ValidatorsTable
              validators={favValidatorList}
              crypto={crypto}
              account={account}
              alignRight
              initialActiveSort="moniker"
              onToggle={mapFavList}
            />
          </TabPanel>
        </Box>
      </Box>
    </Card>
  )
}

export default DelegateValidatorsTable
