import React from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Box, Typography, useTheme } from '@material-ui/core'
import useStyles from './styles'

interface ChartProp {
  rawData: {
    name: string
    value: number
  }[]
}
const Chart: React.FC<ChartProp> = ({ rawData }) => {
  const classes = useStyles()
  const data = []
  const [activeIndex, setActiveIndex] = React.useState(0)
  const theme = useTheme()
  const COLORS = [
    theme.palette.error,
    theme.palette.warning,
    theme.palette.success,
    theme.palette.info,
  ]

  rawData.forEach((d, i) => {
    const startAngle = i === 0 ? 0 : data[i - 1].endAngle
    const endAngle = startAngle + (360 * d.value) / 100
    const outerRadius = `${100 * (1 - 0.6 * (i / rawData.length))}%`
    data.push({
      ...d,
      startAngle,
      endAngle,
      outerRadius,
    })
  })
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
    <Box position="relative" height={theme.spacing(33.5)} maxWidth={theme.spacing(64)} mx="auto">
      <ResponsiveContainer width="100%" height="100%">
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
          background: 'red',
        }}
      >
        <Typography className={classes.percentText} variant="h2" gutterBottom>
          {data[activeIndex].value}%
        </Typography>
        <Typography>{data[activeIndex].name}</Typography>
      </Box>
    </Box>
  )
}

export default Chart
