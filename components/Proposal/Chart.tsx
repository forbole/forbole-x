import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Typography,
  Card,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { useGetStyles } from './styles'
import { DepositDetail } from './index'

interface InActiveCardProps {
  // depositDetails: DepositDetail[]
  // onClick: () => void
}

const Chart: React.FC = () => {
  const { classes } = useGetStyles()
  const { t } = useTranslation('common')
  const data = {
    chart: {
      subTitle: 'Voted (43.78%)',
      title: '81,674,736.604642 ATOM',
      amount: '(~81M of ~186M ATOM)',
      colors: ['#28C989', '#1C86FC', '#FD248C', '#FD7522'],
      data: [
        {
          title: 'Yes',
          percentage: '30.66%',
          value: 2504158159222,
          amount: '5,041,581,559222',
        },
        {
          title: 'Abstain',
          percentage: '0.05%',
          value: 3504158159222,
          amount: '3,504,158,159,222',
        },
        {
          title: 'No',
          percentage: '69.28%',
          value: 2504158159222,
          amount: '2,504,158,159,222',
        },
        {
          title: 'No with Veto',
          percentage: '0.00%',
          value: 58159222000,
          amount: '58,159,222,000',
        },
      ],
    },
  }

  const data2 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ]

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  return (
    <Box display="flex">
      {/* <ResponsiveContainer height="7.5rem" width="7.5rem"> */}
      <PieChart width={200} height={200}>
        <Pie
          data={data.chart.data}
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
          {data.chart.data.map((_x: any, index: any) => (
            <Cell
              // className={classnames(`pie-${index}`)}
              key={_x.value}
              fill={COLORS[index % COLORS.length]}
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
          81,873.736.3947322 ATOM
        </Typography>
        <Typography variant="subtitle1" className={classes.title}>
          (~81M of ~186M ATOM)
        </Typography>
        <Box display="flex">
          <Box m={2}>
            <Box m={1} position="relative">
              <Box className={classes.label}>
                <Typography variant="subtitle2" className={classes.title}>
                  Yes (30.66%)
                </Typography>
                <Typography variant="subtitle2" className={classes.amount}>
                  25,041,581.559221 ATOM
                </Typography>
              </Box>
            </Box>
            <Box m={1} position="relative">
              <Box className={classes.label}>
                <Typography variant="subtitle2" className={classes.title}>
                  Yes (30.66%)
                </Typography>
                <Typography variant="subtitle2" className={classes.amount}>
                  25,041,581.559221 ATOM
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box m={2}>
            <Box m={1} position="relative">
              <Box className={classes.label}>
                <Typography variant="subtitle2" className={classes.title}>
                  Yes (30.66%)
                </Typography>
                <Typography variant="subtitle2" className={classes.amount}>
                  25,041,581.559221 ATOM
                </Typography>
              </Box>
            </Box>
              <Box m={1} position="relative">
                <Box className={classes.label}>
                  <Typography variant="subtitle2" className={classes.title}>
                    Yes (30.66%)
                  </Typography>
                  <Typography variant="subtitle2" className={classes.amount}>
                    25,041,581.559221 ATOM
                  </Typography>
                </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Chart
