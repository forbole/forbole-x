import React from 'react'
import { Box, Divider, Typography, useTheme } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import DelegateIcon from '../../../assets/images/icons/icon_delegate_tx.svg'
import { formatTokenAmount, getTokenAmountFromDenoms } from '../../../misc/utils'
import ValidatorAvatar from '../../ValidatorAvatar'
import cryptocurrencies from '../../../misc/cryptocurrencies'

interface RedelegateContentProps {
  totalAmount: TokenAmount
  msgs: TransactionMsgRedelegate[]
  denoms: TokenPrice[]
  account: Account
  validators: { [address: string]: Validator }
}

const RedelegateContent: React.FC<RedelegateContentProps> = ({
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
            {t('redelegate')}{' '}
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
      {msgs.map((m) => (
        <React.Fragment key={m.value.validatorDstAddress}>
          <Box my={1}>
            <Typography>{t('redelegate from')}</Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center" my={1.5}>
              <ValidatorAvatar
                crypto={cryptocurrencies[account.crypto]}
                validator={validators[m.value.validatorSrcAddress]}
                size="small"
              />
            </Box>
          </Box>
          <Divider />
          <Box my={1}>
            <Typography>{t('redelegate to')}</Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center" my={1.5}>
              <ValidatorAvatar
                crypto={cryptocurrencies[account.crypto]}
                validator={validators[m.value.validatorDstAddress]}
                size="small"
              />
              <Typography color="textSecondary">
                {formatTokenAmount(getTokenAmountFromDenoms([m.value.amount], denoms || []), {
                  defaultUnit: account.crypto,
                  lang,
                })}
              </Typography>
            </Box>
          </Box>
        </React.Fragment>
      ))}
      <Divider />
    </>
  )
}

export default RedelegateContent
