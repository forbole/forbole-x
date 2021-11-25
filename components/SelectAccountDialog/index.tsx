import React, { useState } from 'react'
import {
  Dialog,
  IconButton,
  DialogTitle,
  DialogContent,
  Typography,
  RadioGroup,
  FormControl,
  Button,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import useStyles from './styles'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import useIconProps from '../../misc/useIconProps'
import { useWalletsContext } from '../../contexts/WalletsContext'
import AccountRow from './AccountRow'

interface SelectAccountDialogProps {
  open: boolean
  onClose(): void
  onSubmit: (event: any, value: string) => void
  setSelectedAddress: (address: string) => void
}

const SelectAccountDialog: React.FC<SelectAccountDialogProps> = ({
  open,
  onClose,
  onSubmit,
  setSelectedAddress,
}) => {
  const classes = useStyles()
  const iconProps = useIconProps()
  const { t } = useTranslation('common')
  const { accounts } = useWalletsContext()
  const [value, setValue] = useState('')

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSelectedAddress(value)
    onSubmit(event, value)
    onClose()
  }

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <IconButton className={classes.closeButton} onClick={onClose}>
        <CloseIcon {...iconProps} />
      </IconButton>
      <>
        <DialogTitle>Select Account</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Typography className={classes.subtitle}>{t('select an account')}</Typography>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth>
              <RadioGroup value={value} onChange={handleChange}>
                {accounts.map((acc) => (
                  <AccountRow account={acc} key={acc.address} />
                ))}
              </RadioGroup>
              <Button
                className={classes.button}
                color="primary"
                variant="contained"
                type="submit"
                fullWidth
                disabled={!value}
              >
                {t('next')}
              </Button>
            </FormControl>
          </form>
        </DialogContent>
      </>
    </Dialog>
  )
}

export default SelectAccountDialog
