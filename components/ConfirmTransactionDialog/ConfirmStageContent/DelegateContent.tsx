import React from 'react'
import { Box, Divider, Typography, useTheme } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import DelegateIcon from '../../../assets/images/icons/icon_delegate_tx.svg'
import { formatTokenAmount, getTokenAmountFromDenoms } from '../../../misc/utils'
import ValidatorAvatar from '../../ValidatorAvatar'
import cryptocurrencies from '../../../misc/cryptocurrencies'

interface DelegateContentProps {
  totalAmount: TokenAmount
  msgs: TransactionMsgDelegate[]
  denoms: TokenPrice[]
  account: Account
  validators: { [address: string]: Validator }
}

const DelegateContent: React.FC<DelegateContentProps> = ({
  msgs,
  denoms,
  totalAmount,
  account,
  validators,
}) => {
  const { t, lang } = useTranslation('common')
  const theme = useTheme()
  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" mt={6}>
        <DelegateIcon width={theme.spacing(6)} height={theme.spacing(6)} />
        <Box mt={2} mb={4}>
          <Typography variant="h4">
            {t('delegate')}{' '}
            {formatTokenAmount(totalAmount, { defaultUnit: account.crypto, lang, delimiter: ', ' })}
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
        {msgs.map((m, i) => (
          <React.Fragment key={m.value.validatorAddress}>
            <Box display="flex" justifyContent="space-between" alignItems="center" my={1.5}>
              <ValidatorAvatar
                crypto={cryptocurrencies[account.crypto]}
                validator={validators[m.value.validatorAddress]}
                size="small"
              />
              <Typography color="textSecondary">
                {formatTokenAmount(getTokenAmountFromDenoms([m.value.amount], denoms || []), {
                  defaultUnit: account.crypto,
                  lang,
                })}
              </Typography>
            </Box>
            {i === msgs.length - 1 ? null : <Divider />}
          </React.Fragment>
        ))}
      </Box>
      <Divider />
    </>
  )
}

export default DelegateContent
