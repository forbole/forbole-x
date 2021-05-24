import { Box, Card } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { useGetStyles } from './styles'
import { VoteDetail, VoteSummary } from './index'
import VoteResult from './VoteResult'
import VoteTable from './VoteTable'

interface InActiveCardProps {
  voteDetails: VoteDetail[]
  crypto: Cryptocurrency
  voteSummary: VoteSummary
}

const InActiveCard: React.FC<InActiveCardProps> = ({ voteDetails, crypto, voteSummary }) => {
  const { classes } = useGetStyles()
  const { t } = useTranslation('common')

  return (
    <Card className={classes.card}>
      <Box m={4}>
        <VoteResult voteSummary={voteSummary} crypto={crypto} />
        <VoteTable voteDetails={voteDetails} crypto={crypto} />
      </Box>
    </Card>
  )
}

export default InActiveCard
