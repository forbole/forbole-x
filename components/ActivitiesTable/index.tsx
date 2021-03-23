import { Box, Card, Tabs, Tab } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import TablePagination from '../TablePagination'
import useStyles from './styles'
import {
  Delegate,
  Redelegate,
  CreateValidator,
  Deposit,
  Unjail,
  Fund,
  EditValidator,
  Multisend,
  Send,
  SetRewardAddress,
  SubmitProposal,
  VerifyInvariant,
  Vote,
  Undelegate,
  WithdrawReward,
} from './components'

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

interface ActivityProps {
  activity?: Activity
  account: Account
  crypto: Crypto
}

export const formatCrypto = (amount: number, unit: string, lang: string) =>
  `${new Intl.NumberFormat(lang, {
    signDisplay: 'never',
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  }).format(amount)} ${unit}`

export const Activity: React.FC<ActivityProps> = (activity) => {
  const { tag } = activity.activity
  if (tag === 'delegate') {
    return (
      <Delegate account={activity.account} activity={activity.activity} crypto={activity.crypto} />
    )
  }
  if (tag === 'undelegate') {
    return (
      <Undelegate
        account={activity.account}
        activity={activity.activity}
        crypto={activity.crypto}
      />
    )
  }
  if (tag === 'redelegate') {
    return (
      <Redelegate
        account={activity.account}
        activity={activity.activity}
        crypto={activity.crypto}
      />
    )
  }
  if (tag === 'deposit') {
    return (
      <Deposit account={activity.account} activity={activity.activity} crypto={activity.crypto} />
    )
  }
  if (tag === 'withdrawReward') {
    return (
      <WithdrawReward
        account={activity.account}
        activity={activity.activity}
        crypto={activity.crypto}
      />
    )
  }
  if (tag === 'multisend') {
    return (
      <Multisend account={activity.account} activity={activity.activity} crypto={activity.crypto} />
    )
  }
  if (tag === 'createValidator') {
    return <CreateValidator account={activity.account} activity={activity.activity} />
  }
  if (tag === 'fund') {
    return <Fund account={activity.account} activity={activity.activity} crypto={activity.crypto} />
  }
  if (tag === 'verifyInvariant') {
    return <VerifyInvariant account={activity.account} activity={activity.activity} />
  }
  if (tag === 'vote') {
    return <Vote account={activity.account} activity={activity.activity} />
  }
  if (tag === 'unjail') {
    return <Unjail account={activity.account} activity={activity.activity} />
  }
  if (tag === 'submitProposal') {
    return <SubmitProposal account={activity.account} activity={activity.activity} />
  }
  if (tag === 'editValidator') {
    return <EditValidator account={activity.account} activity={activity.activity} />
  }
  if (tag === 'send') {
    return <Send account={activity.account} activity={activity.activity} crypto={activity.crypto} />
  }
  if (tag === 'setRewardAddress') {
    return <SetRewardAddress activity={activity.activity} />
  }
  return null
}

const ActivitiesTable: React.FC<ActivitiesTableProps> = ({ activities, crypto, account }) => {
  const classes = useStyles()
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
                  <Activity activity={a} account={account} crypto={crypto} />
                </div>
              </div>
            </div>
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
