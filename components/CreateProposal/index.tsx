import React from 'react'
import {
  Box,
  Card,
  Button,
  DialogActions,
  DialogContent,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Avatar,
  Grid,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import keyBy from 'lodash/keyBy'
import useStateHistory from '../../misc/useStateHistory'
import useIconProps from '../../misc/useIconProps'
import { useGetStyles } from './styles'
import { useWalletsContext } from '../../contexts/WalletsContext'
import CreateProposalForm from './Create'

enum CreateProposalStage {
  Create = 'select amount',
  Confirm = 'select validators',
}

interface CreateProposlProps {
  accounts: Account[]
  // validators: Validator[]
  // defaultValidator?: Validator
  // availableTokens: { coins: Array<{ amount: string; denom: string }>; tokens_prices: TokenPrice[] }
  // open: boolean
  // onClose(): void
}


interface Content {
  // title: string
  content: React.ReactNode
  // dialogWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const CreateProposal: React.FC<CreateProposlProps> = ({ accounts }) => {
  const { t } = useTranslation('common')
  const { classes } = useGetStyles()
  const iconProps = useIconProps()
  const { password } = useWalletsContext()
  const [amount, setAmount] = React.useState(0)
  const [denom, setDenom] = React.useState('')
  const [delegations, setDelegations] = React.useState<
    Array<{ amount: number; validator: Validator }>
  >([])
  const [memo, setMemo] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const [stage, setStage] = useStateHistory<CreateProposalStage>(CreateProposalStage.Create)

  // const transactionData = React.useMemo(
  //   () => ({
  //     address: account.address,
  //     password,
  //     transactions: delegations
  //       .map((r) => {
  //         const coinsToSend = getEquivalentCoinToSend(
  //           { amount: r.amount, denom },
  //           availableTokens.coins,
  //           availableTokens.tokens_prices
  //         )
  //         return formatTransactionMsg(account.crypto, {
  //           type: 'delegate',
  //           delegator: account.address,
  //           validator: r.validator.address,
  //           ...coinsToSend,
  //         })
  //       })
  //       .filter((a) => a),
  //     gasFee: get(cryptocurrencies, `${account.crypto}.defaultGasFee`, {}),
  //     memo,
  //   }),
  //   [delegations, availableTokens, account, password, memo]
  // )

  // const { availableAmount, defaultGasFee } = React.useMemo(
  //   () => ({
  //     availableAmount: getTokenAmountFromDenoms(
  //       availableTokens.coins,
  //       availableTokens.tokens_prices
  //     ),
  //     defaultGasFee: getTokenAmountFromDenoms(
  //       get(cryptocurrencies, `${account.crypto}.defaultGasFee.amount`, []),
  //       availableTokens.tokens_prices
  //     ),
  //   }),
  //   [availableTokens]
  // )

  const confirmAmount = React.useCallback(
    (a: number, d: string) => {
      setAmount(a)
      setDenom(d)
      setDelegations([{ amount: a, validator: (defaultValidator || {}) as Validator }])
      setStage(DelegationStage.SelectValidatorsStage)
    },
    [setAmount, setStage, defaultValidator]
  )

  const confirmDelegations = React.useCallback(
    (d: Array<{ amount: number; validator: Validator }>, m: string) => {
      setDelegations(d)
      setMemo(m)
      setStage(DelegationStage.ConfirmDelegationStage)
    },
    [setStage]
  )

  // const sendTransactionMessage = React.useCallback(
  //   async (securityPassword: string) => {
  //     try {
  //       setLoading(true)
  //       const result = await sendMsgToChromeExt({
  //         event: 'signAndBroadcastTransactions',
  //         data: {
  //           securityPassword,
  //           ...transactionData,
  //         },
  //       })
  //       console.log(result)
  //       setLoading(false)
  //       setStage(DelegationStage.SuccessStage, true)
  //     } catch (err) {
  //       setLoading(false)
  //       console.log(err)
  //     }
  //   },
  //   [transactionData]
  // )

  const content: Content = React.useMemo(() => {
    switch (stage) {
      case CreateProposalStage.Confirm:
        return {
          content: (
            <SelectValidators
              account={account}
              delegations={delegations}
              validators={validators}
              amount={amount}
              denom={denom}
              onConfirm={confirmDelegations}
            />
          ),
        }
      case CreateProposalStage.Create:
      default:
        return {
          content: <CreateProposalForm accounts={accounts} />,
        }
    }
  }, [stage, t])

  React.useEffect(() => {
    if (open) {
      setAmount(0)
      setDenom('')
      setDelegations([])
      setMemo('')
      setLoading(false)
      setStage(DelegationStage.SelectAmountStage, true)
    }
  }, [open])

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

export default DelegationDialog