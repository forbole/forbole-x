import { Box, Button, CircularProgress, Typography, useTheme } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { addDays, addHours, format, addYears } from 'date-fns'
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from 'recharts'
import get from 'lodash/get'
import { useGeneralContext } from '../../contexts/GeneralContext'
import useStyles from './styles'
import { formatCrypto, formatCurrency } from '../../misc/utils'
import { CustomTheme } from '../../misc/theme'

const now = new Date()

interface DateRange {
  title: string
  format: string
  timestamps: number[]
  isDefault?: boolean
}

export const dateRanges: DateRange[] = [
  {
    title: 'day',
    format: 'HH:mm',
    timestamps: new Array(24).fill(null).map((_a, i) => addHours(now, -1 * i).getTime()),
  },
  {
    title: 'week',
    format: 'd MMM',
    timestamps: new Array(7).fill(null).map((_a, i) => addDays(now, -1 * i).getTime()),
    isDefault: true,
  },
  {
    title: 'month',
    format: 'd MMM',
    timestamps: new Array(30).fill(null).map((_a, i) => addDays(now, -1 * i).getTime()),
  },
  {
    title: 'year',
    format: 'd MMM',
    timestamps: new Array(10).fill(null).map((_a, i) => addYears(now, -1 * i).getTime()),
  },
]

interface BalanceChartProps {
  title: string
  subtitle: string
  data: any[]
  crypto?: string
  onDateRangeChange?(dateRange: DateRange): void
  loading?: boolean
  hideChart?: boolean
}

const BalanceChart: React.FC<BalanceChartProps> = ({
  title,
  subtitle,
  data,
  crypto,
  onDateRangeChange,
  loading,
  hideChart,
}) => {
  const { t, lang } = useTranslation('common')
  const { currency } = useGeneralContext()
  const theme: CustomTheme = useTheme()
  const [currentDateRange, setCurrentDateRange] = React.useState(
    dateRanges.find((d) => d.isDefault)
  )
  const classes = useStyles(currentDateRange.title)

  return (
    <>
      <Box mt={1} mb={2} display="flex" justifyContent="space-between" alignItems="flex-end">
        <Box>
          <Typography variant="h3" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h6">{subtitle}</Typography>
        </Box>
        {hideChart ? null : (
          <Box display="flex">
            {dateRanges.map((d) => (
              <Button
                key={d.title}
                className={classes.timeRangeButton}
                size="small"
                variant="outlined"
                style={{
                  color:
                    currentDateRange.title === d.title
                      ? theme.palette.dataChangeButton.clicked.text
                      : theme.palette.dataChangeButton.unClicked?.text || 'inherit',
                  background:
                    currentDateRange.title === d.title
                      ? theme.palette.dataChangeButton.clicked.background
                      : 'inherit',
                  borderColor:
                    currentDateRange.title === d.title
                      ? theme.palette.dataChangeButton.clicked.border
                      : theme.palette.dataChangeButton.unClicked?.border || 'inherit',
                }}
                onClick={() => {
                  setCurrentDateRange(d)
                  if (onDateRangeChange) {
                    onDateRangeChange(d)
                  }
                }}
              >
                {t(d.title)}
              </Button>
            ))}
          </Box>
        )}
      </Box>
      {hideChart ? null : (
        <Box position="relative" height={theme.spacing(31)}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid stroke={theme.palette.grey[100]} />
              <XAxis
                dataKey="timestamp"
                tickFormatter={(v) => format(v, currentDateRange.format)}
                type="number"
                ticks={currentDateRange.timestamps}
                domain={['dataMin', 'dataMax']}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                yAxisId="balance"
                dataKey="balance"
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => formatCurrency(v, currency, lang, true, true)}
                type="number"
                domain={['dataMin', 'dataMax']}
              />
              <Tooltip
                formatter={(v, i) => [
                  i === 'balance'
                    ? formatCurrency(v, currency, lang, true)
                    : formatCrypto(v, crypto, lang),
                ]}
                labelFormatter={(v) => format(v, 'd MMM h:ma')}
                contentStyle={{ backgroundColor: theme.palette.background.paper }}
              />
              <Line
                type="monotone"
                yAxisId="balance"
                dataKey="balance"
                stroke={theme.palette.success.main}
                dot={false}
                strokeWidth={3}
              />
              {get(data, '[0].amount') ? (
                <>
                  <YAxis
                    yAxisId="amount"
                    dataKey="amount"
                    orientation="right"
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => formatCrypto(v, crypto, lang, true, true)}
                    type="number"
                    domain={['dataMin', 'dataMax']}
                  />
                  <Line
                    yAxisId="amount"
                    type="monotone"
                    dataKey="amount"
                    stroke={theme.palette.primary.main}
                    dot={false}
                    strokeWidth={3}
                  />
                </>
              ) : null}
            </LineChart>
          </ResponsiveContainer>
          {loading ? (
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              display="flex"
              justifyContent="center"
              alignItems="center"
              bgcolor={theme.palette.translucent}
            >
              <CircularProgress />
            </Box>
          ) : null}
        </Box>
      )}
    </>
  )
}

export default BalanceChart
