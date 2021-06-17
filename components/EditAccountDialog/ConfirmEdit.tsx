import { Box, DialogContent, Typography, DialogActions, Button, Divider } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import dynamic from 'next/dynamic'
import useStyles from './styles'
import { useGeneralContext } from '../../contexts/GeneralContext'
import { formatTokenAmount } from '../../misc/utils'

const ReactJson = dynamic(() => import('react-json-view'), { ssr: false })

interface ConfirmEditProps {
  currentRewardAddress: string
  newRewardAddress: string
  memo?: string
  gasFee: TokenAmount
  onConfirm(r: string): void
  rawTransactionData: any
  denom: string
}

const ConfirmEdit: React.FC<ConfirmEditProps> = ({
  currentRewardAddress,
  newRewardAddress,
  memo,
  gasFee,
  onConfirm,
  rawTransactionData,
  denom,
}) => {
  const { t, lang } = useTranslation('common')
  const classes = useStyles()
  const { theme: themeSetting } = useGeneralContext()
  const [viewingData, setViewingData] = React.useState(false)

  return (
    <>
      <DialogContent className={classes.dialogContent}>
        <Box my={2}>
          <Box>
            <Box my={1.5}>
              <Typography>{t('current reward address')}</Typography>
              <Typography color="textSecondary">{currentRewardAddress}</Typography>
            </Box>
            <Divider className={classes.divider} />
            <Box my={1.5}>
              <Typography>{t('new reward address')}</Typography>
              <Typography color="textSecondary">{newRewardAddress}</Typography>
            </Box>
            <Divider className={classes.divider} />
            <Box my={1.5}>
              <Typography>{t('memo')}</Typography>
              <Typography color="textSecondary">{memo}</Typography>
            </Box>
            <Divider className={classes.divider} />
            <Box my={1.5}>
              <Typography>{t('fee')}</Typography>
              <Typography color="textSecondary">
                {formatTokenAmount(gasFee, denom, lang)}
              </Typography>
            </Box>
            <Divider className={classes.divider} />
          </Box>
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
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          className={classes.nextButton}
          color="primary"
          onClick={() => onConfirm}
        >
          {t('next')}
        </Button>
      </DialogActions>
    </>
  )
}

export default ConfirmEdit
