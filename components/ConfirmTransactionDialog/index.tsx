import { Dialog, DialogTitle, IconButton } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import flatten from 'lodash/flatten'
import keyBy from 'lodash/keyBy'
import invoke from 'lodash/invoke'
import { gql, useSubscription } from '@apollo/client'
import useStateHistory from '../../misc/useStateHistory'
import { transformValidators } from '../../misc/utils'
import useStyles from './styles'
import useIsMobile from '../../misc/useIsMobile'
import { useWalletsContext } from '../../contexts/WalletsContext'
import { getTokensPrices } from '../../graphql/queries/tokensPrices'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import BackIcon from '../../assets/images/icons/icon_back.svg'
import useIconProps from '../../misc/useIconProps'
import { getValidatorsByAddresses } from '../../graphql/queries/validators'
import ConfirmStageContent from './ConfirmStageContent'
import ConnectLedgerDialogContent from '../ConnectLedgerDialogContent'
import SuccessContent from './SuccessContent'
import SecurityPasswordDialogContent from '../SecurityPasswordDialogContent'

enum ConfirmTransactionStage {
  ConfirmStage = 'confirm',
  SecurityPasswordStage = 'security password',
  ConnectLedgerStage = 'connect ledger',
  SuccessStage = 'success',
}

interface Content {
  title: string
  content: React.ReactNode
  dialogWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

interface ConfirmTransactionDialogProps {
  address: string
  transactionData: Transaction
  open: boolean
  onClose(): void
}

const ConfirmTransactionDialog: React.FC<ConfirmTransactionDialogProps> = ({
  address,
  transactionData,
  open,
  onClose,
}) => {
  const { t, lang } = useTranslation('common')
  const classes = useStyles()
  const isMobile = useIsMobile()
  const iconProps = useIconProps()

  const { accounts } = useWalletsContext()
  const account = accounts.find((a) => a.address === address)

  const { data: denoms } = useSubscription(gql`
    ${getTokensPrices(account.crypto)}
  `)

  const validatorsAddresses = flatten(
    transactionData.msgs.map((m) => {
      switch (m.type) {
        case 'cosmos-sdk/MsgSend':
          return []
        case 'cosmos-sdk/MsgDelegate':
          return [m.value.validator_address]
        case 'cosmos-sdk/MsgBeginRedelegate':
          return [m.value.validator_src_address, m.value.validator_dst_address]
        case 'cosmos-sdk/MsgUndelegate':
          return [m.value.validator_address]
        case 'cosmos-sdk/MsgWithdrawDelegationReward':
          return [m.value.validator_address]
        default:
          return []
      }
    })
  )

  const { data: validatorsData } = useSubscription(
    gql`
      ${getValidatorsByAddresses(account.crypto)}
    `,
    {
      variables: {
        addresses: validatorsAddresses,
      },
    }
  )

  const validators = keyBy(transformValidators(validatorsData), 'address')

  const [
    stage,
    setStage,
    toPrevStage,
    isPrevStageAvailable,
  ] = useStateHistory<ConfirmTransactionStage>(ConfirmTransactionStage.ConfirmStage)

  const [loading, setLoading] = React.useState(false)

  const confirm = React.useCallback(
    async (securityPassword?: string) => {
      try {
        setLoading(true)
        await invoke(
          window,
          'forboleX.private.signAndBroadcastTransaction',
          address,
          transactionData,
          securityPassword
        )
        setLoading(false)
        setStage(ConfirmTransactionStage.SuccessStage, true)
      } catch (err) {
        console.log(err)
      }
    },
    [address, transactionData]
  )

  const content: Content = React.useMemo(() => {
    switch (stage) {
      case ConfirmTransactionStage.ConfirmStage:
        return {
          title: '',
          dialogWidth: 'sm',
          content: (
            <ConfirmStageContent
              denoms={denoms}
              transactionData={transactionData}
              account={account}
              validators={validators}
            />
          ),
        }
      case ConfirmTransactionStage.SecurityPasswordStage:
        return {
          title: '',
          dialogWidth: 'sm',
          content: <SecurityPasswordDialogContent onConfirm={confirm} loading={loading} />,
        }
      case ConfirmTransactionStage.ConnectLedgerStage:
        return {
          title: t('connect ledger'),
          dialogWidth: 'sm',
          content: <ConnectLedgerDialogContent onConnect={confirm} />,
        }
      case ConfirmTransactionStage.SuccessStage:
      default:
        return {
          title: '',
          dialogWidth: 'sm',
          content: <SuccessContent message="" onClose={onClose} />,
        }
    }
  }, [stage, t])

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} fullScreen={isMobile}>
      {isPrevStageAvailable ? (
        <IconButton className={classes.backButton} onClick={toPrevStage}>
          <BackIcon {...iconProps} />
        </IconButton>
      ) : null}
      <IconButton className={classes.closeButton} onClick={onClose}>
        <CloseIcon {...iconProps} />
      </IconButton>
      {content.title ? <DialogTitle>{content.title}</DialogTitle> : null}
      <ConfirmStageContent
        denoms={denoms}
        transactionData={transactionData}
        account={account}
        validators={validators}
      />
    </Dialog>
  )
}

export default ConfirmTransactionDialog
