import {
  Avatar,
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
import DelegateIcon from '../../assets/images/icons/icon_delegate_tx.svg'
import { useGeneralContext } from '../../contexts/GeneralContext'
import { formatCrypto, formatTokenAmount } from '../../misc/utils'
import useStyles from './styles'

const ReactJson = dynamic(() => import('react-json-view'), { ssr: false })

interface ConfirmUndelegationProps {
  account: Account
  amount: number
  denom: string
  validator: Validator
  gasFee: TokenAmount
  memo: string
  onConfirm(): void
  rawTransactionData: any
}

const ConfirmUndelegation: React.FC<ConfirmUndelegationProps> = ({
  account,
  amount,
  denom,
  gasFee,
  validator,
  memo,
  onConfirm,
  rawTransactionData,
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
          <DelegateIcon width={theme.spacing(6)} height={theme.spacing(6)} />
          <Box mt={2} mb={4}>
            <Typography variant="h4">
              {t('undelegate')} {formatCrypto(amount, denom, lang)}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box my={1}>
          <Typography>{t('address')}</Typography>
          <Typography variant="body2" color="textSecondary">
            {account.address}
          </Typography>
        </Box>
        <Divider />
        <Box my={1}>
          <Typography>{t('undelegate from')}</Typography>
          <Box display="flex" justifyContent="space-between" alignItems="center" my={1.5}>
            <Box display="flex" alignItems="center">
              <Avatar
                className={classes.validatorAvatar}
                alt={validator.name}
                src={validator.image}
              />
              <Typography color="textSecondary">{validator.name}</Typography>
            </Box>
            <Typography color="textSecondary">{formatCrypto(amount, denom, lang)}</Typography>
          </Box>
        </Box>
        <Divider />
        <Box my={1}>
          <Typography gutterBottom>{t('memo')}</Typography>
          <Typography color="textSecondary">{memo || t('NA')}</Typography>
        </Box>
        <Divider />
        <Box my={1}>
          <Typography gutterBottom>{t('fee')}</Typography>
          <Typography color="textSecondary">{formatTokenAmount(gasFee, denom, lang)}</Typography>
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
          <Button variant="text" color="secondary" onClick={() => setViewingData((v) => !v)}>
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

export default ConfirmUndelegation
