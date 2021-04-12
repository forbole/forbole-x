import { Dialog, DialogTitle, IconButton } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import BackIcon from '../../assets/images/icons/icon_back.svg'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'
import SelectRecipients from './SelectRecipients'
import ConfirmSend from './ConfirmSend'
import useStateHistory from '../../misc/useStateHistory'

enum SendStage {
  SelectRecipientsStage = 'select recipients',
  ConfirmSendStage = 'confirm send',
}

interface SendDialogProps {
  account: Account
  availableAmount: number
  open: boolean
  onClose(): void
}

interface Content {
  title: string
  content: React.ReactNode
  dialogWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const SendDialog: React.FC<SendDialogProps> = ({ account, availableAmount, open, onClose }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const [recipients, setRecipients] = React.useState<Array<{ amount: number; address: string }>>([])
  const [memo, setMemo] = React.useState('')

  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory<SendStage>(
    SendStage.SelectRecipientsStage
  )

  const confirmRecipients = React.useCallback(
    (r: Array<{ amount: number; address: string }>, m: string) => {
      setRecipients(r)
      setMemo(m)
      // TODO: sign transactions
      console.log(r, m)
      setStage(SendStage.ConfirmSendStage)
    },
    [setStage]
  )

  const content: Content = React.useMemo(() => {
    switch (stage) {
      case SendStage.ConfirmSendStage:
        return {
          title: '',
          dialogWidth: 'xs',
          content: (
            <ConfirmSend
              account={account}
              recipients={recipients}
              memo={memo}
              onConfirm={onClose}
            />
          ),
        }
      case SendStage.SelectRecipientsStage:
      default:
        return {
          title: t('send'),
          content: (
            <SelectRecipients
              account={account}
              availableAmount={availableAmount}
              onConfirm={confirmRecipients}
            />
          ),
        }
    }
  }, [stage, t])

  return (
    <Dialog fullWidth maxWidth={content.dialogWidth || 'md'} open={open} onClose={onClose}>
      {isPrevStageAvailable ? (
        <IconButton className={classes.backButton} onClick={toPrevStage}>
          <BackIcon {...iconProps} />
        </IconButton>
      ) : null}
      <IconButton className={classes.closeButton} onClick={onClose}>
        <CloseIcon {...iconProps} />
      </IconButton>
      {content.title ? <DialogTitle>{content.title}</DialogTitle> : null}
      {content.content}
    </Dialog>
  )
}

export default SendDialog
