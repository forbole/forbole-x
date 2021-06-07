import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import useStyles from './styles'
import { useWalletsContext } from '../../contexts/WalletsContext'

interface ChangeWalletMonikerProps {
  walletId: string
  onClose(): void
}

const ChangeWalletMoniker: React.FC<ChangeWalletMonikerProps> = ({ walletId, onClose }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const [name, setName] = React.useState('')
  const { updateWallet } = useWalletsContext()

  const onButtonClick = React.useCallback(async () => {
    try {
      await updateWallet(walletId, { name })
      onClose()
    } catch (err) {
      console.log(err)
    }
  }, [name, updateWallet, walletId])

  return (
    <>
      <DialogTitle>{t('change wallet moniker')}</DialogTitle>
      <DialogContent>
        <Box mb={18}>
          <Typography gutterBottom>{t('wallet moniker')}</Typography>
          <TextField
            fullWidth
            variant="filled"
            InputProps={{
              disableUnderline: true,
            }}
            placeholder={t('wallet moniker')}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.dialogButton}
          variant="contained"
          color="primary"
          onClick={onButtonClick}
        >
          {t('save')}
        </Button>
      </DialogActions>
    </>
  )
}

export default ChangeWalletMoniker
