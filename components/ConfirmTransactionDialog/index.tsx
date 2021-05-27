import {
  Box,
  Button,
  Dialog,
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
import { formatCrypto, formatTokenAmount, getTokenAmountFromDenoms } from '../../misc/utils'
import useStyles from './styles'
import { useGeneralContext } from '../../contexts/GeneralContext'
import useIsMobile from '../../misc/useIsMobile'
import { useWalletsContext } from '../../contexts/WalletsContext'

const ReactJson = dynamic(() => import('react-json-view'), { ssr: false })

interface ConfirmTransactionDialogProps {
  address: string
  transactionData: Transaction
  denoms?: TokenPrice[]
  open: boolean
  onClose(): void
}

const ConfirmTransactionDialog: React.FC<ConfirmTransactionDialogProps> = ({
  address,
  transactionData,
  denoms,
  open,
  onClose,
}) => {
  const { t, lang } = useTranslation('common')
  const classes = useStyles()
  const theme = useTheme()
  const { theme: themeSetting } = useGeneralContext()
  const isMobile = useIsMobile()
  const [viewingData, setViewingData] = React.useState(false)

  const { accounts } = useWalletsContext()
  const account = accounts.find((a) => a.address === address)

  // TODO
  // 1. calculate total amount
  // 2. get tokens_prices by query
  // 3. render content by tx type
  // 4. redirect to enter security password / connect ledger
  // 5. send transaction by calling chrome ext

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} fullScreen={isMobile}>
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
