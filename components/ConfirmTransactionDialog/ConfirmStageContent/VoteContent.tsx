import { Divider, Typography, Box } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'

interface VoteContentProps {
  account: Account
  proposal: Proposal
  answer: { id: string; name: string }
}

const VoteContent: React.FC<VoteContentProps> = ({ account, proposal, answer }) => {
  const { t } = useTranslation('common')

  return (
    <>
      <Box pt={1.5} pb={1.5}>
        <Typography variant="h6">{t('address')}</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {account.address}
        </Typography>
      </Box>
      <Divider />
      <Box pt={1.5} pb={1.5}>
        <Typography variant="h6">{`${t('vote proposal')} #${proposal.id}`}</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {answer.name}
        </Typography>
      </Box>
      <Divider />
    </>
  )
}

export default VoteContent
