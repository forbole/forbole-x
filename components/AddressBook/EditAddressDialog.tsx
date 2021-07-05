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
import { EditLocation } from '@material-ui/icons'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import { useGetStyles } from './styles'
import { useGeneralContext } from '../../contexts/GeneralContext'
import useIconProps from '../../misc/useIconProps'
import useIsMobile from '../../misc/useIsMobile'

interface EditAddressDialogProps {
  address: { address: string; crypto: string; moniker: string; notes?: string; img?: string }
  open: boolean
  onClose(): void
}

const EditAddressDialog: React.FC<EditAddressDialogProps> = ({ address, open, onClose }) => {
  const { t } = useTranslation('common')
  const { classes } = useGetStyles()
  const iconProps = useIconProps()
  const [editedAddress, setEditedAddress] = React.useState(address)
  const { updateFavAddresses } = useGeneralContext()
  const isMobile = useIsMobile()

  const onButtonClick = React.useCallback(
    async (e) => {
      try {
        e.preventDefault()
        await updateFavAddresses(editedAddress)
        onClose()
      } catch (err) {
        console.log(err)
      }
    },
    [updateFavAddresses, editedAddress]
  )

  React.useEffect(() => {
    if (open) {
      setEditedAddress(address)
    }
  }, [open])
  console.log('editedAddress', editedAddress)

  return (
    <Dialog fullWidth open={open} onClose={onClose} fullScreen={isMobile}>
      <IconButton className={classes.closeButton} onClick={onClose}>
        <CloseIcon {...iconProps} />
      </IconButton>
      <DialogTitle>{t('edit address')}</DialogTitle>
      <form noValidate onSubmit={onButtonClick}>
        <DialogContent>
          <Box mb={2.5}>
            <Typography gutterBottom>{t('moniker')}</Typography>
            <TextField
              fullWidth
              autoFocus
              variant="filled"
              InputProps={{
                disableUnderline: true,
              }}
              // placeholder={t('account moniker')}
              value={editedAddress.moniker}
              onChange={(e) =>
                setEditedAddress({
                  moniker: e.target.value,
                  img: editedAddress.img,
                  address: editedAddress.address,
                  crypto: editedAddress.crypto,
                  notes: editedAddress.notes,
                })
              }
            />
          </Box>
          <Box mb={2.5}>
            <Typography gutterBottom>{t('address')}</Typography>
            <TextField
              fullWidth
              autoFocus
              variant="filled"
              InputProps={{
                disableUnderline: true,
              }}
              // placeholder={t('account moniker')}
              value={editedAddress.address}
              onChange={(e) =>
                setEditedAddress({
                  address: e.target.value,
                  img: editedAddress.img,
                  moniker: editedAddress.moniker,
                  crypto: editedAddress.crypto,
                  notes: editedAddress.notes,
                })
              }
            />
          </Box>
          <Box mb={2.5}>
            <Typography gutterBottom>{t('note')}</Typography>
            <TextField
              fullWidth
              autoFocus
              variant="filled"
              multiline
              rows={4}
              InputProps={{
                disableUnderline: true,
              }}
              placeholder={t('optional')}
              value={editedAddress.notes}
              onChange={(e) =>
                setEditedAddress({
                  notes: e.target.value,
                  img: editedAddress.img,
                  moniker: editedAddress.moniker,
                  crypto: editedAddress.crypto,
                  address: editedAddress.address,
                })
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            className={classes.dialogButton}
            variant="contained"
            color="primary"
            // disabled={!name}
          >
            {t('save')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default EditAddressDialog
