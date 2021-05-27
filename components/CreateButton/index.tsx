import React from 'react'
import { Typography } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import { useGetStyles } from './styles'

interface CreateButtonProps {
  text: string
}

const CreateButton: React.FC<CreateButtonProps> = ({ text }) => {
  const { classes } = useGetStyles()
  const { t } = useTranslation('common')

  return (
    <>
      <Typography variant="button" className={classes.button}>
        {t(text)}
      </Typography>
    </>
  )
}

export default CreateButton
