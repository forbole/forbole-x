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
import DelegateIcon from '../../assets/images/icons/icon_delegate_tx.svg'
import { useGeneralContext } from '../../contexts/GeneralContext'
import { formatCrypto, formatTokenAmount } from '../../misc/utils'
import useStyles from './styles'
import ValidatorAvatar from '../ValidatorAvatar'

const ReactJson = dynamic(() => import('react-json-view'), { ssr: false })

interface ConfirmDelegationProps {
  account: Account
  crypto: Cryptocurrency
  amount: number
  delegations: Array<{ amount: number; validator: Validator }>
  denom: string
  gasFee: TokenAmount
  memo: string
  onConfirm(): void
  rawTransactionData: any
}

const ConfirmDelegation: React.FC<ConfirmDelegationProps> = ({
  account,
  crypto,
  amount,
  denom,
  gasFee,
  delegations,
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
              {t('delegate')} {formatCrypto(amount, denom, lang)}
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
        <Box my={1}>
          <Typography>{t('delegate to')}</Typography>
          {delegations.map((d, i) => (
            <React.Fragment key={d.validator.name}>
              <Box display="flex" justifyContent="space-between" alignItems="center" my={1.5}>
                <ValidatorAvatar crypto={crypto} validator={d.validator} size="small" />
                <Typography color="textSecondary">{formatCrypto(d.amount, denom, lang)}</Typography>
              </Box>
              {i === delegations.length - 1 ? null : <Divider />}
            </React.Fragment>
          ))}
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
        <Box my={1} display="flex" justifyContent="flex-end">
          <Button variant="text" color="primary" onClick={() => setViewingData((v) => !v)}>
            {t(viewingData ? 'hide data' : 'view data')}
          </Button>
        </Box>
        {viewingData ? (
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

export default ConfirmDelegation
