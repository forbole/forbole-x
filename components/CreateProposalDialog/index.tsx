import React from 'react'
import { Box, Card, Typography, Avatar, Divider, Dialog, DialogTitle } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { useGetStyles } from './styles'
import Active from './Active'
import InActive from './InActive'

interface Proposal {
  no: string
  proposer: {
    name: string
    image: string
    address: string
  }
  title: string
  content: string
  votingTime: string
  duration?: string
  isActive: boolean
  tag: string
}

interface CreateProposalDialogProps {
  // proposals: Proposal[]
  // account: Account
}

const CreateProposalDialog: React.FC<CreateProposalDialogProps> = () => {
  const { classes } = useGetStyles()
  const { t } = useTranslation('common')

  return (
    <>
      <Typography variant="button" className={classes.button}>
        {t('create proposal')}
      </Typography>
    </>
  )
}

export default CreateProposalDialog
