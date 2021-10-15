import { Dialog, DialogTitle, DialogContent, IconButton, useTheme } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'

interface VestingDialogProps {
  open: boolean
  onClose(): void
  account: Account
}

const VestingDialog: React.FC<VestingDialogProps> = ({ open, onClose, account }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const themeStyle = useTheme()

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={onClose}>
      <IconButton className={classes.closeButton} onClick={onClose}>
        <CloseIcon {...iconProps} />
      </IconButton>
      <DialogTitle>{t('vesting')}</DialogTitle>
      <DialogContent />
    </Dialog>
  )
}

export default VestingDialog
