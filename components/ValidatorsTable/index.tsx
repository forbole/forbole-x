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
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import { LineChart, Line, YAxis } from 'recharts'
import React from 'react'
import MoreIcon from '../../assets/images/icons/icon_more.svg'
import TablePagination from '../TablePagination'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'
import { formatPercentage, formatCrypto } from '../../misc/utils'

interface ValidatorsTableProps {
  validators: Validator[]
  crypto: Cryptocurrency
}

const ValidatorsTable: React.FC<ValidatorsTableProps> = ({ validators, crypto }) => {
  const classes = useStyles()
  const { t, lang } = useTranslation('common')
  const theme = useTheme()
  const iconProps = useIconProps()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [currentTab, setCurrentTab] = React.useState(0)

  const tabs = [
    { label: 'delegations', count: 100 },
    { label: 'redelegations', count: 18 },
    { label: 'unbonding', count: 8 },
  ]

  return (
    <Card className={classes.container}>
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
              {validators.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((v) => {
                // TODO: fetch data from backend
                const now = Date.now()
                const usdBalance = 626323.54
                const delta = new Array(7).fill(null).map(() => (Math.random() - 0.5) / 10)
                const data = []
                delta.forEach((d, i) => {
                  data.unshift({
                    time: now - i * 3600000 * 24,
                    balance: i === 0 ? usdBalance : data[0].balance * (1 + d),
                  })
                })
                const lastBalance = data[6].balance
                const firstBalance = data[0].balance
                const increasing = lastBalance - firstBalance > 0
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
                    <TableCell className={classes.tableCell}>{formatPercentage(0, lang)}</TableCell>
                    <TableCell className={classes.tableCell}>
                      {formatCrypto(v.delegatedAmount, crypto.name, lang)}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {formatPercentage(v.amtRatio, lang)}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {formatCrypto(v.reward, crypto.name, lang)}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <Box my={-2}>
                        <LineChart width={theme.spacing(20)} height={theme.spacing(5)} data={data}>
                          <YAxis domain={['dataMin', 'dataMax']} hide />
                          <Line
                            type="monotone"
                            dataKey="balance"
                            stroke={
                              increasing ? theme.palette.success.main : theme.palette.error.main
                            }
                            dot={false}
                            strokeWidth={2}
                          />
                        </LineChart>
                      </Box>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <Box my={-2}>
                        <IconButton>
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
          rowsCount={validators.length}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
        />
      </Box>
    </Card>
  )
}

export default ValidatorsTable
