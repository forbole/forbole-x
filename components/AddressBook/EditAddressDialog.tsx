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
import { useGeneralContext } from '../../contexts/GeneralContext'
import useIconProps from '../../misc/useIconProps'
import useIsMobile from '../../misc/useIsMobile'
import { FavAddress } from './index'

interface UpdatedAddress extends FavAddress {
  newAddress: string
}

interface EditAddressDialogProps {
  currentAddress: FavAddress
  open: boolean
  onClose(): void
}

const EditAddressDialog: React.FC<EditAddressDialogProps> = ({ currentAddress, open, onClose }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const { updateFavAddresses } = useGeneralContext()
  const isMobile = useIsMobile()
  const [newAddress, setNewAddress] = React.useState(currentAddress.address)
  const [moniker, setMoniker] = React.useState(currentAddress.moniker)
  const [note, setNote] = React.useState(currentAddress.notes)
  const [updatedAddress, setUpdatedAddress] = React.useState<UpdatedAddress>({
    ...currentAddress,
    newAddress: currentAddress.address,
  })
  const onButtonClick = React.useCallback(
    async (e) => {
      try {
        e.preventDefault()
        await updateFavAddresses(updatedAddress)
        onClose()
      } catch (err) {
        console.log(err)
      }
    },
    [updateFavAddresses, updatedAddress]
  )

  React.useEffect(() => {
    if (open) {
      setUpdatedAddress({
        ...currentAddress,
        newAddress: currentAddress.address,
      })
    }
  }, [open])

  React.useEffect(() => {
    setUpdatedAddress({
      address: currentAddress.address,
      img: currentAddress.img,
      moniker,
      crypto: currentAddress.crypto,
      notes: note,
      newAddress,
    })
  }, [newAddress, moniker, note])

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
              value={moniker}
              onChange={(e) => setMoniker(e.target.value)}
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
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
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
              value={note}
              onChange={(e) => setNote(e.target.value)}
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
