import React from 'react'
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
  useTheme,
  IconButton,
  TableSortLabel,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import TablePagination from '../TablePagination'
import ActiveStatus from './Active'
import InActiveStatus from './InActive'
import { useGetStyles } from './styles'
import useIconProps from '../../misc/useIconProps'
import { formatPercentage, formatCrypto } from '../../misc/utils'
import StarIcon from '../../assets/images/icons/icon_star.svg'
import StarFilledIcon from '../../assets/images/icons/icon_star_marked.svg'
import { useWalletsContext } from '../../contexts/WalletsContext'
import { useTableDefaultHook } from './hooks'
import { ArrowDropDown } from '@material-ui/icons'

interface ValidatorInfo extends Validator {
  location: {
    name: string
    image: string
  }
  selfRatio: number
  status: string
  isActive: boolean
}

interface ValidatorsTableProps {
  validators: ValidatorInfo[]
  crypto: any
  account: Account
}

const DelegateValidatorsTable: React.FC<ValidatorsTableProps> = ({
  validators,
  crypto,
  account,
}) => {
  // const crypto = cryptocurrencies[account.crypto]
  const { classes } = useGetStyles()
  const { t, lang } = useTranslation('common')
  const theme = useTheme()
  const iconProps = useIconProps()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [currentTab, setCurrentTab] = React.useState(0)
  const { updateAccount } = useWalletsContext()
  const [data, setData] = React.useState(validators.filter((x) => x.isActive === true))

  const [align, setAlign] = React.useState('inherit')

  const setTabContent = (v) => {
    setCurrentTab(v)
    if (v === 0) {
      setData(validators.filter((x) => x.isActive === true))
    }
    if (v === 2) {
      setAlign('right')
      // setData(validators.filter((x) => x.isActive === false))
      setData(validators)
    } else {
      setAlign('inherit')
    }
    if (v === 1) {
      setData(validators.filter((x) => x.isActive === false))
    }
  }

  const {
    // handleChangePage,
    // handleChangeRowsPerPage,
    // handleRowClick,
    handleSort,
    state,
  } = useTableDefaultHook({
    rowsPerPageCount: rowsPerPage,
    // onRowClick,
    // initialActiveSort,
    data,
  })

  console.log('data', data)

  const tabs = [
    { label: 'active validators', count: 100 },
    { label: 'inactive validators', count: 18 },
    { label: 'favourite', count: 8 },
  ]
  const columns = [
    {
      label: 'rank',
      display: 'rank',
      sort: true,
    },
    {
      label: 'moniker',
      display: 'moniker',
      sort: true,
    },
    {
      label: 'location',
      display: 'location',
    },
    {
      label: 'voting power',
      display: 'voting power',
      sort: true,
    },
    {
      label: 'self ratio',
      display: 'self ratio',
      sort: true,
    },
    {
      label: 'commission',
      display: 'commission',
      sort: true,
    },
    {
      label: 'status',
      display: 'status',
    },
  ]
  const toggleFav = React.useCallback(() => {
    updateAccount(account.address, { fav: !account.fav })
  }, [account.address, account.fav, updateAccount])

  return (
    <Card className={classes.container}>
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
          <Table>
            <TableHead>
              {/* <TableRow>
                <TableCell className={classes.tableCell}>{t('rank')}</TableCell>
                <TableCell className={classes.tableCell}>{t('moniker')}</TableCell>
                <TableCell className={classes.tableCell}>{t('location')}</TableCell>
                <TableCell className={classes.tableCell}>{t('voting power')}</TableCell>
                <TableCell className={classes.tableCell}>{t('self ratio')}</TableCell>
                <TableCell className={classes.tableCell}>{t('commission')}</TableCell>
                <TableCell align={align} className={classes.tableCell}>
                  <Typography className={classes.status}>{t('status')}</Typography>
                </TableCell>
                </TableRow> */}
              <TableRow>
                {columns.map((column) => {
                  if (column.sort) {
                    return (
                      <TableCell key={column.label}>
                        <TableSortLabel
                          className={classes.table__label}
                          // active={state.activeSort === column.label}
                          direction={
                            state.activeSort === column.label ? state.sortDirection : 'asc'
                          }
                          onClick={handleSort('self ratio')}
                          IconComponent={ArrowDropDown}
                        >
                          {column.display}
                        </TableSortLabel>
                      </TableCell>
                    )
                  }
                  return (
                    <TableCell
                      key={column.label}
                      className={classes.table__label}
                      // align={column.align as any}
                    >
                      {column.display}
                    </TableCell>
                  )
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {data.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((v) => { */}
              {data
                .slice(
                  state.page * state.rowsPerPage,
                  state.page * state.rowsPerPage + state.rowsPerPage
                )
                .map((v, i) => {
                  // TODO: fetch data from backend
                  // const now = Date.now()
                  // const usdBalance = 626323.54
                  // const delta = new Array(7).fill(null).map(() => (Math.random() - 0.5) / 10)
                  // const data = []
                  // delta.forEach((d, i) => {
                  //   data.unshift({
                  //     time: now - i * 3600000 * 24,
                  //     balance: i === 0 ? usdBalance : data[0].balance * (1 + d),
                  //   })
                  // })
                  return (
                    <TableRow key={v.name} className={classes.tableRow}>
                      <TableCell className={classes.tableCell}>
                        1
                        <IconButton onClick={toggleFav} className={classes.star}>
                          {account.fav ? (
                            <StarFilledIcon {...iconProps} fill={theme.palette.warning.light} />
                          ) : (
                            <StarIcon {...iconProps} />
                          )}
                        </IconButton>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        <Box display="flex" alignItems="center">
                          <Avatar className={classes.validatorAvatar} alt={v.name} src={v.image} />
                          <Typography>{v.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        <Box display="flex" alignItems="center">
                          <Avatar
                            className={classes.flagAvatar}
                            variant="rounded"
                            alt={v.location.name}
                            src={v.location.image}
                          />
                          <Typography>{v.location.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {formatCrypto(v.delegatedAmount, crypto.name, lang)}(
                        {formatPercentage(v.vpRatios, lang)})
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {/* {formatPercentage(v.selfRatio, lang)} */}
                        {v.selfRatio}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {formatPercentage(v.commission, lang)}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {v.isActive ? (
                          <ActiveStatus status={v.status} align={align} />
                        ) : (
                          <InActiveStatus status={v.status} align={align} />
                        )}
                        {/* <Box mx={-20} className={classes.activeStatus}>
                        <Typography>
                          <a className={classes.button}>{t('delegate')}</a>
                        </Typography>
                      </Box> */}
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
          rowsCount={validators.length}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
        />
      </Box>
    </Card>
  )
}

export default DelegateValidatorsTable
