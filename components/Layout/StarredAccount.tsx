import React from 'react'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import { gql, useSubscription } from '@apollo/client'
import {
  Avatar,
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  CircularProgress,
  Typography,
} from '@material-ui/core'
import { useGeneralContext } from '../../contexts/GeneralContext'
import {
  formatCurrency,
  formatTokenAmount,
  getTotalBalance,
  getTotalTokenAmount,
  transformGqlAcountBalance,
} from '../../misc/utils'
import { CustomTheme } from '../../misc/theme'
import cryptocurrencies from '../../misc/cryptocurrencies'
import useStyles from './styles'
import { getLatestAccountBalance } from '../../graphql/queries/accountBalances'

interface StarredAccountProps {
  account: Account
}

const StarredAccount: React.FC<StarredAccountProps> = ({ account }) => {
  const themeStyle: CustomTheme = useTheme()
  const { lang } = useTranslation('common')
  const { currency } = useGeneralContext()
  const classes = useStyles()
  const crypto = cryptocurrencies[account.crypto]
  // Latest data
  const { data: balanceData, loading } = useSubscription(
    gql`
      ${getLatestAccountBalance(account.crypto)}
    `,
    { variables: { address: account.address } }
  )
  const { tokenAmounts, usdBalance } = React.useMemo(() => {
    const accountBalance = transformGqlAcountBalance(balanceData, Date.now())
    return {
      tokenAmounts: getTotalTokenAmount(accountBalance).amount,
      usdBalance: getTotalBalance(accountBalance).balance,
    }
  }, [balanceData])
  return (
    <Link key={account.address} href="/account/[address]" as={`/account/${account.address}`}>
      <ListItem className={classes.favMenuItem} button component="a">
        <ListItemIcon>
          <Avatar
            alt={crypto.name}
            src={crypto.image}
            style={{ height: themeStyle.spacing(4), width: themeStyle.spacing(4) }}
          />
        </ListItemIcon>
        <Box display="flex" flexDirection="column">
          <ListItemText
            primary={account.name}
            primaryTypographyProps={{
              variant: 'h6',
            }}
          />
          {loading ? (
            <Box>
              <CircularProgress size={20} />
            </Box>
          ) : (
            <Box>
              <Typography>{formatTokenAmount(tokenAmounts, account.crypto, lang)}</Typography>
              {/* after USD balance is added */}
              {/* <Typography>{formatCurrency(usdBalance, currency, lang)}</Typography> */}
            </Box>
          )}
        </Box>
      </ListItem>
    </Link>
  )
}

export default StarredAccount
