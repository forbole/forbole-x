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
import WithdrawIcon from '../../assets/images/icons/icon_withdraw_tx.svg'
import { useGeneralContext } from '../../contexts/GeneralContext'
import useStyles from './styles'
import { ValidatorTag } from './index'
import { formatTokenAmount } from '../../misc/utils'

const ReactJson = dynamic(() => import('react-json-view'), { ssr: false })

interface ConfirmWithdrawProps {
  account: Account
  amount: TokenAmount
  gasFee: TokenAmount
  delegations: Array<ValidatorTag>
  memo: string
  onConfirm(amount: TokenAmount, delegations: Array<ValidatorTag>, m: string): void
  rawTransactionData: any
}

const ConfirmWithdraw: React.FC<ConfirmWithdrawProps> = ({
  amount,
  gasFee,
  account,
  delegations,
  memo,
  onConfirm,
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
      <DialogContent className={classes.dialogContent}>
        <Box display="flex" flexDirection="column" alignItems="center" mt={6}>
          <WithdrawIcon width={theme.spacing(6)} height={theme.spacing(6)} />
          <Box mt={2} mb={4}>
            <Typography variant="h4">
              {t('withdraw')} {formatTokenAmount(amount, account.crypto, lang, ', ')}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box my={1}>
          <Typography>{t('rewards')}</Typography>
          <Typography variant="body2" color="textSecondary">
            {formatTokenAmount(amount, account.crypto, lang, ', ')}
          </Typography>
        </Box>
        <Divider />
        <Box my={1}>
          <Typography>{t('withdraw rewards from')}</Typography>
          {delegations.map((d, i) => (
            <React.Fragment key={d.name}>
              <Box display="flex" justifyContent="space-between" alignItems="center" my={1.5}>
                <Box display="flex" alignItems="center">
                  <Avatar className={classes.validatorAvatar} alt={d.name} src={d.image} />
                  <Typography color="textSecondary">{d.name}</Typography>
                </Box>
                <Typography color="textSecondary">
                  {formatTokenAmount(d.rewards, account.crypto, lang, ', ')}
                </Typography>
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
          <Typography color="textSecondary">
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
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          className={classes.fullWidthButton}
          color="primary"
          onClick={() => onConfirm(amount, delegations, memo)}
        >
          {t('confirm')}
        </Button>
      </DialogActions>
    </>
  )
}

export default ConfirmWithdraw
