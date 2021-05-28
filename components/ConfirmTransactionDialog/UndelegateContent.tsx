import React from 'react'
import { Box, Divider, Typography, useTheme } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import DelegateIcon from '../../assets/images/icons/icon_delegate_tx.svg'
import { formatTokenAmount, getTokenAmountFromDenoms } from '../../misc/utils'
import ValidatorAvatar from '../ValidatorAvatar'
import cryptocurrencies from '../../misc/cryptocurrencies'

interface UndelegateContentProps {
  totalAmount: TokenAmount
  msgs: TransactionMsgUndelegate[]
  denoms: TokenPrice[]
  account: Account
  validators: { [address: string]: Validator }
}

const UndelegateContent: React.FC<UndelegateContentProps> = ({
  msgs,
  denoms,
  totalAmount,
  account,
  validators,
}) => {
  const { t, lang } = useTranslation()
  const theme = useTheme()
  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" mt={6}>
        <DelegateIcon width={theme.spacing(6)} height={theme.spacing(6)} />
        <Box mt={2} mb={4}>
          <Typography variant="h4">
            {t('undelegate')} {formatTokenAmount(totalAmount, account.crypto, lang, ', ')}
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
        <Typography>{t('undelegate from')}</Typography>
        {msgs.map((m, i) => (
          <React.Fragment key={m.value.validator_address}>
            <Box display="flex" justifyContent="space-between" alignItems="center" my={1.5}>
              <ValidatorAvatar
                crypto={cryptocurrencies[account.crypto]}
                validator={validators[m.value.validator_address]}
                size="small"
              />
              <Typography color="textSecondary">
                {formatTokenAmount(
                  getTokenAmountFromDenoms([m.value.amount], denoms || []),
                  account.crypto,
                  lang
                )}
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

export default UndelegateContent
