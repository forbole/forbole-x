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
import { format, differenceInCalendarDays } from 'date-fns'
import ToIcon from '../../assets/images/icons/icon_arrow down_title.svg'
import useStyles from './styles'
import { formatTokenAmount, formatHeight } from '../../misc/utils'
import useIsMobile from '../../misc/useIsMobile'
import useIconProps from '../../misc/useIconProps'
import ValidatorAvatar from '../ValidatorAvatar'
import { useGeneralContext } from '../../contexts/GeneralContext'

interface RedelegationsProps {
  redelegations: Redelegation[]
  crypto: Cryptocurrency
}

const Redelegations: React.FC<RedelegationsProps> = ({ redelegations, crypto }) => {
  const classes = useStyles()
  const { t, lang } = useTranslation('common')
  const isMobile = useIsMobile()
  const { hideAmount } = useGeneralContext()

  return isMobile ? (
    <Table>
      <TableBody>
        {redelegations.map((r) => {
          return (
            <TableRow key={r.height} className={classes.tableRow}>
              <TableCell className={classes.tableCell}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography color="textSecondary">{t('from')}</Typography>
                  <ValidatorAvatar
                    crypto={crypto}
                    validator={r.fromValidator as Validator}
                    size="small"
                  />
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography color="textSecondary">{t('to')}</Typography>
                  <ValidatorAvatar
                    crypto={crypto}
                    validator={r.toValidator as Validator}
                    size="small"
                  />
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                  <Typography>{t('redelegated amount')}</Typography>
                  <Typography>
                    {formatTokenAmount(r.amount, { defaultUnit: crypto.name, lang, hideAmount })}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                  <Typography>{t('expected delivery')}</Typography>
                  <Typography>{format(r.completionDate, 'dd MMM yyyy, HH:mm:ss')}</Typography>
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
          {/* <TableCell className={classes.tableCell}>{t('height')}</TableCell> */}
          <TableCell className={classes.tableCell}>{t('from')}</TableCell>
          <TableCell className={classes.tableCell}>{t('redelegate to')}</TableCell>
          <TableCell className={classes.tableCell}>{t('redelegated amount')}</TableCell>
          <TableCell className={classes.tableCell}>{t('expected delivery')}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {redelegations.map((u) => {
          return (
            <TableRow key={u.height} className={classes.tableRow}>
              {/* <TableCell className={classes.tableCell}>
                <Typography color="primary">{formatHeight(u.height)}</Typography>
              </TableCell> */}

              <TableCell className={classes.tableCell}>
                <ValidatorAvatar
                  crypto={crypto}
                  validator={u.fromValidator as Validator}
                  size="small"
                />
              </TableCell>
              <TableCell className={classes.tableCell}>
                <ValidatorAvatar
                  crypto={crypto}
                  validator={u.toValidator as Validator}
                  size="small"
                />
              </TableCell>

              <TableCell className={classes.tableCell}>
                {formatTokenAmount(u.amount, { defaultUnit: crypto.name, lang, hideAmount })}
              </TableCell>
              <TableCell className={classes.tableCell}>
                <Box display="flex" alignItems="center">
                  {format(u.completionDate, 'dd MMM yyyy, HH:mm:ss')}
                  <Box ml={isMobile ? 0 : 2}>
                    <Typography color="secondary">
                      {differenceInCalendarDays(u.completionDate, new Date()) >= 1
                        ? t('in days', {
                            x: differenceInCalendarDays(u.completionDate, new Date()),
                          })
                        : t('in day', {
                            x: differenceInCalendarDays(u.completionDate, new Date()),
                          })}
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

export default Redelegations
