import { Box, Button, DialogActions, DialogContent, Typography } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import RejectedLight from '../../assets/images/tx_rejected_light.svg'
import RejectedDark from '../../assets/images/tx_rejected_dark.svg'
import useStyles from './styles'
import { useGeneralContext } from '../../contexts/GeneralContext'

interface FailProps {
  onClose(): void
  message: string
}

const Fail: React.FC<FailProps> = ({ onClose, message }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const { theme } = useGeneralContext()

  return (
    <>
      <DialogContent className={classes.dialogContent}>
        <Box display="flex" alignItems="center" flexDirection="column">
          <Box my={2}>{theme === 'dark' ? <RejectedDark /> : <RejectedLight />}</Box>
          <Typography variant="h4" gutterBottom>
            {t('reject')}
          </Typography>
          <Typography>{message}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box display="flex" justifyContent="center" flex={1} my={2}>
          <Button variant="contained" className={classes.button} color="primary" onClick={onClose}>
            {t('close')}
          </Button>
        </Box>
      </DialogActions>
    </>
  )
}

export default Fail
