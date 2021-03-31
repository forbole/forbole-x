import { Box, Typography } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { useGetStyles } from './styles'

interface ActiveProps {
  status: string
  align: string
}

const Active: React.FC<ActiveProps> = ({ status, align }) => {
  const { classes } = useGetStyles(status, align)
  const { t, lang } = useTranslation('common')

  return (
    <Box className={classes.activeStatus}>
      <Typography>
        <a className={classes.button}>{t('delegate')}</a>
      </Typography>
    </Box>
  )
}

export default Active
