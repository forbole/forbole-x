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
  InputAdornment,
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import keyBy from 'lodash/keyBy'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import { useGetStyles } from './styles'
import { useGeneralContext } from '../../contexts/GeneralContext'
import useIconProps from '../../misc/useIconProps'
import useIsMobile from '../../misc/useIsMobile'
import DropDownIcon from '../../assets/images/icons/icon_arrow_down_input_box.svg'

export type FavAddress = {
  address: string
  crypto: string
  moniker: string
  notes?: string
  img?: string
}

interface AddAddressDialogProps {
  open: boolean
  onClose(): void
  networks: { name: string; id: string; crypto: string }[]
}

const AddAddressDialog: React.FC<AddAddressDialogProps> = ({ open, onClose, networks }) => {
  const { t } = useTranslation('common')
  const { classes } = useGetStyles()
  const iconProps = useIconProps()
  const [editedAddress, setEditedAddress] = React.useState<FavAddress>({
    address: '',
    crypto: '',
    moniker: '',
  })

  // need to veritfy if this address exist
  // need to get the img of the address
  const [address, setAddress] = React.useState('')
  const [moniker, setMoniker] = React.useState('')
  const [note, setNote] = React.useState('')

  const { addFavAddresses } = useGeneralContext()
  const isMobile = useIsMobile()
  const [network, setNetwork] = React.useState<{ name: string; id: string; crypto: string }>(
    networks[0]
  )
  React.useEffect(() => {
    setEditedAddress({
      address,
      img: editedAddress.img,
      moniker,
      crypto: network.crypto,
      notes: note,
    })
  }, [network, address, moniker, note])

  const networksMap = keyBy(networks, 'id')
  const onButtonClick = React.useCallback(
    async (e) => {
      try {
        e.preventDefault()
        await addFavAddresses(editedAddress)
        onClose()
      } catch (err) {
        console.log(err)
      }
    },
    [addFavAddresses, editedAddress]
  )

  React.useEffect(() => {
    if (open) {
      setEditedAddress({
        address: '',
        crypto: '',
        moniker: '',
      })
    }
  }, [open])

  return (
    <Dialog fullWidth open={open} onClose={onClose} fullScreen={isMobile}>
      <IconButton className={classes.closeButton} onClick={onClose}>
        <CloseIcon {...iconProps} />
      </IconButton>
      <DialogTitle>{t('add address')}</DialogTitle>
      <form noValidate onSubmit={onButtonClick}>
        <DialogContent>
          <Box mb={2.5}>
            <Typography variant="button" className={classes.itemButton}>
              {t('address type')}
            </Typography>
            <Box display="flex" alignItems="center">
              <Autocomplete
                options={networks.map(({ id }) => id)}
                getOptionLabel={(option) => networksMap[option].name}
                openOnFocus
                fullWidth
                filterOptions={(options: string[], { inputValue }: any) =>
                  options
                    .filter((o) =>
                      networksMap[o].name.toLowerCase().includes(inputValue.toLowerCase())
                    )
                    .slice(0, 10)
                }
                onChange={(_e, id: string) => setNetwork(networksMap[id])}
                renderOption={(id) => (
                  <Box display="flex" alignItems="center">
                    <Typography>{networksMap[id].name}</Typography>
                  </Box>
                )}
                renderInput={({ InputProps, inputProps, ...params }) => (
                  <TextField
                    {...params}
                    variant="filled"
                    placeholder={t('select network')}
                    inputProps={{
                      ...inputProps,
                      value: `${network.name}`,
                    }}
                    // eslint-disable-next-line react/jsx-no-duplicate-props
                    InputProps={{
                      ...InputProps,
                      className: '',
                      disableUnderline: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <DropDownIcon {...iconProps} />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Box>
          </Box>
          <Box mb={2.5}>
            <Typography gutterBottom>{t('address')}</Typography>
            <TextField
              fullWidth
              autoFocus
              variant="filled"
              placeholder={t('insert address')}
              InputProps={{
                disableUnderline: true,
              }}
              // placeholder={t('account moniker')}
              value={editedAddress.address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Box>
          <Box mb={2.5}>
            <Typography gutterBottom>{t('moniker')}</Typography>
            <TextField
              fullWidth
              autoFocus
              variant="filled"
              placeholder={t('moniker')}
              InputProps={{
                disableUnderline: true,
              }}
              value={editedAddress.moniker}
              onChange={(e) => setMoniker(e.target.value)}
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
            disabled={address === '' || moniker === ''}
          >
            {t('save')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default AddAddressDialog
