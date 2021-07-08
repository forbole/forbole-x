import { Box, Card, Typography, useTheme } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import useStyles from './styles'

interface AccountBalanceCardProps {
  accountBalance: AccountBalance
}

const AccountBalanceCard: React.FC<AccountBalanceCardProps> = ({ accountBalance }) => {
  const classes = useStyles()
  const { t } = useTranslation('common')
  const theme = useTheme()
  return (
    <Card className={classes.container}>
      <Typography variant="h4">{t('balance')}</Typography>
      <Box position="relative" height={theme.spacing(20)} maxWidth={theme.spacing(20)} mx="auto">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {/* <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie> */}
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  )
}

export default AccountBalanceCard
