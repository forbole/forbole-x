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
import cryptocurrencies from '../../misc/cryptocurrencies'
import { isAddressValid } from '../../misc/utils'

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
  const [monikerError, setMonikerError] = React.useState('')
  const [addressError, setAddressError] = React.useState('')

  const [updatedAddress, setUpdatedAddress] = React.useState<UpdatedAddress>({
    ...currentAddress,
    newAddress: currentAddress.address,
  })

  const onButtonClick = (e) => {
    if (updatedAddress.moniker === '') {
      setMonikerError(t('moniker warning'))
    } else if (
      !isAddressValid(cryptocurrencies[updatedAddress.crypto].prefix, updatedAddress.newAddress)
    ) {
      setAddressError(t('invalid address', { crypto: updatedAddress.crypto }))
    } else {
      onSubmit(e)
    }
  }

  const onSubmit = React.useCallback(
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
      setMonikerError('')
      setAddressError('')
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
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault()
          onButtonClick(e)
        }}
      >
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
              error={!!monikerError}
              helperText={monikerError}
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
              error={!!addressError}
              helperText={addressError}
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
