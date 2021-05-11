import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Typography,
  Card,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { useGetStyles } from './styles'
import { DepositDetail } from './index'
import Active from './Active'

interface DepositTableProps {
  depositDetails: DepositDetail[]
  // onClick: () => void
}

const DepositTable: React.FC<DepositTableProps> = ({ depositDetails }) => {
  const { classes } = useGetStyles()
  const { t } = useTranslation('common')
  const onClick = () => {
    // link to vote / deposit page
  }

  const columns = [
    {
      label: 'depositor',
    },
    {
      label: 'amount',
      alignRight: true,
    },
    {
      label: 'time',
      alignRight: true,
    },
  ]

  return (
    <Card>
      <Box m={4} style={{ position: 'relative' }}>
        <Typography className={classes.title} variant="h4">
          {t('deposit')}
        </Typography>
        <Active status="deposit" onClick={onClick} className={classes.deposit} />
      </Box>

      <Box m={4} mt={0}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {columns.map((column) => {
                return (
                  <TableCell
                    key={column.label}
                    className={classes.table__label}
                    align={column.alignRight ? 'right' : 'inherit'}
                  >
                    <Typography variant="subtitle1">{t(column.label)}</Typography>
                  </TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {depositDetails.map((d) => {
              return (
                <TableRow className={classes.tableRow}>
                  <TableCell className={classes.tableCell}>
                    <Box className={classes.box} display="flex" alignItems="center">
                      <Avatar
                        className={classes.validatorAvatar}
                        alt={d.depositor.name}
                        src={d.depositor.image}
                      />
                      <Typography className={classes.ellipsisText}>{d.depositor.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="subtitle1">{d.amount}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="subtitle1">{d.time}</Typography>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Box>
    </Card>
  )
}

export default DepositTable
