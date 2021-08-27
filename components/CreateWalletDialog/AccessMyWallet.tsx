import {
  Button,
  DialogActions,
  DialogContent,
  Typography,
  Box,
  DialogContentText,
  ButtonBase,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import useStyles from './styles'
import { ImportStage } from '.'

interface AccessMyWalletProps {
  onConfirm(stage: ImportStage): void
  onCreateWallet(): void
}

const AccessMyWallet: React.FC<AccessMyWalletProps> = ({ onConfirm, onCreateWallet }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()

  return (
    <>
      <DialogContent className={classes.dialogContent}>
        <DialogContentText>{t('access my wallet description')}</DialogContentText>
        <Box mt={-2}>
          {Object.values(ImportStage).map((stage) => (
            <ButtonBase
              key={stage}
              className={classes.borderedButton}
              onClick={() => onConfirm(stage)}
            >
              <Typography variant="h6" gutterBottom>
                {t(stage)}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {t(`${stage} description`)}
              </Typography>
            </ButtonBase>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        {/* <Button onClick={onCreateWallet} className={classes.button} color="primary">
          {t('create a wallet')}
        </Button> */}
      </DialogActions>
    </>
  )
}

export default AccessMyWallet
