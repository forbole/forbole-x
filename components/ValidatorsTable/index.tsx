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
  // useTheme,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
// import { LineChart, Line, YAxis } from 'recharts'
import React from 'react'
import get from 'lodash/get'
import MoreIcon from '../../assets/images/icons/icon_more.svg'
import TablePagination from '../TablePagination'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'
import { formatPercentage, formatTokenAmount } from '../../misc/utils'
import { useGeneralContext } from '../../contexts/GeneralContext'
import UndelegationDialog from '../UndelegateDialog'

interface ValidatorsTableProps {
  account: Account
  validators: Validator[]
  delegatedTokens: { [address: string]: Array<{ amount: string; denom: string }> }
  crypto: Cryptocurrency
  tokensPrices: TokenPrice[]
}

const ValidatorsTable: React.FC<ValidatorsTableProps> = ({
  account,
  validators,
  delegatedTokens,
  crypto,
  tokensPrices,
}) => {
  const classes = useStyles()
  const { t, lang } = useTranslation('common')
  // const themeStyle = useTheme()
  const iconProps = useIconProps()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [currentTab, setCurrentTab] = React.useState(0)
  const [managingValidator, setManagingValidator] = React.useState<Validator>()
  const { theme } = useGeneralContext()
  const [anchor, setAnchor] = React.useState<Element>()
  const [undelegating, setUndelegating] = React.useState(false)

  const tabs = [
    { label: 'delegations', rows: validators.filter((v) => !!v.delegated) },
    { label: 'redelegations', rows: [] }, // TODO
    { label: 'unbonding', rows: [] }, // TODO
  ]

  const totalVotingPower = React.useMemo(
    () => validators.map((v) => v.votingPower).reduce((a, b) => a + b, 0),
    [validators]
  )

  return (
    <Card className={classes.container}>
      <Box p={4}>
        <Tabs
          value={currentTab}
          classes={{ indicator: classes.tabIndicator }}
          onChange={(e, v) => setCurrentTab(v)}
          textColor={theme === 'light' ? 'primary' : 'inherit'}
        >
          {tabs.map((tab) => (
            <Tab key={tab.label} label={`${t(tab.label)} (${tab.rows.length})`} />
          ))}
        </Tabs>
        <Box className={classes.table} mt={2}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableCell}>{t('validator')}</TableCell>
                <TableCell className={classes.tableCell}>{t('commission')}</TableCell>
                <TableCell className={classes.tableCell}>{t('vp ratios')}</TableCell>
                <TableCell className={classes.tableCell}>{t('delegated amount')}</TableCell>
                {/* <TableCell className={classes.tableCell}>{t('amt ratio')}</TableCell> */}
                <TableCell className={classes.tableCell}>{t('reward')}</TableCell>
                {/* <TableCell className={classes.tableCell}>{t('last 7 days')}</TableCell> */}
                <TableCell className={classes.tableCell}>{t('manage')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tabs[currentTab].rows
                .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                .map((v) => {
                  return (
                    <TableRow key={v.name} className={classes.tableRow}>
                      <TableCell className={classes.tableCell}>
                        <Box display="flex" alignItems="center">
                          <Avatar className={classes.validatorAvatar} alt={v.name} src={v.image} />
                          <Typography>{v.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {formatPercentage(v.commission, lang)}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {formatPercentage(v.votingPower / totalVotingPower, lang)}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {formatTokenAmount(v.delegated, crypto.name, lang)}
                      </TableCell>
                      {/* <TableCell className={classes.tableCell}>
                      {formatPercentage(v.amtRatio, lang)}
                    </TableCell> */}
                      <TableCell className={classes.tableCell}>
                        {formatTokenAmount(v.rewards, crypto.name, lang)}
                      </TableCell>
                      {/* <TableCell className={classes.tableCell}>
                      <Box my={-2}>
                        <LineChart
                          width={themeStyle.spacing(20)}
                          height={themeStyle.spacing(5)}
                          data={data}
                        >
                          <YAxis domain={['dataMin', 'dataMax']} hide />
                          <Line
                            type="monotone"
                            dataKey="balance"
                            stroke={
                              increasing
                                ? themeStyle.palette.success.main
                                : themeStyle.palette.error.main
                            }
                            dot={false}
                            strokeWidth={2}
                          />
                        </LineChart>
                      </Box>
                    </TableCell> */}
                      <TableCell className={classes.tableCell}>
                        <Box my={-2}>
                          <IconButton
                            onClick={(e) => {
                              setManagingValidator(v)
                              setAnchor(e.currentTarget)
                            }}
                          >
                            <MoreIcon {...iconProps} />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
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
        <MenuItem button>{t('delegate')}</MenuItem>
        <MenuItem button>{t('redelegate')}</MenuItem>
        <MenuItem
          button
          onClick={() => {
            setUndelegating(true)
            setAnchor(undefined)
          }}
        >
          {t('undelegate')}
        </MenuItem>
        <MenuItem button>{t('claim rewards')}</MenuItem>
      </Menu>
      {account && managingValidator ? (
        <UndelegationDialog
          account={account}
          validator={managingValidator}
          delegatedTokens={delegatedTokens[get(managingValidator, 'address', '')]}
          tokensPrices={tokensPrices}
          open={undelegating}
          onClose={() => {
            setManagingValidator(undefined)
            setUndelegating(false)
          }}
        />
      ) : null}
    </Card>
  )
}

export default ValidatorsTable
