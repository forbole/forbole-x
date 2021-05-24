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
import { formatCrypto, formatTokenAmount } from '../../misc/utils'
import { Proposal } from './index'

const ReactJson = dynamic(() => import('react-json-view'), { ssr: false })

interface ConfirmAmountProps {
  account: Account
  proposal: Proposal
  gasFee: TokenAmount
  memo: string
  amount: number
  onConfirm(): void
  rawTransactionData: any
}

const ConfirmAmount: React.FC<ConfirmAmountProps> = ({
  account,
  gasFee,
  proposal,
  memo,
  onConfirm,
  amount,
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
          <Typography variant="h6">{t('deposit to')}</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {`${t('proposal')} #${proposal.id}`}
          </Typography>
        </Box>
        <Divider />
        <Box pt={1.5} pb={1.5}>
          <Typography variant="h6">{t('amount')}</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {formatCrypto(amount, account.crypto, lang)}
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
          onClick={() => onConfirm()}
        >
          {t('confirm')}
        </Button>
      </DialogActions>
    </>
  )
}

export default ConfirmAmount
