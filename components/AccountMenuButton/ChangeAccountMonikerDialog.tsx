import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import useStyles from './styles'
import { useWalletsContext } from '../../contexts/WalletsContext'
import useIconProps from '../../misc/useIconProps'
import useIsMobile from '../../misc/useIsMobile'

interface ChangeAccountMonikerDialogProps {
  accountAddress: string
  open: boolean
  onClose(): void
}

const ChangeAccountMonikerDialog: React.FC<ChangeAccountMonikerDialogProps> = ({
  accountAddress,
  open,
  onClose,
}) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const [name, setName] = React.useState('')
  const { updateAccount } = useWalletsContext()
  const isMobile = useIsMobile()

  const onButtonClick = React.useCallback(
    async (e) => {
      try {
        e.preventDefault()
        await updateAccount(accountAddress, { name })
        onClose()
      } catch (err) {
        console.log(err)
      }
    },
    [name, updateAccount, accountAddress]
  )

  React.useEffect(() => {
    if (open) {
      setName('')
    }
  }, [open])

  return (
    <Dialog fullWidth open={open} onClose={onClose} fullScreen={isMobile}>
      <IconButton className={classes.closeButton} onClick={onClose}>
        <CloseIcon {...iconProps} />
      </IconButton>
      <DialogTitle>{t('change account moniker')}</DialogTitle>
      <form noValidate onSubmit={onButtonClick}>
        <DialogContent>
          <Box mb={18}>
            <Typography gutterBottom>{t('account moniker')}</Typography>
            <TextField
              fullWidth
              autoFocus
              variant="filled"
              InputProps={{
                disableUnderline: true,
              }}
              placeholder={t('account moniker')}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            className={classes.dialogButton}
            variant="contained"
            color="primary"
            disabled={!name}
          >
            {t('next')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default ChangeAccountMonikerDialog
