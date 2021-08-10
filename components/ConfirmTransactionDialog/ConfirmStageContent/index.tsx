import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Divider,
  Typography,
  useTheme,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import dynamic from 'next/dynamic'
import { formatTokenAmount, getTokenAmountFromDenoms } from '../../../misc/utils'
import useStyles from '../styles'
import SendContent from './SendContent'
import DelegateContent from './DelegateContent'
import RedelegateContent from './RedelegateContent'
import UndelegateContent from './UndelegateContent'
import ClaimRewardsContent from './ClaimRewardsContent'
import { useGeneralContext } from '../../../contexts/GeneralContext'
import { CustomTheme } from '../../../misc/theme'
import IBCTransferContent from './IBCTransferContent'
import SubmitProposalContent from './SubmitProposalContent'
import VoteContent from './VoteContent'

const ReactJson = dynamic(() => import('react-json-view'), { ssr: false })

interface ConfirmStageContentProps {
  account: Account
  denoms: TokenPrice[]
  validators: { [address: string]: Validator }
  transactionData: Transaction
  onConfirm(): void
  totalAmount: TokenAmount
}

const ConfirmStageContent: React.FC<ConfirmStageContentProps> = ({
  account,
  denoms,
  validators,
  transactionData,
  onConfirm,
  totalAmount,
}) => {
  const { t, lang } = useTranslation('common')
  const classes = useStyles()
  const { theme } = useGeneralContext()
  const themeStyle: CustomTheme = useTheme()

  const [viewingData, setViewingData] = React.useState(false)

  const { type } = transactionData.msgs[0]

  const content = React.useMemo(() => {
    switch (type) {
      case 'cosmos-sdk/MsgSend':
        return (
          <SendContent
            account={account}
            denoms={denoms}
            totalAmount={totalAmount}
            msgs={transactionData.msgs as TransactionMsgSend[]}
          />
        )
      case 'cosmos-sdk/MsgDelegate':
        return (
          <DelegateContent
            account={account}
            denoms={denoms}
            totalAmount={totalAmount}
            msgs={transactionData.msgs as TransactionMsgDelegate[]}
            validators={validators}
          />
        )
      case 'cosmos-sdk/MsgUndelegate':
        return (
          <UndelegateContent
            account={account}
            denoms={denoms}
            totalAmount={totalAmount}
            msgs={transactionData.msgs as TransactionMsgUndelegate[]}
            validators={validators}
          />
        )
      case 'cosmos-sdk/MsgBeginRedelegate':
        return (
          <RedelegateContent
            account={account}
            denoms={denoms}
            totalAmount={totalAmount}
            msgs={transactionData.msgs as TransactionMsgRedelegate[]}
            validators={validators}
          />
        )
      case 'cosmos-sdk/MsgWithdrawDelegationReward':
        return (
          <ClaimRewardsContent
            account={account}
            msgs={transactionData.msgs as TransactionMsgWithdrawReward[]}
            validators={validators}
          />
        )
      case 'cosmos-sdk/MsgTransfer':
        return (
          <IBCTransferContent
            account={account}
            denoms={denoms}
            totalAmount={totalAmount}
            msgs={transactionData.msgs as TransactionMsgIBCTransfer[]}
          />
        )
      case 'cosmos-sdk/MsgSubmitProposal':
        return (
          <SubmitProposalContent
            account={account}
            msgs={transactionData.msgs as TransactionMsgSubmitProposal[]}
          />
        )
      case 'cosmos-sdk/MsgVote':
        return <VoteContent msgs={transactionData.msgs as TransactionMsgVote[]} />
      default:
        return null
    }
  }, [type, validators, account, transactionData, totalAmount, denoms])

  return (
    <>
      <DialogContent className={classes.dialogContent}>
        {content}
        <Box my={1}>
          <Typography gutterBottom>{t('memo')}</Typography>
          <Typography color="textSecondary">{transactionData.memo || t('NA')}</Typography>
        </Box>
        <Divider />
        <Box my={1}>
          <Typography gutterBottom>{t('fee')}</Typography>
          <Typography color="textSecondary">
            {formatTokenAmount(
              getTokenAmountFromDenoms(transactionData.fee.amount, denoms || []),
              account.crypto,
              lang
            )}
          </Typography>
        </Box>
        <Divider />
        <Box my={1} display="flex" justifyContent="flex-end">
          <Button onClick={() => setViewingData((v) => !v)} variant="text" color="primary">
            {t(viewingData ? 'hide data' : 'view data')}
          </Button>
        </Box>
        {viewingData ? (
          <Box flex={1} overflow="auto">
            <ReactJson
              src={transactionData}
              style={{
                backgroundColor: themeStyle.palette.reactJsonBackground,
                borderRadius: themeStyle.spacing(1),
                padding: themeStyle.spacing(1),
                overflowX: 'auto',
              }}
              displayDataTypes={false}
              displayObjectSize={false}
              enableClipboard={false}
              name={false}
              indentWidth={2}
              theme={theme === 'dark' ? 'google' : 'rjv-default'}
            />
          </Box>
        ) : null}
      </DialogContent>
      <DialogActions className={classes.dialogContent}>
        <Button
          variant="contained"
          className={classes.fullWidthButton}
          color="primary"
          onClick={onConfirm}
        >
          {t('confirm')}
        </Button>
      </DialogActions>
    </>
  )
}

export default ConfirmStageContent
