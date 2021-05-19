import {
  Button,
  DialogActions,
  DialogContent,
  Divider,
  Typography,
  useTheme,
  Box,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import dynamic from 'next/dynamic'
import { useGeneralContext } from '../../contexts/GeneralContext'
import useStyles from './styles'
import { formatTokenAmount } from '../../misc/utils'
import { Proposal } from './index'

const ReactJson = dynamic(() => import('react-json-view'), { ssr: false })

interface ConfirmWithdrawProps {
  account: Account
  proposal: Proposal
  gasFee: TokenAmount
  memo: string
  answer: { id: string; name: string }
  onConfirm(
    account: Account,
    proposal: Proposal,
    memo: string,
    answer: { id: string; name: string }
  ): void
  rawTransactionData: any
}

const ConfirmAnswer: React.FC<ConfirmWithdrawProps> = ({
  account,
  gasFee,
  proposal,
  memo,
  onConfirm,
  answer,
  rawTransactionData,
}) => {
  const { t, lang } = useTranslation('common')
  const classes = useStyles()
  const theme = useTheme()
  const { theme: themeSetting } = useGeneralContext()
  const [viewData, setViewData] = React.useState(false)
  const toggleViewData = () => {
    setViewData(!viewData)
  }

  return (
    <>
      <DialogContent className={classes.dialogContent} />
      <Box p={3}>
        <Divider />
        <Box pt={1.5} pb={1.5}>
          <Typography variant="h6">{t('address')}</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {account.address}
          </Typography>
        </Box>
        <Divider />
        <Box pt={1.5} pb={1.5}>
          <Typography variant="h6">{`${t('vote proposal')} #${proposal.no}`}</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {answer.name}
          </Typography>
        </Box>
        <Divider />
        <Box pt={1.5} pb={1.5}>
          <Typography variant="h6">{t('memo')}</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {memo || 'N/A'}
          </Typography>
        </Box>
        <Divider />
        <Box pt={1.5} pb={1.5}>
          <Typography variant="h6">{t('fee')}</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {formatTokenAmount(gasFee, account.crypto, lang)}
          </Typography>
        </Box>
        <Divider />
        <Box my={1} display="flex" justifyContent="flex-end">
          <Button variant="text" color="primary" onClick={toggleViewData}>
            {t('view data')}
          </Button>
        </Box>
        {viewData ? (
          <Box flex={1} overflow="auto">
            <ReactJson
              src={rawTransactionData}
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
      </Box>
      <DialogActions>
        <Button
          variant="contained"
          className={classes.fullWidthButton}
          color="primary"
          onClick={() => onConfirm(account, proposal, memo, answer)}
        >
          {t('confirm')}
        </Button>
      </DialogActions>
    </>
  )
}

export default ConfirmAnswer
