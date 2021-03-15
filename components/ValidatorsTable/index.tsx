import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Avatar,
  Typography,
  TableFooter,
  TablePagination,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
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

const ValidatorsTable: React.FC<ValidatorsTableProps> = ({ validators }) => {
  const classes = useStyles()
  const { t, lang } = useTranslation('common')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(0)
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>{t('validator')}</TableCell>
          <TableCell>{t('commission')}</TableCell>
          <TableCell>{t('vp ratios')}</TableCell>
          <TableCell>{t('delegated amount')}</TableCell>
          <TableCell>{t('amt ratio')}</TableCell>
          <TableCell>{t('reward')}</TableCell>
          <TableCell>{t('last 7 days')}</TableCell>
          <TableCell>{t('manage')}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {validators.map((v) => (
          <TableRow key={v.name} className={classes.tableRow}>
            <TableCell>
              <Box display="flex" alignItems="center">
                <Avatar className={classes.validatorAvatar} alt={v.name} src={v.image} />
                <Typography>{v.name}</Typography>
              </Box>
            </TableCell>
            <TableCell>{formatPercentage(v.commission, lang)}</TableCell>
            <TableCell>{formatPercentage(v.vpRatios, lang)}</TableCell>
            <TableCell>{formatCrypto(v.delegatedAmount, crypto.name, lang)}</TableCell>
            <TableCell>{formatPercentage(v.amtRatio, lang)}</TableCell>
            <TableCell>{formatCrypto(v.reward, crypto.name, lang)}</TableCell>
            <TableCell />
            <TableCell />
          </TableRow>
        ))}
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={validators.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={(e, p) => setPage(p)}
              onChangeRowsPerPage={(e) => setRowsPerPage(Number(e.target.value))}
            />
          </TableRow>
        </TableFooter>
      </TableBody>
    </Table>
  )
}

export default ValidatorsTable
