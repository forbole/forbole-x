import { Divider, Typography, Box } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'

interface VoteContentProps {
  msgs: TransactionMsgVote[]
}

const VoteContent: React.FC<VoteContentProps> = ({ msgs }) => {
  const { t } = useTranslation('common')

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" my={4}>
        <Typography variant="h4">{t('vote')}</Typography>
      </Box>
      <Divider />
      {msgs.map((msg, i) => (
        <React.Fragment key={String(i)}>
          <Box my={1}>
            <Typography>{t('address')}</Typography>
            <Typography color="textSecondary">{msg.value.voter}</Typography>
          </Box>
          <Divider />
          <Box my={1}>
            <Typography>{`${t('vote proposal')} #${msg.value.proposalId}`}</Typography>
            <Typography color="textSecondary">{msg.value.option}</Typography>
          </Box>
          <Divider />
        </React.Fragment>
      ))}
    </>
  )
}

export default VoteContent
