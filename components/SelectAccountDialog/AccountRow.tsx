import {
  Box,
  CircularProgress,
  FormControlLabel,
  Radio,
  Typography,
  useTheme,
} from '@material-ui/core'
import React from 'react'
import { gql, useQuery } from '@apollo/client'
import useTranslation from 'next-translate/useTranslation'
import { getLatestAccountBalance } from '../../graphql/queries/accountBalances'
import {
  transformGqlAcountBalance,
  getTotalBalance,
  getTotalTokenAmount,
  formatTokenAmount,
} from '../../misc/utils'
import useStyles from './styles'

interface AccountRowProps {
  account: Account
}

const AccountRow: React.FC<AccountRowProps> = ({ account }) => {
  const { t, lang } = useTranslation('common')
  const classes = useStyles()
  const theme = useTheme()
  const { data: balanceData, loading } = useQuery(
    gql`
      ${getLatestAccountBalance(account.crypto)}
    `,
    { variables: { address: account.address }, pollInterval: 3000 }
  )
  const { tokenAmounts, usdBalance } = React.useMemo(() => {
    const accountBalance = transformGqlAcountBalance(balanceData, Date.now())
    return {
      tokenAmounts: getTotalTokenAmount(accountBalance).amount,
      usdBalance: getTotalBalance(accountBalance).balance,
    }
  }, [balanceData])

  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      justifyContent="space-between"
      className={classes.accountRow}
    >
      <FormControlLabel
        value={account.address}
        control={<Radio color="primary" />}
        label={account.address}
      />
      <Box flex={1} display="flex" justifyContent="end">
        {loading ? (
          <CircularProgress size={theme.spacing(2)} />
        ) : (
          <Typography align="right">
            {formatTokenAmount(tokenAmounts, account.crypto, lang)}
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default AccountRow
