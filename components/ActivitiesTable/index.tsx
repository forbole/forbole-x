import { Box, Card, Tabs, Tab, Typography } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import TablePagination from '../TablePagination'
import { useGetStyles } from './styles'
import Row from './Row'

export interface Activity {
  ref: string
  date: string
  tab: string
  tag: string
  detail?: any
  amount?: number
}

export interface Account {
  name: string
  imageURL: string
}

interface ActivitiesTableProps {
  activities?: Activity[]
  account: Account
  crypto: Crypto
}

const ActivitiesTable: React.FC<ActivitiesTableProps> = ({ activities, crypto, account }) => {
  const { classes } = useGetStyles()
  const { t } = useTranslation('common')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [currentTab, setCurrentTab] = React.useState(0)
  const [activitiesCollection, setActivitiesCollection] = React.useState(activities)

  const tabs = [
    { label: 'all', count: activities.length },
    { label: 'transfer', count: activities.filter((x) => x.tab === 'transfer').length },
    { label: 'staking', count: activities.filter((x) => x.tab === 'staking').length },
    { label: 'distribution', count: activities.filter((x) => x.tab === 'distribution').length },
    { label: 'governance', count: activities.filter((x) => x.tab === 'governance').length },
    { label: 'slashing', count: activities.filter((x) => x.tab === 'slashing').length },
  ]

  const setTabContent = (v) => {
    setCurrentTab(v)
    if (v === 0) {
      setActivitiesCollection(activities)
    } else {
      setActivitiesCollection(activities.filter((x) => x.tab === tabs[v].label))
    }
  }

  return (
    <Card>
      <Box p={4}>
        <Tabs
          value={currentTab}
          classes={{ indicator: classes.tabIndicator }}
          onChange={(e, v) => setTabContent(v)}
        >
          {tabs.map((tab) => (
            <Tab key={tab.label} label={`${t(tab.label)} (${tab.count})`} />
          ))}
        </Tabs>
        <Box className={classes.table} mt={2}>
          {activitiesCollection.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((a, i) => (
            <Box key={`${a.ref}-${i}`}>
              <Box className={classes.rowHeader}>
                <span>{a.ref}</span>
                <Typography className={classes.typograph}>
                  {a.date}
                  <CheckCircleIcon className={classes.checkIcon} />
                </Typography>
              </Box>
              <Box className={classes.row}>
                <Row activity={a} account={account} crypto={crypto} />
              </Box>
            </Box>
          ))}
        </Box>
        <TablePagination
          page={page}
          rowsPerPage={rowsPerPage}
          rowsCount={activitiesCollection.length}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
        />
      </Box>
    </Card>
  )
}

export default ActivitiesTable
