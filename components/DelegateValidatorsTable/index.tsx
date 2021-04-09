import React from 'react'
import {
  // Table,
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
import { useGeneralContext } from '../../contexts/GeneralContext'
import { useTableDefaultHook } from './hooks'
import ValidatorsTable from './table'

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
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  }
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
  const { favValidators, addFavValidators, deleteFavValidators, currency } = useGeneralContext()
  const [validatorData, setvalidatorData] = React.useState(
    []
    // validators.filter((x) => x.isActive === true)
  )
  const router = useRouter()

  const [align, setAlign] = React.useState('inherit')

  const setTabContent = (v) => {
    setCurrentTab(v)
    if (v === 0) {
      // setvalidatorData(validators.filter((x) => x.isActive === true))
      setAlign('inherit')
    }
    if (v === 2) {
      setAlign('right')
      // setvalidatorData(validators)
    }
    if (v === 1) {
      // setvalidatorData(validators.filter((x) => x.isActive === false))
      setAlign('inherit')
    }
  }
  const mapData: any = []
  validators.forEach((x: any) => {
    const type = x.isActive ? 'active' : 'nonActive'
    if (mapData[type]) {
      mapData[type].push(x)
    } else {
      mapData[type] = [x]
    }
  })

  // console.log('mapData', mapData)

  const { handleSort, state, handleRowClick } = useTableDefaultHook({
    data: validatorData,
    onRowClick,
  })

  const tabs = [
    { label: 'active validators', count: 100 },
    { label: 'inactive validators', count: 18 },
    { label: 'favourite', count: 8 },
  ]

  console.log('validatorData', validatorData)
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
  const [error, setError] = React.useState('')
  // console.log('error', error)

  const toggleFav = (address) =>
    React.useCallback(async () => {
      if (favValidators.findIndex((fav) => fav === address) !== -1) {
        console.log(
          '!=',
          favValidators.findIndex((fav) => fav === address)
        )
        // deleteFavValidators(address)
        try {
          await deleteFavValidators(address)
        } catch (err) {
          setError(err.message)
        }
      } else {
        try {
          await addFavValidators(address)
        } catch (err) {
          setError(err.message)
        }
      }
    }, [addFavValidators, deleteFavValidators])
  // console.log('favValidators', favValidators)

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
          <TabPanel value={currentTab} index={0}>
            <ValidatorsTable
              validators={mapData.active ? mapData.active : []}
              // validators={validators}
              crypto={crypto}
              account={account}
              onRowClick={onRowClick}
            />
          </TabPanel>
          <TabPanel value={currentTab} index={1}>
            <ValidatorsTable
              validators={mapData.nonActive}
              crypto={crypto}
              account={account}
              onRowClick={onRowClick}
            />
          </TabPanel>
          <TabPanel value={currentTab} index={2}>
            <ValidatorsTable
              validators={validators}
              crypto={crypto}
              account={account}
              onRowClick={onRowClick}
            />
          </TabPanel>
          {/* <Table>
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
                      // onClick={() => {
                      //   router.push(`/validator/${v.address}`)
                      // }}
                    >
                      <TableCell className={classes.tableCell}>
                        1
                        <IconButton
                          onClick={toggleFav(v.address)}
                          className={classes.star}
                          // style={{ background: 'red' }}
                        >
                          {favValidators.findIndex((address) => address === v.address) !== -1 ? (
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
                      <TableCell className={classes.tableCell}>{v.selfRatio}</TableCell>
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
          </Table> */}
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
