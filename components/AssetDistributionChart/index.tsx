import { Box, Button, Card, Typography, useTheme } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import format from 'date-fns/format'
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import useStyles from './styles'
import SectoredByButton from './SectoredByButton'
import { SectoredBy, sectoredByTypes } from './types'

interface AssetDistributionChartProps {}

const AssetDistributionChart: React.FC<AssetDistributionChartProps> = () => {
  const classes = useStyles()
  const { t, lang } = useTranslation('common')
  const theme = useTheme()
  const [sectoredBy, setSectoredBy] = React.useState<SectoredBy>(sectoredByTypes[0])
  // TODO: fetch data from backend
  const rawData = [
    { name: 'Forbole', value: 35 },
    { name: 'Binance Staking', value: 18 },
    { name: 'DokiaCapital', value: 12 },
    { name: '🐠stake.fish', value: 10 },
    { name: 'CCN', value: 10 },
    { name: 'Sikka', value: 8 },
    { name: 'Zero Knowledge Validator (ZKV)', value: 7 },
  ]
  const COLORS = [
    theme.palette.error.main,
    theme.palette.warning.main,
    theme.palette.success.main,
    theme.palette.info.main,
  ]

  const data = []
  rawData.forEach((d, i) => {
    const startAngle = i === 0 ? 0 : data[i - 1].endAngle
    const endAngle = startAngle + (360 * d.value) / 100
    const outerRadius = `${100 * (1 - 0.6 * ((i + 1) / rawData.length))}%`
    data.push({ ...d, startAngle, endAngle, outerRadius })
  })
  // TODO: show label on mouse enter
  return (
    <Card className={classes.container}>
      <Box display="flex" flexDirection="column" alignItems="center" my={2}>
        <Typography variant="h1">{t('asset distribution')}</Typography>
        <SectoredByButton sectoredBy={sectoredBy} onChange={setSectoredBy} />
      </Box>
      <ResponsiveContainer width="100%" aspect={1.5}>
        <PieChart>
          {data.map((d, i) => (
            <Pie
              key={d.name}
              cx="30%"
              outerRadius={d.outerRadius}
              data={[d]}
              startAngle={d.startAngle}
              endAngle={d.endAngle}
              dataKey="value"
              // onMouseEnter={}
            >
              <Cell fill={COLORS[i % COLORS.length]} />
            </Pie>
          ))}
        </PieChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default AssetDistributionChart
