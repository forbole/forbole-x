import { Button, DialogActions, DialogContent, Typography, DialogTitle } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { useWalletsContext } from '../../contexts/WalletsContext'
import useStyles from './styles'

interface RemoveAccountProps {
  onClose(): void
  address: string
}

const RemoveAccount: React.FC<RemoveAccountProps> = ({ onClose, address }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const { deleteAccount } = useWalletsContext()

  const onButtonClick = React.useCallback(async () => {
    try {
      await deleteAccount(address)
    } catch (err) {
      console.log(err)
    }
  }, [deleteAccount, address])

  return (
    <>
      <DialogContent className={classes.dialogContent}>
        <Typography>{t('remove wallet warning')}</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.dialogButton}
          variant="contained"
          color="secondary"
          onClick={onClose}
        >
          {t('cancel')}
        </Button>
        <Button
          className={classes.dialogButton}
          variant="contained"
          color="primary"
          onClick={onButtonClick}
        >
          {t('delete')}
        </Button>
      </DialogActions>
    </>
  )
}

export default RemoveAccount
