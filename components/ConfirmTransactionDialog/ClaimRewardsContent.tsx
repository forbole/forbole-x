import React from 'react'
import { Box, Divider, Typography, useTheme } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import WithdrawIcon from '../../assets/images/icons/icon_withdraw_tx.svg'
import ValidatorAvatar from '../ValidatorAvatar'
import cryptocurrencies from '../../misc/cryptocurrencies'

interface ClaimRewardsContentProps {
  msgs: TransactionMsgWithdrawReward[]
  account: Account
  validators: { [address: string]: Validator }
}

const ClaimRewardsContent: React.FC<ClaimRewardsContentProps> = ({ msgs, account, validators }) => {
  const { t } = useTranslation()
  const theme = useTheme()
  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" mt={6}>
        <WithdrawIcon width={theme.spacing(6)} height={theme.spacing(6)} />
        <Box mt={2} mb={4}>
          <Typography variant="h4">
            {t('withdraw')} {account.crypto}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box my={1}>
        <Typography>{t('withdraw rewards from')}</Typography>
        {msgs.map((m, i) => (
          <React.Fragment key={m.value.validator_address}>
            <Box display="flex" justifyContent="space-between" alignItems="center" my={1.5}>
              <ValidatorAvatar
                crypto={cryptocurrencies[account.crypto]}
                validator={validators[m.value.validator_address]}
                size="small"
              />
            </Box>
            {i === msgs.length - 1 ? null : <Divider />}
          </React.Fragment>
        ))}
      </Box>
      <Divider />
    </>
  )
}

export default ClaimRewardsContent
