import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Typography,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import dynamic from 'next/dynamic'
import flatten from 'lodash/flatten'
import keyBy from 'lodash/keyBy'
import { gql, useSubscription } from '@apollo/client'
import { formatTokenAmount, getTokenAmountFromDenoms, transformValidators } from '../../misc/utils'
import useStyles from './styles'
import { useGeneralContext } from '../../contexts/GeneralContext'
import useIsMobile from '../../misc/useIsMobile'
import { useWalletsContext } from '../../contexts/WalletsContext'
import { getTokensPrices } from '../../graphql/queries/tokensPrices'
import SendContent from './SendContent'
import DelegateContent from './DelegateContent'
import RedelegateContent from './RedelegateContent'
import UndelegateContent from './UndelegateContent'
import ClaimRewardsContent from './ClaimRewardsContent'
import { getValidatorsByAddresses } from '../../graphql/queries/validators'

const ReactJson = dynamic(() => import('react-json-view'), { ssr: false })

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
  const { theme: themeSetting } = useGeneralContext()
  const isMobile = useIsMobile()
  const [viewingData, setViewingData] = React.useState(false)

  const { accounts } = useWalletsContext()
  const account = accounts.find((a) => a.address === address)

  const { data: denoms } = useSubscription(gql`
    ${getTokensPrices(account.crypto)}
  `)

  const totalAmount = getTokenAmountFromDenoms(
    flatten(transactionData.msgs.map((msg) => (msg.value as any).amount).filter((a) => a)),
    denoms
  )

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
      default:
        return null
    }
  }, [type])

  // TODO

  // 4. redirect to enter security password / connect ledger
  // 5. send transaction by calling chrome ext

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} fullScreen={isMobile}>
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
              getTokenAmountFromDenoms([transactionData.fee], denoms || []),
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
              style={{ backgroundColor: 'transparent' }}
              displayDataTypes={false}
              displayObjectSize={false}
              enableClipboard={false}
              name={false}
              indentWidth={2}
              theme={themeSetting === 'dark' ? 'google' : 'rjv-default'}
            />
          </Box>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          className={classes.fullWidthButton}
          color="primary"
          onClick={() => null}
        >
          {t('confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmTransactionDialog
