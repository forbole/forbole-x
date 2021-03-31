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
import { ArrowDropDown } from '@material-ui/icons'
import { useRouter } from 'next/router'
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

interface ValidatorInfo extends Validator {
  location: {
    name: string
    image: string
  }
  selfRatio: number
  status: string
  isActive: boolean
  address: string
}

interface ValidatorsTableProps {
  validators: ValidatorInfo[]
  crypto: any
  account: Account
  onRowClick?: (validatorInfo: ValidatorInfo) => void
}

const DelegateValidatorsTable: React.FC<ValidatorsTableProps> = ({
  validators,
  crypto,
  account,
  onRowClick,
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
  const [validatorData, setvalidatorData] = React.useState(
    validators.filter((x) => x.isActive === true)
  )
  const router = useRouter()

  const [align, setAlign] = React.useState('inherit')

  const setTabContent = (v) => {
    setCurrentTab(v)
    if (v === 0) {
      setvalidatorData(validators.filter((x) => x.isActive === true))
    }
    if (v === 2) {
      setAlign('right')
      setvalidatorData(validators)
    } else {
      setAlign('inherit')
    }
    if (v === 1) {
      setvalidatorData(validators.filter((x) => x.isActive === false))
    }
  }

  const { handleSort, state, handleRowClick } = useTableDefaultHook({
    data: validatorData,
    onRowClick,
  })

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
      label: 'votingPower',
      display: 'voting power',
      sort: true,
    },
    {
      label: 'selfRatio',
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
                          onClick={handleSort(column.label)}
                          IconComponent={ArrowDropDown}
                        >
                          {t(column.display)}
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
                      {t(column.display)}
                    </TableCell>
                  )
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {validatorData
                .slice(
                  state.page * state.rowsPerPage,
                  state.page * state.rowsPerPage + state.rowsPerPage
                )
                .map((v, i) => {
                  return (
                    <TableRow
                      key={v.name}
                      className={classes.tableRow}
                      onClick={() => {
                        router.push(`/validator/${v.address}`)
                      }}
                    >
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
