import React from 'react'
import { Box, Card, Tabs, Tab } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import { useGetStyles } from './styles'
import ValidatorsTable from './Table'
import { useGeneralContext } from '../../contexts/GeneralContext'

interface DelegateValidatorsTableProps {
  validators: Validator[]
  crypto: Cryptocurrency
  account: Account
  onRowClick?: (validatorInfo: Validator) => void
}

const DelegateValidatorsTable: React.FC<DelegateValidatorsTableProps> = ({
  validators,
  crypto,
  account,
}) => {
  const { favValidators } = useGeneralContext()
  const { classes } = useGetStyles()
  const { t } = useTranslation('common')
  const [currentTab, setCurrentTab] = React.useState(0)

  const tabs = React.useMemo(
    () => [
      {
        label: 'active validators',
        validators: validators.filter((v) => v.isActive),
      },
      {
        label: 'inactive validators',
        validators: validators.filter((v) => !v.isActive),
      },
      {
        label: 'favourite',
        validators: validators.filter((v) => favValidators.includes(v.address)),
      },
    ],
    [validators, favValidators]
  )

  return (
    <Card className={classes.container}>
      <Box p={4}>
        <Tabs
          value={currentTab}
          classes={{ indicator: classes.tabIndicator }}
          onChange={(e, v) => setCurrentTab(v)}
        >
          {tabs.map((tab) => (
            <Tab key={tab.label} label={`${t(tab.label)} (${tab.validators.length})`} />
          ))}
        </Tabs>
        <ValidatorsTable
          validators={tabs[currentTab].validators}
          crypto={crypto}
          account={account}
          initialActiveSort="vpRatios"
          initialSortDirection="desc"
        />
      </Box>
    </Card>
  )
}

export default DelegateValidatorsTable
