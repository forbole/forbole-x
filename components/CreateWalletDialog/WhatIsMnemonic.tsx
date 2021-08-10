import { Box, DialogContent, Typography } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import useStyles from './styles'

const WhatIsMnemonic: React.FC = () => {
  const { t } = useTranslation('common')
  const classes = useStyles()

  return (
    <DialogContent className={classes.dialogContent}>
      <Box mx={1} mb={4}>
        <Typography paragraph>{t('what is secret recovery phrase description')}</Typography>
      </Box>
    </DialogContent>
  )
}

export default WhatIsMnemonic
