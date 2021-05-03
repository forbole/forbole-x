import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Avatar,
  Typography,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { format, formatRelative } from 'date-fns'
import useStyles from './styles'
import { formatTokenAmount } from '../../misc/utils'

interface RedelegationsProps {
  redelegations: Redelegation[]
  crypto: Cryptocurrency
}

const Redelegations: React.FC<RedelegationsProps> = ({ redelegations, crypto }) => {
  const classes = useStyles()
  const { t, lang } = useTranslation('common')

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell className={classes.tableCell}>{t('height')}</TableCell>
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
              <TableCell className={classes.tableCell}>{u.height}</TableCell>
              <TableCell className={classes.tableCell}>
                <Box display="flex" alignItems="center">
                  <Avatar
                    className={classes.validatorAvatar}
                    alt={u.fromValidator.name}
                    src={u.fromValidator.image}
                  />
                  <Typography>{u.fromValidator.name}</Typography>
                </Box>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <Box display="flex" alignItems="center">
                  <Avatar
                    className={classes.validatorAvatar}
                    alt={u.toValidator.name}
                    src={u.toValidator.image}
                  />
                  <Typography>{u.toValidator.name}</Typography>
                </Box>
              </TableCell>
              <TableCell className={classes.tableCell}>
                {formatTokenAmount(u.amount, crypto.name, lang)}
              </TableCell>
              <TableCell className={classes.tableCell}>
                <Box display="flex" alignItems="center">
                  {format(u.completionDate, 'dd MMM yyyy, HH:mm:ss')}
                  <Box ml={2}>
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

export default Redelegations
