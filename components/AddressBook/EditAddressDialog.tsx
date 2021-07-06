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
              value={updatedAddress.moniker}
              onChange={(e) =>
                setUpdatedAddress({
                  address: updatedAddress.address,
                  img: updatedAddress.img,
                  moniker: e.target.value,
                  crypto: updatedAddress.crypto,
                  newAddress: updatedAddress.newAddress,
                  note: updatedAddress.note,
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
              value={updatedAddress.newAddress}
              onChange={(e) =>
                setUpdatedAddress({
                  address: updatedAddress.address,
                  img: updatedAddress.img,
                  moniker: updatedAddress.moniker,
                  crypto: updatedAddress.crypto,
                  newAddress: e.target.value,
                  note: updatedAddress.note,
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
              value={updatedAddress.note}
              onChange={(e) =>
                setUpdatedAddress({
                  address: updatedAddress.address,
                  img: updatedAddress.img,
                  moniker: updatedAddress.moniker,
                  crypto: updatedAddress.crypto,
                  newAddress: updatedAddress.newAddress,
                  note: e.target.value,
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
          >
            {t('save')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default EditAddressDialog
