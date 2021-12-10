import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Button,
  Typography,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
// import { LineChart, Line, YAxis } from 'recharts'
import React from 'react'
import useStyles from './styles'
import { formatPercentage, formatTokenAmount } from '../../misc/utils'
import useIsMobile from '../../misc/useIsMobile'
import ValidatorAvatar from '../ValidatorAvatar'

interface DelegationsProps {
  isAddressDetail?: boolean
  validators: Validator[]
  crypto: Cryptocurrency
  onManageClick(e: any, v: Validator): void
}

const Delegations: React.FC<DelegationsProps> = ({
  validators,
  crypto,
  onManageClick,
  isAddressDetail,
}) => {
  const classes = useStyles()
  const { t, lang } = useTranslation('common')
  // const themeStyle = useTheme()
  const isMobile = useIsMobile()

  return isMobile ? (
    <Table>
      <TableBody>
        {validators.map((v) => {
          return (
            <TableRow key={v.name} className={classes.tableRow}>
              <TableCell className={classes.tableCell}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <ValidatorAvatar crypto={crypto} validator={v} withCommission />
                  <Button variant="contained" color="primary" onClick={(e) => onManageClick(e, v)}>
                    {t('manage')}
                  </Button>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                  <Typography>{t('delegated')}</Typography>
                  <Typography>{formatTokenAmount(v.delegated, crypto.name, lang)}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                  <Typography>{t('rewards')}</Typography>
                  <Typography>{formatTokenAmount(v.rewards, crypto.name, lang)}</Typography>
                </Box>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  ) : (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell className={classes.tableCell}>{t('validator')}</TableCell>
          <TableCell className={classes.tableCell}>{t('commissions')}</TableCell>
          <TableCell className={classes.tableCell}>{t('delegated amount')}</TableCell>
          {/* <TableCell className={classes.tableCell}>{t('amt ratio')}</TableCell> */}
          <TableCell className={classes.tableCell}>{t('rewards')}</TableCell>
          {/* <TableCell className={classes.tableCell}>{t('last 7 days')}</TableCell> */}
          {isAddressDetail ? null : (
            <TableCell className={classes.tableCell}>{t('manage')}</TableCell>
          )}
        </TableRow>
      </TableHead>
      <TableBody>
        {validators.map((v) => {
          return (
            <TableRow key={v.name} className={classes.tableRow}>
              <TableCell className={classes.tableCell}>
                <ValidatorAvatar crypto={crypto} validator={v} size="small" />
              </TableCell>
              <TableCell className={classes.tableCell}>
                {formatPercentage(v.commission, lang)}
              </TableCell>
              <TableCell className={classes.tableCell}>
                {formatTokenAmount(v.delegated, crypto.name, lang)}
              </TableCell>
              {/* <TableCell className={classes.tableCell}>
                {formatPercentage(v.amtRatio, lang)}
              </TableCell> */}
              <TableCell className={classes.tableCell}>
                {formatTokenAmount(v.rewards, crypto.name, lang)}
              </TableCell>
              {isAddressDetail ? null : (
                <TableCell className={classes.tableCell}>
                  <Box my={-2}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={(e) => onManageClick(e, v)}
                    >
                      {t('manage')}
                    </Button>
                  </Box>
                </TableCell>
              )}
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default Delegations
