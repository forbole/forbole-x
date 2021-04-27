import { Dialog, IconButton } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import BackIcon from '../../assets/images/icons/icon_back.svg'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'
import SelectValidators from './SelectValidators'
import ConfirmWithdraw from './ConfirmWithdraw'
import useStateHistory from '../../misc/useStateHistory'

enum DelegationStage {
  // SelectValidator = 'select validator',
  SelectValidatorsStage = 'select validators',
  ConfirmWithdrawStage = 'confirm withdraw',
}

interface DelegationDialogProps {
  account: Account
  open: boolean
  onClose(): void
  validators: any
}

interface Content {
  content: React.ReactNode
  dialogWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const ClaimRewardsDialog: React.FC<DelegationDialogProps> = ({
  account,
  open,
  onClose,
  validators,
}) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const [amount, setAmount] = React.useState(0)
  const [delegations, setDelegations] = React.useState<
    Array<{ amount: number; validator: { name: string; image: string } }>
  >([])
  const [memo, setMemo] = React.useState('')

  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory<DelegationStage>(
    DelegationStage.SelectValidatorsStage
  )

  // const confirmAmount = React.useCallback(
  //   (a: number) => {
  //     setAmount(a)
  //     setStage(DelegationStage.SelectValidatorsStage)
  //   },
  //   [setAmount, setStage]
  // )

  const confirmAmount = React.useCallback(
    (d: Array<{ amount: number; validator: { name: string; image: string } }>, m: string) => {
      setDelegations([
        {
          amount: 100,
          validator: {
            name: 'forbole',
            image:
              'https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg',
          },
        },
      ])
      setMemo(m)
      setStage(DelegationStage.ConfirmWithdrawStage)
    },
    [setStage]
  )

  const content: Content = React.useMemo(() => {
    switch (stage) {
      // case DelegationStage.SelectValidatorsStage:
      //   return {
      //     title: t('delegate'),
      //     content: (
      //       <SelectValidators account={account} amount={amount} onConfirm={confirmDelegations} />
      //     ),
      //   }
      case DelegationStage.ConfirmWithdrawStage:
        return {
          title: '',
          dialogWidth: 'xs',
          content: (
            <ConfirmWithdraw
              account={account}
              amount={amount}
              delegations={delegations}
              memo={memo}
              onConfirm={onClose}
            />
          ),
        }
      case DelegationStage.SelectValidatorsStage:
      default:
        return {
          content: (
            <SelectValidators account={account} onConfirm={confirmAmount} validators={validators} />
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
      {content.content}
    </Dialog>
  )
}

export default ClaimRewardsDialog
