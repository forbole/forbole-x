import { Box, Button, DialogActions, DialogContent, Typography } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import SuccessLight from '../../assets/images/tx_success_light.svg'
import SuccessDark from '../../assets/images/tx_success_dark.svg'
import useStyles from './styles'
import { useSettingsContext } from '../../contexts/SettingsContext'
import { formatTokenAmount } from '../../misc/utils'

interface ConfirmSendProps {
  onClose(): void
  totalAmount: TokenAmount
  account: Account
}

const Success: React.FC<ConfirmSendProps> = ({ onClose, totalAmount, account }) => {
  const { t, lang } = useTranslation('common')
  const classes = useStyles()
  const { theme } = useSettingsContext()

  return (
    <>
      <DialogContent className={classes.dialogContent}>
        <Box display="flex" alignItems="center" flexDirection="column">
          <Box my={2}>{theme === 'dark' ? <SuccessDark /> : <SuccessLight />}</Box>
          <Typography variant="h4" gutterBottom>
            {t('success')}
          </Typography>
          <Typography>
            {t('successfully sent', {
              title: formatTokenAmount(totalAmount, account.crypto, lang, ', '),
            })}
          </Typography>
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

export default Success
