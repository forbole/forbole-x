import React from 'react'
import { Box, Card, Button, Typography, Divider } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import { useGetStyles } from './styles'
import { Proposal } from './index'

interface ConfirmProposalContentProps {
  proposal: Proposal
  accounts: Account[]
  onConfirm: () => void
}

const ConfirmProposalContent: React.FC<ConfirmProposalContentProps> = ({ proposal, onConfirm }) => {
  const { classes } = useGetStyles()
  const { t } = useTranslation('common')

  return (
    <Card>
      <Box m={3}>
        <Box display="flex" alignItems="center" mt={4} mb={4}>
          <Typography variant="h1" className={classes.confirmTitle}>
            {t('confirm proposal')}
          </Typography>
        </Box>
        <Divider />
        <Box pt={1.5} pb={1.5}>
          <Typography>{t('address')}</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {proposal.proposalAccount.address}
          </Typography>
        </Box>
        <Divider />
        <Box pt={1.5} pb={1.5}>
          <Typography>{t('network')}</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {proposal.network.name}
          </Typography>
        </Box>
        <Divider />
        <Box pt={1.5} pb={1.5}>
          <Typography>{t('type')}</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {proposal.type.name}
          </Typography>
        </Box>
        <Divider />
        <Box pt={1.5} pb={1.5}>
          <Typography>{t('title')}</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {proposal.title}
          </Typography>
        </Box>
        <Divider />
        <Box pt={1.5} pb={1.5}>
          <Typography>{t('description')}</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {proposal.description}
          </Typography>
        </Box>
        <Divider />
        <Box pt={1.5} pb={1.5}>
          <Typography>{t('memo')}</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {proposal.memo ? proposal.memo : 'N/A'}
          </Typography>
        </Box>
        <Divider />
        <Box pt={1.5} pb={1.5}>
          <Typography>{t('fee')}</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {proposal.memo ? proposal.memo : 'N/A'}
          </Typography>
        </Box>
        <Divider />
        <Box display="flex" justifyContent="flex-end" pt={12}>
          <Button
            variant="contained"
            className={classes.button}
            color="primary"
            onClick={() => onConfirm()}
          >
            {t('next')}
          </Button>
        </Box>
      </Box>
    </Card>
  )
}

export default ConfirmProposalContent
