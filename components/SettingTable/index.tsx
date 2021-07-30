import React from 'react'
import { Box, Tabs, Tab } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import useStyles from './styles'
import GeneralTable from './GeneralTable'
import HelpTable from './HelpTable'
import FeedbackTable from './FeedbackTable'
import AboutTable from './AboutTable'

export type FavAddress = {
  address: string
  crypto: string
  moniker: string
  note?: string
  img?: string
}

const SettingTable: React.FC = () => {
  const classes = useStyles()
  const { t } = useTranslation('common')
  const [currentTab, setCurrentTab] = React.useState(0)

  const tabs = [
    { label: 'general' },
    { label: 'help' },
    { label: 'feedback' },
    { label: 'follow us' },
    { label: 'about' },
  ]

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
      {currentTab === 0 ? <GeneralTable /> : null}
      {currentTab === 1 ? <HelpTable /> : null}
      {currentTab === 2 ? <FeedbackTable /> : null}
      {currentTab === 4 ? <AboutTable /> : null}
    </>
  )
}

export default SettingTable
