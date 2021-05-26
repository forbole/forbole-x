import { Dialog, DialogTitle, IconButton } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import get from 'lodash/get'
import { Cosmos } from 'ledger-app-cosmos'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import BackIcon from '../../assets/images/icons/icon_back.svg'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'
import SelectValidators from './SelectValidators'
import ConfirmWithdraw from './ConfirmWithdraw'
import useStateHistory from '../../misc/useStateHistory'
import Success from '../Success'
import SecurityPassword from '../SecurityPasswordDialogContent'
import { useWalletsContext } from '../../contexts/WalletsContext'
import cryptocurrencies from '../../misc/cryptocurrencies'
import { formatTransactionMsg } from '../../misc/formatTransactionMsg'
import sendMsgToChromeExt from '../../misc/sendMsgToChromeExt'
import { getTokenAmountFromDenoms } from '../../misc/utils'
import useIsMobile from '../../misc/useIsMobile'
import sendTransaction from '../../misc/sendTransaction'
import ConnectLedgerDialogContent from '../ConnectLedgerDialogContent'
import useSignerInfo from '../../misc/useSignerInfo'

enum ClaimRewardsStage {
  SecurityPasswordStage = 'security password',
  ConnectLedgerStage = 'connect ledger',
  SelectValidatorsStage = 'select validators',
  ConfirmWithdrawStage = 'confirm withdraw',
  SuccessStage = 'success',
}

export interface ValidatorTag extends Validator {
  isSelected: boolean
}

interface ClaimRewardsDialogProps {
  account: Account
  tokensPrices: TokenPrice[]
  open: boolean
  onClose(): void
  validators: Validator[]
  preselectedValidatorAddresses?: string[]
}

interface Content {
  title: string
  content: React.ReactNode
  dialogWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const ClaimRewardsDialog: React.FC<ClaimRewardsDialogProps> = ({
  account,
  tokensPrices,
  open,
  onClose,
  validators,
  preselectedValidatorAddresses,
}) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const isMobile = useIsMobile()
  const crypto = account ? cryptocurrencies[account.crypto] : Object.values(cryptocurrencies)[0]
  const { wallets } = useWalletsContext()
  const wallet = wallets.find((w) => w.id === account.walletId)
  const [amount, setAmount] = React.useState<TokenAmount>({})
  const [delegations, setDelegations] = React.useState<Array<ValidatorTag>>([])
  const [memo, setMemo] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const signerInfo = useSignerInfo(account)

  const { password } = useWalletsContext()
  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory<ClaimRewardsStage>(
    ClaimRewardsStage.SelectValidatorsStage
  )

  const defaultGasFee = getTokenAmountFromDenoms(
    get(crypto, 'defaultGasFee.amount', []),
    tokensPrices
  )

  const transactionData = React.useMemo(
    () => ({
      address: account.address,
      password,
      transactions: delegations
        .map((r) => {
          return formatTransactionMsg(account.crypto, {
            type: 'withdraw reward',
            delegator: account.address,
            validator: r.address,
          })
        })
        .filter((a) => a),
      gasFee: get(crypto, 'defaultGasFee', {}),
      memo,
      ...signerInfo,
    }),
    [delegations, crypto, account, password, memo, signerInfo]
  )

  const confirm = React.useCallback(
    async (securityPassword: string, ledgerApp?: Cosmos) => {
      try {
        setLoading(true)
        const data = {
          securityPassword,
          ...transactionData,
        }
        await sendTransaction(data, ledgerApp, account.index)
        setLoading(false)
        setStage(ClaimRewardsStage.SuccessStage, true)
      } catch (err) {
        setLoading(false)
        console.log(err)
      }
    },
    [transactionData, account]
  )

  const confirmLast = React.useCallback(() => {
    setStage(
      wallet.type === 'ledger'
        ? ClaimRewardsStage.ConnectLedgerStage
        : ClaimRewardsStage.SecurityPasswordStage
    )
  }, [setStage])

  const confirmAmount = React.useCallback(
    (a: TokenAmount, d: Array<ValidatorTag>, m: string) => {
      setDelegations(d)
      setAmount(a)
      setMemo(m)
      setStage(ClaimRewardsStage.ConfirmWithdrawStage)
    },
    [setStage]
  )

  const content: Content = React.useMemo(() => {
    switch (stage) {
      case ClaimRewardsStage.SuccessStage:
        return {
          title: '',
          dialogWidth: 'xs',
          content: <Success onClose={onClose} content="rewards was successfully withdrew" />,
        }
      case ClaimRewardsStage.SecurityPasswordStage:
        return {
          title: '',
          dialogWidth: 'sm',
          content: <SecurityPassword onConfirm={confirm} loading={loading} />,
        }
      case ClaimRewardsStage.ConnectLedgerStage:
        return {
          title: t('connect ledger'),
          dialogWidth: 'sm',
          content: <ConnectLedgerDialogContent onConnect={(ledgerApp) => confirm('', ledgerApp)} />,
        }
      case ClaimRewardsStage.ConfirmWithdrawStage:
        return {
          title: '',
          dialogWidth: 'sm',
          content: (
            <ConfirmWithdraw
              account={account}
              crypto={crypto}
              amount={amount}
              gasFee={defaultGasFee}
              delegations={delegations}
              memo={memo}
              onConfirm={confirmLast}
              rawTransactionData={transactionData}
            />
          ),
        }
      case ClaimRewardsStage.SelectValidatorsStage:
      default:
        return {
          title: t('withdraw reward'),
          content: (
            <SelectValidators
              account={account}
              crypto={crypto}
              onConfirm={confirmAmount}
              validators={validators}
              preselectedValidatorAddresses={preselectedValidatorAddresses}
            />
          ),
        }
    }
  }, [stage, t])

  React.useEffect(() => {
    if (open) {
      setAmount({})
      setDelegations([])
      setMemo('')
      setLoading(false)
      setStage(ClaimRewardsStage.SelectValidatorsStage, true)
    }
  }, [open])

  return (
    <Dialog
      fullWidth
      maxWidth={content.dialogWidth || 'md'}
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
    >
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

export default ClaimRewardsDialog
