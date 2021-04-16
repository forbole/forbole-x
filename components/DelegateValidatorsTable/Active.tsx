import { Box, Typography } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { useGetStyles } from './styles'

interface ActiveProps {
  status: string
  onClick: () => void
}

const Active: React.FC<ActiveProps> = ({ status, onClick }) => {
  const { classes } = useGetStyles(status)
  const { t, lang } = useTranslation('common')

  return (
    <Box className={classes.activeStatus} onClick={onClick}>
      <Typography variant="body2">
        <a className={classes.button}>{t('delegate')}</a>
      </Typography>
    </Box>
  )
}

export default Active
