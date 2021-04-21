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
import SendIcon from '../../assets/images/icons/icon_send_tx.svg'
import { formatCrypto, formatTokenAmount } from '../../misc/utils'
import useStyles from './styles'
import { useGeneralContext } from '../../contexts/GeneralContext'

const ReactJson = dynamic(() => import('react-json-view'), { ssr: false })

interface ConfirmSendProps {
  account: Account
  recipients: Array<{ amount: { amount: number; denom: string }; address: string }>
  totalAmount: TokenAmount
  gasFee: TokenAmount
  memo: string
  rawTransactionData: any
  onConfirm(): void
}

const ConfirmSend: React.FC<ConfirmSendProps> = ({
  account,
  totalAmount,
  recipients,
  gasFee,
  memo,
  rawTransactionData,
  onConfirm,
}) => {
  const { t, lang } = useTranslation('common')
  const classes = useStyles()
  const theme = useTheme()
  const { theme: themeSetting } = useGeneralContext()
  const [viewingData, setViewingData] = React.useState(false)

  return (
    <>
      <DialogContent className={classes.dialogContent}>
        <Box display="flex" flexDirection="column" alignItems="center" mt={6}>
          <SendIcon width={theme.spacing(6)} height={theme.spacing(6)} />
          <Box mt={2} mb={4}>
            <Typography variant="h4">
              {t('send')} {formatTokenAmount(totalAmount, account.crypto, lang, ', ')}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box my={1}>
          <Typography>{t('from')}</Typography>
          <Typography color="textSecondary">{account.address}</Typography>
        </Box>
        <Divider />
        {recipients.map((r, i) => (
          <React.Fragment key={r.address}>
            <Box my={1}>
              <Typography>{t('send to', { number: `# ${i + 1}` })}</Typography>
              <Typography color="textSecondary" gutterBottom>
                {r.address}
              </Typography>
              <Typography>{t('amount')}</Typography>
              <Typography color="textSecondary">
                {formatCrypto(r.amount.amount, r.amount.denom, lang)}
              </Typography>
            </Box>
            <Divider />
          </React.Fragment>
        ))}
        <Box my={1}>
          <Typography gutterBottom>{t('memo')}</Typography>
          <Typography color="textSecondary">{memo || t('NA')}</Typography>
        </Box>
        <Divider />
        <Box my={1}>
          <Typography gutterBottom>{t('fee')}</Typography>
          <Typography color="textSecondary">
            {formatTokenAmount(gasFee, account.crypto, lang)}
          </Typography>
        </Box>
        <Divider />
        {viewingData ? (
          <ReactJson
            src={rawTransactionData}
            displayDataTypes={false}
            displayObjectSize={false}
            enableClipboard={false}
            name={false}
            indentWidth={2}
            theme={themeSetting === 'dark' ? 'google' : 'rjv-default'}
          />
        ) : null}
        <Box my={1} display="flex" justifyContent="flex-end">
          <Button onClick={() => setViewingData((v) => !v)} variant="text" color="secondary">
            {t(viewingData ? 'hide data' : 'view data')}
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
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

export default ConfirmSend
