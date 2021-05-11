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
import Active from './Active'

interface InActiveCardProps {
  depositDetails: DepositDetail[]
  // onClick: () => void
}

const InActiveCard: React.FC<InActiveCardProps> = ({ depositDetails }) => {
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
    <Card>
      <Box m={4} />
    </Card>
  )
}

export default InActiveCard
