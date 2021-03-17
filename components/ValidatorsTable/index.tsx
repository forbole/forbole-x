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
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import TablePagination from '../TablePagination'
import useStyles from './styles'

interface ValidatorsTableProps {
  validators: Validator[]
  crypto: Crypto
}

const formatPercentage = (percent: number, lang: string) =>
  new Intl.NumberFormat(lang, {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(percent)

const formatCrypto = (amount: number, unit: string, lang: string) =>
  `${new Intl.NumberFormat(lang, {
    signDisplay: 'never',
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  }).format(amount)} ${unit}`

const ValidatorsTable: React.FC<ValidatorsTableProps> = ({ validators, crypto }) => {
  const classes = useStyles()
  const { t, lang } = useTranslation('common')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [currentTab, setCurrentTab] = React.useState(0)

  const tabs = [
    { label: 'delegations', count: 100 },
    { label: 'redelegations', count: 18 },
    { label: 'unbonding', count: 8 },
  ]

  return (
    <Card>
      <Box p={4}>
        <Tabs
          value={currentTab}
          classes={{ indicator: classes.tabIndicator }}
          onChange={(e, v) => setCurrentTab(v)}
        >
          {tabs.map((tab) => (
            <Tab key={tab.label} label={`${t(tab.label)} (${tab.count})`} />
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
                <TableCell className={classes.tableCell}>{t('amt ratio')}</TableCell>
                <TableCell className={classes.tableCell}>{t('reward')}</TableCell>
                <TableCell className={classes.tableCell}>{t('last 7 days')}</TableCell>
                <TableCell className={classes.tableCell}>{t('manage')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {validators.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((v) => (
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
                    {formatPercentage(v.vpRatios, lang)}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {formatCrypto(v.delegatedAmount, crypto.name, lang)}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {formatPercentage(v.amtRatio, lang)}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {formatCrypto(v.reward, crypto.name, lang)}
                  </TableCell>
                  <TableCell className={classes.tableCell} />
                  <TableCell className={classes.tableCell} />
                </TableRow>
              ))}
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

export default ValidatorsTable
