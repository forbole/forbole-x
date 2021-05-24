import { Box, Typography } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { useGetStyles } from './styles'
import { Proposal } from './index'

interface ActiveProps {
  proposal: Proposal
  className?: string
}

const DepositTime: React.FC<ActiveProps> = ({ proposal, className }) => {
  const { classes } = useGetStyles()
  const { t } = useTranslation('common')

  return (
    <Box display="flex">
      <Box>
        <Typography variant="subtitle1" color="textSecondary">
          {`${t('submitted time')}: ${proposal.submitTime}`}
        </Typography>
      </Box>
      <Box ml={4}>
        <Typography variant="subtitle1" color="textSecondary">
          {`${t('deposited end time')}: ${proposal.depositEndTime}`}
          <span className={classes.duration}>
            {`(${t('in')} ${proposal.duration} ${proposal.duration > 1 ? t('days') : t('day')})`}
          </span>
        </Typography>
      </Box>
    </Box>
  )
}

export default DepositTime
