import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Avatar,
  Typography,
  Card,
  Tabs,
  Tab,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import TablePagination from '../TablePagination'
import useStyles from './styles'
import {
  Delegate,
  Redelegate,
  CreatValidator,
  Deposit,
  EditValidator,
  Multisend,
  Send,
  SetRewardAddress,
  SubmitProposal,
  VerifyInvariant,
  Vote,
  Withdraw,
  WithdrawReward,
} from './components'
import Undelegate from './components/Un\bdelegate'

interface ActivitiesTableProps {
  activities: any
  account: any
  crypto: Crypto
}

const formatPercentage = (percent: number, lang: string) =>
  new Intl.NumberFormat(lang, {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(percent)

const formatCrypto = (amount: number, unit: string, lang: string) =>
  `${new Intl.NumberFormat(lang, {
    signDisplay: 'never',
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  }).format(amount)} ${unit}`

const ActivitiesTable: React.FC<ActivitiesTableProps> = ({ activities, crypto, account }) => {
  const classes = useStyles()
  const { t, lang } = useTranslation('common')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [currentTab, setCurrentTab] = React.useState(0)
  console.log('activities', activities)

  const tabs = [
    { label: 'delegations', count: 100 },
    { label: 'redelegations', count: 18 },
    { label: 'unbonding', count: 8 },
  ]

  return (
    <Card>
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
        <Box className={classes.table} mt={2}>
          {/* <div key={`${date}-${i}`}> */}
          {activities.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((a, i) => (
            <div key={`${a.ref}-${i}`}>
              <div className={classes.event__header}>
                <span>{a.ref}</span>
                <p>
                  {a.date}
                  <CheckCircleIcon className={classes.checkIcon} />
                </p>
              </div>
              <div className={classes.event__body_container}>
                <div className={classes.body_container__info}>
                  {a.tag === 'delegate' ? (
                    <Delegate account={account} activity={a} />
                  ) : (
                    <Redelegate account={account} activity={a} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </Box>
        <TablePagination
          page={page}
          rowsPerPage={rowsPerPage}
          rowsCount={activities.length}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
        />
      </Box>
    </Card>
  )
}

export default ActivitiesTable
