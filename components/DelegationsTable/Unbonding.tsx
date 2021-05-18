import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Typography,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { format, formatRelative } from 'date-fns'
import useStyles from './styles'
import { formatTokenAmount } from '../../misc/utils'
import useIsMobile from '../../misc/useIsMobile'
import ValidatorAvatar from '../ValidatorAvatar'

interface UnbondingProps {
  unbondings: Unbonding[]
  crypto: Cryptocurrency
}

const Unbonding: React.FC<UnbondingProps> = ({ unbondings, crypto }) => {
  const classes = useStyles()
  const { t, lang } = useTranslation('common')
  const isMobile = useIsMobile()

  return (
    <Table>
      <TableHead>
        <TableRow>
          {isMobile ? null : <TableCell className={classes.tableCell}>{t('height')}</TableCell>}
          <TableCell className={classes.tableCell}>{t('validator')}</TableCell>
          <TableCell className={classes.tableCell}>{t('unbonded amount')}</TableCell>
          <TableCell className={classes.tableCell}>{t('expected delivery')}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {unbondings.map((u) => {
          return (
            <TableRow key={u.height} className={classes.tableRow}>
              {isMobile ? null : <TableCell className={classes.tableCell}>{u.height}</TableCell>}
              <TableCell className={classes.tableCell}>
                <ValidatorAvatar
                  crypto={crypto}
                  validator={u.validator as Validator}
                  size="small"
                />
              </TableCell>
              <TableCell className={classes.tableCell}>
                {formatTokenAmount(u.amount, crypto.name, lang)}
              </TableCell>
              <TableCell className={classes.tableCell}>
                <Box display="flex" alignItems="center">
                  {isMobile ? null : format(u.completionDate, 'dd MMM yyyy, HH:mm:ss')}
                  <Box ml={isMobile ? 0 : 2}>
                    <Typography color="primary">
                      {formatRelative(u.completionDate, new Date())}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default Unbonding
