import { Box, Card, Typography, useTheme } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import useStyles from './styles'
import SectoredByButton from './SectoredByButton'
import { SectoredBy, sectoredByTypes } from './types'
import { useAssetDistributionChart } from './hooks'

interface AssetDistributionChartProps {
  accounts: Account[]
}

const AssetDistributionChart: React.FC<AssetDistributionChartProps> = ({ accounts }) => {
  const classes = useStyles()
  const { t } = useTranslation('common')
  const theme = useTheme()
  const [sectoredBy, setSectoredBy] = React.useState<SectoredBy>(sectoredByTypes[0])
  const [activeIndex, setActiveIndex] = React.useState(0)
  // TODO: fetch data from backend
  console.log('accounts', accounts)

  const { delegationInfo } = useAssetDistributionChart(accounts)

  const COLORS = [
    theme.palette.error,
    theme.palette.warning,
    theme.palette.success,
    theme.palette.info,
  ]

  const data = []

  delegationInfo.delegation.forEach((d, i) => {
    const startAngle = i === 0 ? 0 : data[i - 1].endAngle
    const endAngle = startAngle + (360 * d.amount) / 100
    const outerRadius = `${100 * (1 - 0.6 * (i / delegationInfo.delegation.length))}%`
    data.push({
      ...d,
      startAngle,
      endAngle,
      outerRadius,
    })
  })
  console.log('delegationInfo.delegation', delegationInfo.delegation)

  const { top, left } = React.useMemo(() => {
    const midAngle =
      (((data[activeIndex].startAngle + data[activeIndex].endAngle) / 2) * Math.PI) / 180
    const radius = (1.27 * Number(data[activeIndex].outerRadius.replace('%', ''))) / 2
    return {
      top: `calc(50% - ${Math.sin(midAngle) * radius}px)`,
      left: `calc(30% + ${Math.cos(midAngle) * radius}px)`,
    }
  }, [activeIndex, data])

  return (
    <Card className={classes.container}>
      <Box display="flex" flexDirection="column" alignItems="center" my={2}>
        <Typography variant="h1">{t('asset distribution')}</Typography>
        <SectoredByButton sectoredBy={sectoredBy} onChange={setSectoredBy} />
      </Box>
      <Box position="relative" height={theme.spacing(33.5)} maxWidth={theme.spacing(64)} mx="auto">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {data.map((d, i) => (
              <Pie
                key={d.validatorAddress}
                cx="30%"
                outerRadius={d.outerRadius}
                data={[d]}
                startAngle={d.startAngle}
                endAngle={d.endAngle}
                dataKey="amount"
                animationBegin={200 * i}
                animationDuration={200}
                animationEasing="linear"
              >
                <Cell
                  onMouseEnter={() => setActiveIndex(i)}
                  fill={COLORS[i % COLORS.length][activeIndex === i ? 'light' : 'main']}
                />
              </Pie>
            ))}
          </PieChart>
        </ResponsiveContainer>
        <Box
          className={classes.divider}
          style={{
            top,
            left,
          }}
        >
          <Typography className={classes.percentText} variant="h2" gutterBottom>
            {data[activeIndex].value}
          </Typography>
          <Typography>{data[activeIndex].validatorMoniker}</Typography>
        </Box>
      </Box>
    </Card>
  )
}

export default AssetDistributionChart
