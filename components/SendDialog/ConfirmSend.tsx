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
import SendIcon from '../../assets/images/icons/icon_send_tx.svg'
import { formatCrypto } from '../../misc/utils'
import useStyles from './styles'

interface ConfirmSendProps {
  account: Account
  recipients: Array<{ amount: number; address: string }>
  memo: string
  onConfirm(): void
}

const ConfirmSend: React.FC<ConfirmSendProps> = ({ account, recipients, memo, onConfirm }) => {
  const { t, lang } = useTranslation('common')
  const classes = useStyles()
  const theme = useTheme()

  const totalAmount = React.useMemo(
    () => recipients.map((r) => r.amount).reduce((a, b) => a + b, 0),
    [recipients]
  )

  return (
    <>
      <DialogContent className={classes.dialogContent}>
        <Box display="flex" flexDirection="column" alignItems="center" mt={6}>
          <SendIcon width={theme.spacing(6)} height={theme.spacing(6)} />
          <Box mt={2} mb={4}>
            <Typography variant="h4">
              {t('send')} {formatCrypto(totalAmount, account.crypto, lang)}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box my={1}>
          <Typography>{t('from')}</Typography>
          <Typography variant="body2" color="textSecondary">
            {account.address}
          </Typography>
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
                {formatCrypto(r.amount, account.crypto, lang)}
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
            {0.00001} {account.crypto}
          </Typography>
        </Box>
        <Divider />
        <Box my={1} display="flex" justifyContent="flex-end">
          <Button variant="text" color="secondary">
            {t('view data')}
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
