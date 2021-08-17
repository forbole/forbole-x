import { Dialog, DialogTitle, IconButton } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'
import InputAmount from './InputAmount'
import cryptocurrencies from '../../misc/cryptocurrencies'

interface DepositDialogProps {
  network: Chain
  open: boolean
  onClose(): void
  proposal: Proposal
}

const DepositDialog: React.FC<DepositDialogProps> = ({ network, open, onClose, proposal }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const [loading, setLoading] = React.useState(false)

  const confirmAmount = React.useCallback((address: string, amount: number, memo?: string) => {
    try {
      setLoading(true)
      // TODO: handle transaction part later
      setLoading(false)
      onClose()
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }, [])

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <IconButton className={classes.closeButton} onClick={onClose}>
        <CloseIcon {...iconProps} />
      </IconButton>
      <DialogTitle>{t('deposit')}</DialogTitle>
      <InputAmount
        open={open}
        onNext={confirmAmount}
        proposal={proposal}
        crypto={cryptocurrencies[network.crypto]}
      />
    </Dialog>
  )
}

export default DepositDialog
