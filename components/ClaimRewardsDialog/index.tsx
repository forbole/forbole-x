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
import UnlockPasswordDialog from '../UnlockPasswordDialog'
import Success from '../Success'

enum DelegationStage {
  SecurityPassword = 'security password',
  SelectValidatorsStage = 'select validators',
  ConfirmWithdrawStage = 'confirm withdraw',
  SuccessStage = 'success',
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
    Array<{ name: string; image: string; amount: number; isSelected: boolean; reward: number }>
  >([])
  const [memo, setMemo] = React.useState('')

  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory<DelegationStage>(
    DelegationStage.SelectValidatorsStage
  )

  const confirmLast = React.useCallback(
    (
      a: number,
      d: Array<{
        name: string
        image: string
        amount: number
        isSelected: boolean
        reward: number
      }>,
      m: string
    ) => {
      // setAmount(a)
      setStage(DelegationStage.SecurityPassword)
    },
    [setStage]
  )

  const confirmAmount = React.useCallback(
    (
      a: number,
      d: Array<{
        name: string
        image: string
        amount: number
        isSelected: boolean
        reward: number
      }>,
      m: string
    ) => {
      setDelegations(d)
      setAmount(a)
      setMemo(m)
      setStage(DelegationStage.ConfirmWithdrawStage)
    },
    [setStage]
  )

  const content: Content = React.useMemo(() => {
    switch (stage) {
      case DelegationStage.SuccessStage:
        return {
          title: '',
          dialogWidth: 'xs',
          content: <Success onClose={onClose} />,
        }
      case DelegationStage.SecurityPassword:
        return {
          // title: t('delegate'),
          dialogWidth: 'xs',
          content: <UnlockPasswordDialog isOpen />,
          // content: (
          //   <SelectValidators account={account} onConfirm={confirmAmount} validators={validators} />
          // ),
        }
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
              onConfirm={confirmLast}
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

  // if (stage === 'security password') {
  //   console.log('stage', stage)
  //   return (
  //     <Dialog fullWidth maxWidth={content.dialogWidth || 'md'} open={open} onClose={onClose}>
  //       {isPrevStageAvailable ? (
  //         <IconButton className={classes.backButton} onClick={toPrevStage}>
  //           <BackIcon {...iconProps} />
  //         </IconButton>
  //       ) : null}
  //       <IconButton className={classes.closeButton} onClick={onClose}>
  //         <CloseIcon {...iconProps} />
  //       </IconButton>
  //       edjqpedpoqek
  //       {/* {content.content} */}
  //     </Dialog>
  //   )
  // }
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
      111
      {content.content}
    </Dialog>
  )
}

export default ClaimRewardsDialog
