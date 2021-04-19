import { Box, Button } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { useGetStyles } from './styles'

interface ActiveProps {
  status: string
  onClick: () => void
}

const Active: React.FC<ActiveProps> = ({ status, onClick }) => {
  const { classes } = useGetStyles(status)
  const { t } = useTranslation('common')

  return (
    <Box className={classes.activeStatus} onClick={onClick}>
      <Button size="small" color="secondary" variant="contained">
        {t('delegate')}
      </Button>
    </Box>
  )
}

export default Active
