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
import { useGeneralContext } from '../../contexts/GeneralContext'
import { useTableDefaultHook } from './hooks'
import DelegationDialog from '../DelegateDialog'
import InfoPopover from './InfoPopover'

interface ValidatorsTableProps {
  validators: Validator[]
  crypto: any
  account: Account
  onToggle?: any
  alignRight?: boolean
  initialActiveSort?: string
  initialSortDirection?: 'asc' | 'desc'
  pagination?: {
    rowsPerPage: number | undefined
  }
}

const ValidatorsTable: React.FC<ValidatorsTableProps> = ({
  validators,
  crypto,
  account,
  alignRight,
  pagination,
  initialActiveSort,
  initialSortDirection,
}) => {
  const { classes } = useGetStyles()
  const { t, lang } = useTranslation('common')
  const theme = useTheme()
  const iconProps = useIconProps()
  const { addFavValidators, deleteFavValidators, favValidators } = useGeneralContext()
  const [delegateDialogOpen, setDelegateDialogOpen] = React.useState(false)
  const router = useRouter()

  const totalVotingPower = React.useMemo(
    () => validators.map((v) => v.votingPower).reduce((a, b) => a + b, 0),
    [validators]
  )

  const { handleChangePage, handleChangeRowsPerPage, handleSort, state } = useTableDefaultHook({
    data: validators,
    rowsPerPageCount: pagination?.rowsPerPage,
    initialActiveSort,
    initialSortDirection,
  })

  const columns = [
    {
      label: 'rank',
      display: 'rank',
      sort: true,
    },
    {
      label: 'name',
      display: 'moniker',
      sort: true,
    },
    // {
    //   label: 'location',
    //   display: 'location',
    // },
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
      lableAlign: alignRight,
      detail: 'status popover detail',
    },
  ]

  const toggleFav = (validator: Validator) => {
    if (favValidators.includes(validator.address)) {
      deleteFavValidators(validator.address)
    } else {
      addFavValidators(validator.address)
    }
  }

  return (
    <Box mt={2}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {columns.map((column) => {
              if (column.sort) {
                return (
                  <TableCell key={column.label}>
                    <TableSortLabel
                      className={classes.table__label}
                      active={state.activeSort === column.label}
                      direction={state.activeSort === column.label ? state.sortDirection : 'asc'}
                      onClick={handleSort(column.label)}
                      IconComponent={ArrowDropDown}
                    >
                      {column.display ? t(column.display) : ''}
                    </TableSortLabel>
                  </TableCell>
                )
              }
              return (
                <TableCell key={column.label} className={classes.table__label}>
                  <Box display="flex" alignItems="center">
                    {column.display ? t(column.label) : ''}
                    {column.label === 'status' ? (
                      <InfoPopover detail={t(column.detail)} className={classes.popover} />
                    ) : null}
                  </Box>
                </TableCell>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {state.data
            .slice(
              state.page * state.rowsPerPage,
              state.page * state.rowsPerPage + state.rowsPerPage
            )
            .map((v) => {
              return (
                <TableRow key={v.address} className={classes.tableRow}>
                  <TableCell className={classes.tableCell}>
                    <Box
                      display="flex"
                      alignItems="center"
                      width={theme.spacing(8)}
                      justifyContent="space-between"
                    >
                      {v.rank}
                      <IconButton onClick={() => toggleFav({ ...v })}>
                        {favValidators.includes(v.address) ? (
                          <StarFilledIcon {...iconProps} fill={theme.palette.warning.light} />
                        ) : (
                          <StarIcon {...iconProps} />
                        )}
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <Box
                      className={classes.box}
                      display="flex"
                      alignItems="center"
                      onClick={() => {
                        router.push(`/validator/${v.address}`)
                      }}
                    >
                      <Avatar className={classes.validatorAvatar} alt={v.name} src={v.image} />
                      <Typography className={classes.ellipsisText}>{v.name}</Typography>
                    </Box>
                  </TableCell>
                  {/* <TableCell className={classes.tableCell}>
                    <Box display="flex" alignItems="center">
                      <Avatar
                        className={classes.flagAvatar}
                        variant="rounded"
                        alt={v.location.name}
                        src={v.location.image}
                      />
                      <Typography>{v.location.name}</Typography>
                    </Box>
                  </TableCell> */}
                  <TableCell className={classes.tableCell}>
                    {formatCrypto(v.votingPower, crypto.name, lang)} (
                    {formatPercentage(v.votingPower / totalVotingPower, lang)})
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {formatPercentage(v.selfRatio, lang)}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {formatPercentage(v.commission, lang)}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {v.isActive ? (
                      <ActiveStatus status={v.status} onClick={() => setDelegateDialogOpen(true)} />
                    ) : (
                      <InActiveStatus status={v.status} alignRight={alignRight} />
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
        </TableBody>
      </Table>
      <TablePagination
        page={state.page}
        rowsPerPage={state.rowsPerPage}
        rowsCount={validators.length}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {/* <DelegationDialog
        open={delegateDialogOpen}
        onClose={() => setDelegateDialogOpen(false)}
        account={account}
        validators={validators}
      /> */}
    </Box>
  )
}

export default ValidatorsTable
