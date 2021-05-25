import { Box, Typography, useTheme } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { PieChart, Pie, Cell } from 'recharts'
import { useGetStyles } from './styles'
import Diagram from './Diagram'
import { VoteSummary } from './index'
import { formatCrypto } from '../../misc/utils'

interface VoteResultProps {
  voteSummary: VoteSummary
  crypto: Cryptocurrency
}

const VoteResult: React.FC<VoteResultProps> = ({ voteSummary, crypto }) => {
  const { classes } = useGetStyles()
  const { t, lang } = useTranslation('common')
  const theme = useTheme()

  const COLORS = ['#1EC490', '#FD565F', '#E0A111', '#379AFE']
  const displayData = () => {
    let totalVote = 0
    voteSummary.data.forEach((v) => {
      totalVote += v.value
    })
    if (totalVote > 0) {
      return {
        data: voteSummary.data,
        colors: COLORS,
      }
    }
    return {
      data: [
        {
          title: '',
          percentage: 1,
          value: 1,
        },
      ],
      colors: [theme.palette.grey[100]],
    }
  }

  return (
    <Box display="flex" mb={4}>
      <PieChart width={200} height={200}>
        <Pie
          data={displayData().data}
          startAngle={30}
          endAngle={-330}
          isAnimationActive={false}
          innerRadius="85%"
          outerRadius="100%"
          dataKey="value"
          labelLine={false}
          stroke="none"
          paddingAngle={3}
        >
          {displayData().data.map((_x: any, index: any) => (
            <Cell
              key={_x.value}
              fill={displayData().colors[index % displayData().colors.length]}
              cornerRadius={40}
            />
          ))}
        </Pie>
      </PieChart>
      <Box ml={4}>
        <Typography variant="subtitle1" className={classes.title}>
          {t('voted')}
        </Typography>
        <Typography variant="h4" className={classes.amount}>
          {formatCrypto(voteSummary.amount, crypto.name, lang)}
        </Typography>
        <Typography variant="subtitle1" className={classes.title}>
          {voteSummary.description}
        </Typography>
        <Box display="flex">
          <Box m={2}>
            <Diagram
              value={voteSummary.data[0].value}
              title={voteSummary.data[0].title}
              percentage={voteSummary.data[0].percentage}
              color={COLORS[0]}
              crypto={crypto}
            />
            <Diagram
              value={voteSummary.data[1].value}
              title={voteSummary.data[1].title}
              percentage={voteSummary.data[1].percentage}
              color={COLORS[1]}
              crypto={crypto}
            />
          </Box>
          <Box m={2}>
            <Diagram
              value={voteSummary.data[2].value}
              title={voteSummary.data[2].title}
              percentage={voteSummary.data[2].percentage}
              color={COLORS[2]}
              crypto={crypto}
            />
            <Diagram
              value={voteSummary.data[3].value}
              title={voteSummary.data[3].title}
              percentage={voteSummary.data[3].percentage}
              color={COLORS[3]}
              crypto={crypto}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default VoteResult
