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
  Tabs,
  Tab,
  Link,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { useGetStyles } from './styles'
import { VoteDetail } from './index'
import { useGeneralContext } from '../../contexts/GeneralContext'
import TablePagination from '../TablePagination'
import { formatCrypto, formatPercentage } from '../../misc/utils'

interface DepositTableProps {
  voteDetails: VoteDetail[]
  crypto: Cryptocurrency
}

const VoteTable: React.FC<DepositTableProps> = ({ voteDetails, crypto }) => {
  const { classes } = useGetStyles()
  const { t, lang } = useTranslation('common')
  const [currentTab, setCurrentTab] = React.useState(0)
  const { theme } = useGeneralContext()

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const tabs = [
    { label: 'all votes', rows: voteDetails },
    { label: 'yes', rows: voteDetails.filter((v) => v.answer === 'yes') },
    { label: 'no', rows: voteDetails.filter((v) => v.answer === 'no') },
    { label: 'veto', rows: voteDetails.filter((v) => v.answer === 'veto') },
    { label: 'abstain', rows: voteDetails.filter((v) => v.answer === 'abstain') },
    { label: 'absence', rows: voteDetails.filter((v) => v.answer === 'absence') },
  ]

  const columns = [
    {
      label: 'voter',
    },
    {
      label: 'voting power',
      alignRight: true,
    },
    {
      label: 'voting power percentage',
      alignRight: true,
    },
    {
      label: 'voting power override',
      alignRight: true,
    },
    {
      label: 'answer',
      alignRight: true,
    },
  ]

  return (
    <Card>
      <Box>
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
            {tabs[currentTab].rows.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((v) => {
              return (
                <TableRow className={classes.tableRow}>
                  <TableCell className={classes.tableCell}>
                    <Link
                      href={`${crypto.blockExplorerBaseUrl}/accounts/${v.voter.address}`}
                      target="_blank"
                    >
                      <Box display="flex" alignItems="center">
                        <Avatar
                          className={classes.validatorAvatar}
                          alt={v.voter.name}
                          src={v.voter.image}
                        />
                        <Typography className={classes.ellipsisText}>
                          {v.voter.name || v.voter.address}
                        </Typography>
                      </Box>
                    </Link>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="subtitle1">
                      {formatCrypto(v.votingPower, crypto.name, lang)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="subtitle1">
                      {formatPercentage(v.votingPowerPercentage, lang)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="subtitle1">
                      {formatPercentage(v.votingPowerOverride, lang)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right" className={classes[v.answer]}>
                    <Typography variant="subtitle1">{t(v.answer)}</Typography>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <TablePagination
          page={page}
          rowsPerPage={rowsPerPage}
          rowsCount={tabs[currentTab].rows.length}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
        />
      </Box>
    </Card>
  )
}

export default VoteTable
