import { Typography } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { useGetStyles } from './styles'

interface ActiveProps {
  proposal: Proposal
}

const VoteTime: React.FC<ActiveProps> = ({ proposal }) => {
  const { classes } = useGetStyles()
  const { t } = useTranslation('common')

  return (
    <Typography variant="subtitle1" color="textSecondary">
      {`${t('voting time')}: ${proposal.votingStartTime} to ${proposal.votingEndTime} `}
      <span className={classes.duration}>
        {`(${proposal.duration} ${proposal.duration > 1 ? t('days') : t('day')})`}
      </span>
    </Typography>
  )
}

export default VoteTime
