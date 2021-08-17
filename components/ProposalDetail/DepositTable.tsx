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
import Active from './ActiveStatus'
import { formatTokenAmount } from '../../misc/utils'
import DepositDialog from '../DepositDialog'

interface DepositTableProps {
  proposal: Proposal
  crypto: Cryptocurrency
  tag: string
  network: Chain
}

const DepositTable: React.FC<DepositTableProps> = ({ tag, proposal, crypto, network }) => {
  const { classes } = useGetStyles()
  const { t, lang } = useTranslation('common')
  const [depositDialogOpen, setDepositDialogOpen] = React.useState(false)
  const onClick = () => {
    setDepositDialogOpen(true)
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
        {tag === 'deposit' ? (
          <Active status="deposit" onClick={onClick} className={classes.deposit} />
        ) : null}
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
            {proposal.depositDetails.map((d, i) => {
              return (
                <TableRow className={classes.tableRow} key={i}>
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
                    <Typography variant="subtitle1">
                      {formatTokenAmount(d.amount, crypto.name, lang)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="subtitle1">{d.time}</Typography>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <DepositDialog
          proposal={proposal}
          network={network}
          open={depositDialogOpen}
          onClose={() => setDepositDialogOpen(false)}
        />
      </Box>
    </Card>
  )
}

export default DepositTable
