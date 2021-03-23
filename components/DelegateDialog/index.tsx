import { Dialog, DialogTitle, IconButton } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import BackIcon from '../../assets/images/icons/icon_back.svg'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'
import SelectAmount from './SelectAmount'
import SelectValidators from './SelectValidators'
import ConfirmDelegation from './ConfirmDelegation'
import useStateHistory from '../../misc/useStateHistory'

enum DelegationStage {
  SelectAmountStage = 'select amount',
  SelectValidatorsStage = 'select validators',
  ConfirmDelegationStage = 'confirm delegation',
}

interface DelegationDialogProps {
  account: Account
  open: boolean
  onClose(): void
}

interface Content {
  title: string
  content: React.ReactNode
}

const DelegationDialog: React.FC<DelegationDialogProps> = ({ account, open, onClose }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const [amount, setAmount] = React.useState(0)

  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory<DelegationStage>(
    DelegationStage.SelectAmountStage
  )

  const confirmAmount = React.useCallback(
    (a: number) => {
      setAmount(a)
      setStage(DelegationStage.SelectValidatorsStage)
    },
    [setAmount, setStage]
  )

  const content: Content = React.useMemo(() => {
    switch (stage) {
      case DelegationStage.SelectValidatorsStage:
        return {
          title: t('delegate'),
          content: (
            <SelectValidators
              account={account}
              amount={amount}
              onConfirm={(a, b) => console.log(a, b)}
            />
          ),
        }
      case DelegationStage.ConfirmDelegationStage:
        return {
          title: '',
          content: <ConfirmDelegation />,
        }
      case DelegationStage.SelectAmountStage:
      default:
        return {
          title: t('delegate'),
          content: <SelectAmount account={account} onConfirm={confirmAmount} />,
        }
    }
  }, [stage, t])

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={onClose}>
      {isPrevStageAvailable ? (
        <IconButton className={classes.backButton} onClick={toPrevStage}>
          <BackIcon {...iconProps} />
        </IconButton>
      ) : null}
      <IconButton className={classes.closeButton} onClick={onClose}>
        <CloseIcon {...iconProps} />
      </IconButton>
      <DialogTitle>{content.title}</DialogTitle>
      {content.content}
    </Dialog>
  )
}

export default DelegationDialog
