import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  IconButton,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
// import { LineChart, Line, YAxis } from 'recharts'
import React from 'react'
import MoreIcon from '../../assets/images/icons/icon_more.svg'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'
import { formatPercentage, formatTokenAmount } from '../../misc/utils'
import useIsMobile from '../../misc/useIsMobile'
import ValidatorAvatar from '../ValidatorAvatar'

interface DelegationsProps {
  validators: Validator[]
  crypto: Cryptocurrency
  onManageClick(e: any, v: Validator): void
}

const Delegations: React.FC<DelegationsProps> = ({ validators, crypto, onManageClick }) => {
  const classes = useStyles()
  const { t, lang } = useTranslation('common')
  // const themeStyle = useTheme()
  const iconProps = useIconProps()
  const isMobile = useIsMobile()

  const totalVotingPower = React.useMemo(
    () => validators.map((v) => v.votingPower).reduce((a, b) => a + b, 0),
    [validators]
  )

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell className={classes.tableCell}>{t('validator')}</TableCell>
          {isMobile ? null : (
            <TableCell className={classes.tableCell}>{t('commissions')}</TableCell>
          )}
          {isMobile ? null : <TableCell className={classes.tableCell}>{t('vp ratios')}</TableCell>}
          <TableCell className={classes.tableCell}>{t('delegated amount')}</TableCell>
          {/* <TableCell className={classes.tableCell}>{t('amt ratio')}</TableCell> */}
          <TableCell className={classes.tableCell}>{t('rewards')}</TableCell>
          {/* <TableCell className={classes.tableCell}>{t('last 7 days')}</TableCell> */}
          <TableCell className={classes.tableCell}>{t('manage')}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {validators.map((v) => {
          return (
            <TableRow key={v.name} className={classes.tableRow}>
              <TableCell className={classes.tableCell}>
                <ValidatorAvatar crypto={crypto} validator={v} size="small" />
              </TableCell>
              {isMobile ? null : (
                <TableCell className={classes.tableCell}>
                  {formatPercentage(v.commission, lang)}
                </TableCell>
              )}
              {isMobile ? null : (
                <TableCell className={classes.tableCell}>
                  {formatPercentage(v.votingPower / totalVotingPower, lang)}
                </TableCell>
              )}
              <TableCell className={classes.tableCell}>
                {formatTokenAmount(v.delegated, crypto.name, lang)}
              </TableCell>
              {/* <TableCell className={classes.tableCell}>
                {formatPercentage(v.amtRatio, lang)}
              </TableCell> */}
              <TableCell className={classes.tableCell}>
                {formatTokenAmount(v.rewards, crypto.name, lang)}
              </TableCell>
              {/* <TableCell className={classes.tableCell}>
                <Box my={-2}>
                  <LineChart
                    width={themeStyle.spacing(20)}
                    height={themeStyle.spacing(5)}
                    data={data}
                  >
                    <YAxis domain={['dataMin', 'dataMax']} hide />
                    <Line
                      type="monotone"
                      dataKey="balance"
                      stroke={
                        increasing
                          ? themeStyle.palette.success.main
                          : themeStyle.palette.error.main
                      }
                      dot={false}
                      strokeWidth={2}
                    />
                  </LineChart>
                </Box>
              </TableCell> */}
              <TableCell className={classes.tableCell}>
                <Box my={-2}>
                  <IconButton onClick={(e) => onManageClick(e, v)}>
                    <MoreIcon {...iconProps} />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default Delegations
