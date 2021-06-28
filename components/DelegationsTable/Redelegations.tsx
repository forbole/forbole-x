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
import { format, formatRelative, compareAsc } from 'date-fns'
import ToIcon from '../../assets/images/icons/icon_arrow down_title.svg'
import useStyles from './styles'
import { formatTokenAmount } from '../../misc/utils'
import useIsMobile from '../../misc/useIsMobile'
import useIconProps from '../../misc/useIconProps'
import ValidatorAvatar from '../ValidatorAvatar'

interface RedelegationsProps {
  redelegations: Redelegation[]
  crypto: Cryptocurrency
}

const Redelegations: React.FC<RedelegationsProps> = ({ redelegations, crypto }) => {
  const classes = useStyles()
  const { t, lang } = useTranslation('common')
  const isMobile = useIsMobile()
  const iconProps = useIconProps()

  return (
    <Table>
      <TableHead>
        <TableRow>
          {isMobile ? null : <TableCell className={classes.tableCell}>{t('height')}</TableCell>}
          {isMobile ? (
            <TableCell className={classes.tableCell}>{t('redelegate')}</TableCell>
          ) : (
            <>
              <TableCell className={classes.tableCell}>{t('from')}</TableCell>
              <TableCell className={classes.tableCell}>{t('redelegate to')}</TableCell>
            </>
          )}
          <TableCell className={classes.tableCell}>{t('redelegated amount')}</TableCell>
          <TableCell className={classes.tableCell}>{t('expected delivery')}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {redelegations.map((u) => {
          return (
            <TableRow key={u.height} className={classes.tableRow}>
              {isMobile ? null : <TableCell className={classes.tableCell}>{u.height}</TableCell>}
              {isMobile ? (
                <TableCell className={classes.tableCell}>
                  <ValidatorAvatar
                    crypto={crypto}
                    validator={u.fromValidator as Validator}
                    size="small"
                  />
                  <Box display="flex" justifyContent="center" my={1}>
                    <ToIcon {...iconProps} />
                  </Box>
                  <ValidatorAvatar
                    crypto={crypto}
                    validator={u.toValidator as Validator}
                    size="small"
                  />
                </TableCell>
              ) : (
                <>
                  {compareAsc(u.completionDate, new Date(Date.now())) === -1 ? null : (
                    <>
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
                    </>
                  )}
                </>
              )}
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default Redelegations
