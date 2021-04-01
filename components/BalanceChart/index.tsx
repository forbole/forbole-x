import { Box, Button, Card, Typography, useTheme } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import format from 'date-fns/format'
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from 'recharts'
import { useGeneralContext } from '../../contexts/GeneralContext'
import useStyles from './styles'
import { formatCrypto, formatCurrency } from '../../misc/utils'

interface BalanceChartProps {
  title: string
  subtitle: string
  data: any[]
  ticks: React.ReactText[]
}

const BalanceChart: React.FC<BalanceChartProps> = ({ title, subtitle, data, ticks }) => {
  const classes = useStyles()
  const { t, lang } = useTranslation('common')
  const { currency } = useGeneralContext()
  const theme = useTheme()

  return (
    <>
      <Box mt={1} mb={2} display="flex" justifyContent="space-between" alignItems="flex-end">
        <Box>
          <Typography variant="h3" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h6">{subtitle}</Typography>
        </Box>
        <Box display="flex">
          <Button className={classes.timeRangeButton} size="small" variant="outlined">
            {t('day')}
          </Button>
          <Button className={classes.timeRangeButton} size="small" variant="outlined">
            {t('week')}
          </Button>
          <Button className={classes.timeRangeButton} size="small" variant="outlined">
            {t('month')}
          </Button>
        </Box>
      </Box>
      <Box height={theme.spacing(31)}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke={theme.palette.grey[100]} />
            <XAxis
              dataKey="time"
              tickFormatter={(v) => format(v, 'd MMM')}
              type="number"
              ticks={ticks}
              domain={['dataMin', 'dataMax']}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => formatCrypto(v, '', lang, true)}
            />
            <Tooltip
              formatter={(v) => [formatCurrency(v, currency, lang, true)]}
              labelFormatter={(v) => format(v, 'd MMM h:ma')}
              contentStyle={{ backgroundColor: theme.palette.background.paper }}
            />
            <Line
              type="monotone"
              dataKey="balance"
              stroke={theme.palette.success.main}
              dot={false}
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </>
  )
}

export default BalanceChart
