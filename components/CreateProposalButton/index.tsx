import React from 'react'
import { Typography } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import { useGetStyles } from './styles'

const CreateProposalButton: React.FC = () => {
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

export default CreateProposalButton
