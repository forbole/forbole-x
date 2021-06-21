import { Dialog, DialogTitle, IconButton } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import flatten from 'lodash/flatten'
import keyBy from 'lodash/keyBy'
import get from 'lodash/get'
import { gql, useSubscription } from '@apollo/client'
import useStateHistory from '../../misc/useStateHistory'
import { formatTokenAmount, getTokenAmountFromDenoms, transformValidators } from '../../misc/utils'
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
import sendMsgToChromeExt from '../../misc/sendMsgToChromeExt'
import cryptocurrencies from '../../misc/cryptocurrencies'
import useSignerInfo from '../../misc/useSignerInfo'
import signAndBroadcastTransaction from '../../misc/signAndBroadcastTransaction'

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
  transactionData: defaultTransactionData,
  open,
  onClose,
}) => {
  const { t, lang } = useTranslation('common')
  const classes = useStyles()
  const isMobile = useIsMobile()
  const iconProps = useIconProps()

  const { accounts, password, wallets } = useWalletsContext()
  const account = accounts.find((a) => a.address === address)
  const wallet = account ? wallets.find((w) => w.id === account.walletId) : undefined
  const crypto = account ? account.crypto : Object.keys(cryptocurrencies)[0]

  const { data: denomsData } = useSubscription(gql`
    ${getTokensPrices(crypto)}
  `)
  const denoms = get(denomsData, 'token_price', [])
  const signerInfo = useSignerInfo(account)
  const transactionData = React.useMemo(() => {
    return account
      ? {
          fee: {
            amount: get(cryptocurrencies, `${account.crypto}.defaultGasFee.amount`, []),
            gas: String(
              defaultTransactionData.msgs
                .map((m) =>
                  Number(get(cryptocurrencies, `${account.crypto}.defaultGasFee.gas.${m.type}`, 0))
                )
                .reduce((a, b) => a + b, 0)
            ),
          },
          ...signerInfo,
          ...defaultTransactionData,
        }
      : {
          msgs: [],
          fee: {
            amount: '0',
            gas: '0',
          },
          memo: '',
        }
  }, [account, signerInfo, defaultTransactionData])

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

  const totalAmount = getTokenAmountFromDenoms(
    flatten(transactionData.msgs.map((msg) => (msg.value as any).amount).filter((a) => a)),
    denoms
  )

  const successMessage = React.useMemo(() => {
    switch (get(transactionData, 'msgs[0].type', '')) {
      case 'cosmos-sdk/MsgSend':
        return t('successfully sent', {
          title: formatTokenAmount(totalAmount, crypto, lang),
        })
      case 'cosmos-sdk/MsgDelegate':
        return t('successfully delegated', {
          title: formatTokenAmount(totalAmount, crypto, lang),
        })
      case 'cosmos-sdk/MsgBeginRedelegate':
        return t('successfully redelegated', {
          title: formatTokenAmount(totalAmount, crypto, lang),
        })
      case 'cosmos-sdk/MsgUndelegate':
        return t('successfully undelegated', {
          title: formatTokenAmount(totalAmount, crypto, lang),
        })
      case 'cosmos-sdk/MsgWithdrawDelegationReward':
        return t('rewards was successfully withdrew')
      default:
        return ''
    }
  }, [transactionData, t, totalAmount, crypto, lang])

  const { data: validatorsData } = useSubscription(
    gql`
      ${getValidatorsByAddresses(crypto)}
    `,
    {
      variables: {
        addresses: validatorsAddresses,
      },
    }
  )

  const validators = keyBy(transformValidators(validatorsData), 'address')

  const [stage, setStage, toPrevStage, isPrevStageAvailable] =
    useStateHistory<ConfirmTransactionStage>(ConfirmTransactionStage.ConfirmStage)

  const [loading, setLoading] = React.useState(false)

  const confirm = React.useCallback(
    async (securityPassword?: string) => {
      try {
        setLoading(true)
        await signAndBroadcastTransaction(password, account, transactionData, securityPassword)
        setLoading(false)
        setStage(ConfirmTransactionStage.SuccessStage, true)
      } catch (err) {
        console.log(err)
      }
    },
    [account, transactionData, password]
  )

  const content: Content = React.useMemo(() => {
    switch (stage) {
      case ConfirmTransactionStage.ConfirmStage:
        return {
          title: '',
          dialogWidth: 'sm',
          content: (
            <ConfirmStageContent
              totalAmount={totalAmount}
              denoms={denoms}
              transactionData={transactionData}
              account={account}
              validators={validators}
              onConfirm={() =>
                setStage(
                  get(wallet, 'type', '') === 'ledger'
                    ? ConfirmTransactionStage.ConnectLedgerStage
                    : ConfirmTransactionStage.SecurityPasswordStage
                )
              }
            />
          ),
        }
      case ConfirmTransactionStage.SecurityPasswordStage:
        return {
          title: '',
          dialogWidth: 'sm',
          content: (
            <SecurityPasswordDialogContent
              walletId={account.walletId}
              onConfirm={confirm}
              loading={loading}
            />
          ),
        }
      case ConfirmTransactionStage.ConnectLedgerStage:
        return {
          title: '',
          dialogWidth: 'sm',
          content: <ConnectLedgerDialogContent onConnect={confirm} />,
        }
      case ConfirmTransactionStage.SuccessStage:
      default:
        return {
          title: '',
          dialogWidth: 'sm',
          content: (
            <SuccessContent
              message={successMessage}
              onClose={() => sendMsgToChromeExt({ event: 'closeChromeExtension' })}
            />
          ),
        }
    }
  }, [stage, t, transactionData, account, validators, wallet, confirm, successMessage, totalAmount])

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
      {account && wallet && denoms ? content.content : null}
    </Dialog>
  )
}

export default ConfirmTransactionDialog
