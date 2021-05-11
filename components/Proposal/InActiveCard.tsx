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
import { useGetStyles } from './styles'
import { DepositDetail } from './index'
import Chart from './Chart'

interface InActiveCardProps {
  depositDetails: DepositDetail[]
  // onClick: () => void
}

const InActiveCard: React.FC = () => {
  const { classes } = useGetStyles()
  const { t } = useTranslation('common')
  const onClick = () => {
    // link to vote / deposit page
  }

  const columns = [
    {
      label: 'depositor',
    },
    {
      label: 'amount',
      alignRight: true,
    },
    {
      label: 'time',
      alignRight: true,
    },
  ]

  return (
    <Card className={classes.card}>
      <Box m={4}>
        <Chart />
      </Box>
    </Card>
  )
}

export default InActiveCard
