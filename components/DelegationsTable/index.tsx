import { Box, Card, Tabs, Tab, Menu, MenuItem } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import get from 'lodash/get'
import TablePagination from '../TablePagination'
import useStyles from './styles'
import { useGeneralContext } from '../../contexts/GeneralContext'
import UndelegationDialog from '../UndelegateDialog'
import Delegations from './Delegations'
import Unbonding from './Unbonding'
import RedelegationDialog from '../RedelegateDialog'
import Redelegations from './Redelegations'
import DelegationDialog from '../DelegationDialog'
import ClaimRewardsDialog from '../WithdrawRewardsDialog'

interface DelegationsTableProps {
  account: Account
  validators: Validator[]
  unbondings: Unbonding[]
  redelegations: Redelegation[]
  delegatedTokens: { [address: string]: Array<{ amount: string; denom: string }> }
  crypto: Cryptocurrency
  availableTokens: any
}

const DelegationsTable: React.FC<DelegationsTableProps> = ({
  account,
  validators,
  unbondings,
  redelegations,
  delegatedTokens,
  crypto,
  availableTokens,
}) => {
  const classes = useStyles()
  const { t } = useTranslation('common')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [currentTab, setCurrentTab] = React.useState(0)
  const [managingValidator, setManagingValidator] = React.useState<Validator>()
  const { theme } = useGeneralContext()
  const [anchor, setAnchor] = React.useState<Element>()
  const [undelegating, setUndelegating] = React.useState(false)
  const [redelegating, setRedelegating] = React.useState(false)
  const [delegating, setDelegating] = React.useState(false)
  const [claimingRewards, setClaimingRewards] = React.useState(false)

  const tabs = [
    { label: 'delegations', rows: validators.filter((v) => !!v.delegated) },
    { label: 'redelegations', rows: redelegations },
    { label: 'unbonding', rows: unbondings },
  ]

  const rows = tabs[currentTab].rows.slice(page * rowsPerPage, (page + 1) * rowsPerPage)

  return (
    <Card className={classes.container}>
      <Box p={4}>
        <Tabs
          value={currentTab}
          classes={{ indicator: classes.tabIndicator }}
          variant="scrollable"
          onChange={(e, v) => setCurrentTab(v)}
          textColor={theme === 'light' ? 'primary' : 'inherit'}
        >
          {tabs.map((tab) => (
            <Tab key={tab.label} label={`${t(tab.label)} (${tab.rows.length})`} />
          ))}
        </Tabs>
        <Box className={classes.table} mt={2}>
          {tabs[currentTab].label === 'delegations' ? (
            <Delegations
              validators={rows as Validator[]}
              crypto={crypto}
              onManageClick={(e, v) => {
                setManagingValidator(v)
                setAnchor(e.currentTarget)
              }}
            />
          ) : null}
          {tabs[currentTab].label === 'redelegations' ? (
            <Redelegations redelegations={rows as Redelegation[]} crypto={crypto} />
          ) : null}
          {tabs[currentTab].label === 'unbonding' ? (
            <Unbonding unbondings={rows as Unbonding[]} crypto={crypto} />
          ) : null}
        </Box>
        <TablePagination
          page={page}
          rowsPerPage={rowsPerPage}
          rowsCount={tabs[currentTab].rows.length}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
        />
      </Box>
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
        onClose={() => {
          setManagingValidator(undefined)
          setAnchor(undefined)
        }}
      >
        <MenuItem
          button
          onClick={() => {
            setDelegating(true)
            setAnchor(undefined)
          }}
        >
          {t('delegate')}
        </MenuItem>
        <MenuItem
          button
          onClick={() => {
            setRedelegating(true)
            setAnchor(undefined)
          }}
        >
          {t('redelegate')}
        </MenuItem>
        <MenuItem
          button
          onClick={() => {
            setUndelegating(true)
            setAnchor(undefined)
          }}
        >
          {t('undelegate')}
        </MenuItem>
        <MenuItem
          button
          onClick={() => {
            setClaimingRewards(true)
            setAnchor(undefined)
          }}
        >
          {t('withdraw')}
        </MenuItem>
      </Menu>
      {account && managingValidator && availableTokens ? (
        <>
          <UndelegationDialog
            account={account}
            validator={managingValidator}
            delegatedTokens={delegatedTokens[get(managingValidator, 'address', '')]}
            tokensPrices={availableTokens.tokens_prices}
            open={undelegating}
            onClose={() => {
              setManagingValidator(undefined)
              setUndelegating(false)
            }}
          />
          <RedelegationDialog
            account={account}
            fromValidator={managingValidator}
            validators={validators}
            delegatedTokens={delegatedTokens[get(managingValidator, 'address', '')]}
            tokensPrices={availableTokens.tokens_prices}
            open={redelegating}
            onClose={() => {
              setManagingValidator(undefined)
              setRedelegating(false)
            }}
          />
          <DelegationDialog
            open={delegating}
            onClose={() => {
              setManagingValidator(undefined)
              setDelegating(false)
            }}
            account={account}
            validators={validators}
            defaultValidator={managingValidator}
            availableTokens={availableTokens}
          />
          <ClaimRewardsDialog
            open={claimingRewards}
            onClose={() => setClaimingRewards(false)}
            account={account}
            tokensPrices={availableTokens.tokens_prices}
            validators={validators.filter((v) => !!v.delegated)}
            preselectedValidatorAddresses={[managingValidator.address]}
          />
        </>
      ) : null}
    </Card>
  )
}

export default DelegationsTable
