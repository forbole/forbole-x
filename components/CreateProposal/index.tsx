import React from 'react'
import {
  Box,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Avatar,
  Grid,
  Breadcrumbs,
  Link as MLink,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import keyBy from 'lodash/keyBy'
import useStateHistory from '../../misc/useStateHistory'
import useIconProps from '../../misc/useIconProps'
import { useGetStyles } from './styles'
import { useWalletsContext } from '../../contexts/WalletsContext'
import CreateProposalForm from './CreateProposalContent'
import ConfirmProposalContent from './ConfirmProposalContent'
import Account from '../../pages/account/[address]'
import Layout from '../Layout'
import SecurityPassword from '../SecurityPasswordDialogContent'
import sendMsgToChromeExt from '../../misc/sendMsgToChromeExt'

enum CreateProposalStage {
  Create = 'select amount',
  Confirm = 'select validators',
}

export interface Proposal {
  proposalAccount: Account
  network: { name: string; id: string }
  type: { name: string; id: string }
  title: string
  description: string
  memo?: string
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
  title: string
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
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const [proposal, setProposal] = React.useState<Proposal>()

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

  const createDraft = React.useCallback(
    (
      proposalAccount: Account,
      network: { name: string; id: string },
      type: { name: string; id: string },
      title: string,
      description: string,
      memo?: string
    ) => {
      setProposal({ proposalAccount, network, type, title, description, memo })
      setStage(CreateProposalStage.Confirm)
    },
    [setStage]
  )

  const enterPassword = () => {
    setOpen(true)
  }

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
  const transactionData = {}

  const confirmWithPassword = React.useCallback(
    async (securityPassword: string) => {
      try {
        setLoading(true)
        const result = await sendMsgToChromeExt({
          event: 'signAndBroadcastTransactions',
          data: {
            securityPassword,
            ...transactionData,
          },
        })
        // console.log(result)
        setLoading(false)
        // setStage(DelegationStage.SuccessStage, true)
      } catch (err) {
        setLoading(false)
        console.log(err)
      }
    },
    [transactionData]
  )

  const content: Content = React.useMemo(() => {
    switch (stage) {
      case CreateProposalStage.Confirm:
        return {
          title: 'proposal/create proposal/confirm proposal',
          content: (
            <ConfirmProposalContent
              accounts={accounts}
              proposal={proposal}
              onConfirm={enterPassword}
            />
          ),
        }
      case CreateProposalStage.Create:
      default:
        return {
          title: 'proposal/create proposal',
          content: <CreateProposalForm accounts={accounts} onNext={createDraft} />,
        }
    }
  }, [stage, t])

  return (
    <Layout
      passwordRequired
      activeItem="/proposals"
      HeaderLeftComponent={
        <Breadcrumbs>
          <MLink color="textPrimary">{t(content.title)}</MLink>
        </Breadcrumbs>
      }
    >
      {content.content}
      <Dialog fullWidth maxWidth="sm" open={open}>
        <SecurityPassword onConfirm={confirmWithPassword} loading={loading} />
      </Dialog>
    </Layout>
  )
}

export default CreateProposal
