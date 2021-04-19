import React from 'react'
import { Box, Typography, Card, Tabs, Tab } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import { useGetStyles } from './styles'
import { useValidatorTableHook } from './hooks'
import ValidatorsTable from './Table01'

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
  rank?: number
}

interface DelegateValidatorsTableProps {
  validators: ValidatorInfo[]
  crypto: Cryptocurrency
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
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  )
}

const DelegateValidatorsTable: React.FC<DelegateValidatorsTableProps> = ({
  validators,
  crypto,
  account,
}) => {
  const { classes } = useGetStyles()
  const { t } = useTranslation('common')
  const [currentTab, setCurrentTab] = React.useState(0)

  const { mappedData, mappedFavData } = useValidatorTableHook({
    data: validators,
  })

  const tabs = [
    { label: 'active validators', count: mappedData.active?.length || 0 },
    { label: 'inactive validators', count: mappedData.nonActive?.length || 0 },
    { label: 'favourite', count: mappedFavData?.length || 0 },
  ]

<<<<<<< HEAD
  // add random rank
  const addRanks = (list: ValidatorInfo[]) => {
    let i = 1
    list.forEach((x) => {
      // eslint-disable-next-line no-param-reassign
      x.rank = i
      console.log('map', i)
      i += 1
    })
    return list
  }
  console.log('mappedData.active', mappedData.active)
  console.log('addRanks(mappedData.active)', addRanks(mappedData.active))

=======
>>>>>>> eeddf48be319b3cb7d2e6d442fea36fd8d82e303
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
              validators={mappedData.active || []}
              crypto={crypto}
              account={account}
              initialActiveSort="moniker"
            />
          </TabPanel>
          <TabPanel value={currentTab} index={1}>
            <ValidatorsTable
              validators={mappedData.nonActive || []}
              crypto={crypto}
              account={account}
              initialActiveSort="moniker"
            />
          </TabPanel>
          <TabPanel value={currentTab} index={2}>
            <ValidatorsTable
              validators={mappedFavData}
              crypto={crypto}
              account={account}
              alignRight
              initialActiveSort="moniker"
            />
          </TabPanel>
        </Box>
      </Box>
    </Card>
  )
}

export default DelegateValidatorsTable
