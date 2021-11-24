import { Box, Card, Typography, useTheme, IconButton, CircularProgress } from '@material-ui/core'
import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { gql, useSubscription } from '@apollo/client'
import StarIcon from '../../assets/images/icons/icon_star.svg'
import StarFilledIcon from '../../assets/images/icons/icon_star_marked.svg'
import useStyles from './styles'
import { useGeneralContext } from '../../contexts/GeneralContext'
import useIconProps from '../../misc/useIconProps'
import { useWalletsContext } from '../../contexts/WalletsContext'
import AccountMenuButton from '../AccountMenuButton'
import AccountAvatar from '../AccountAvatar'
import {
  formatCurrency,
  formatTokenAmount,
  getTotalBalance,
  getTotalTokenAmount,
  transformGqlAcountBalance,
} from '../../misc/utils'
import { getLatestAccountBalance } from '../../graphql/queries/accountBalances'
import ChromeExtBottom from './ChromeExtBottom'

interface AccountCardProps {
  account: Account
  ledgerIconDisabled?: boolean
  isChromeExt?: boolean
}

const AccountCard: React.FC<AccountCardProps> = ({ account, ledgerIconDisabled, isChromeExt }) => {
  const classes = useStyles()
  const theme = useTheme()
  const iconProps = useIconProps()
  const { lang } = useTranslation('common')
  const { currency } = useGeneralContext()
  const { updateAccount } = useWalletsContext()
  const router = useRouter()

  const { data, loading } = useSubscription(
    gql`
      ${getLatestAccountBalance(account.crypto)}
    `,
    { variables: { address: account.address } }
  )

  const {
    tokenAmounts,
    usdBalance,
    availableTokens,
    balance: { delegated, rewards },
  } = React.useMemo(() => {
    const accountBalance = transformGqlAcountBalance(data, Date.now())
    return {
      tokenAmounts: getTotalTokenAmount(accountBalance).amount,
      usdBalance: getTotalBalance(accountBalance).balance,
      ...accountBalance,
    }
  }, [data])

  const toggleFav = React.useCallback(() => {
    updateAccount(account.address, account.walletId, { fav: !account.fav })
  }, [account.address, account.fav, account.walletId, updateAccount])

  return (
    <Card
      className={classes.container}
      onClick={(e) => {
        const targetClassName = String((e.target as any).className)
        if (
          (targetClassName.includes('MuiBox') ||
            targetClassName.includes('MuiCard') ||
            targetClassName.includes('MuiTypography') ||
            targetClassName.includes('MuiAvatar')) &&
          !document.getElementsByClassName('MuiDialog-root').length
        ) {
          router.push(`/account/${account.address}`)
        }
      }}
    >
      <Box
        mb={isChromeExt ? 2 : 5}
        display="flex"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <AccountAvatar account={account} ledgerIconDisabled={ledgerIconDisabled} />
        <AccountMenuButton account={account} />
      </Box>
      <Box display="flex" alignItems="flex-end" justifyContent="space-between">
        {loading ? (
          <Box my={0.5} mx={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Box>
            <Typography variant="h4">
              {formatTokenAmount(tokenAmounts, account.crypto, lang)}
            </Typography>
            <Typography variant="h6">{formatCurrency(usdBalance, currency, lang)}</Typography>
          </Box>
        )}
        {isChromeExt ? null : (
          <IconButton onClick={toggleFav}>
            {account.fav ? (
              <StarFilledIcon {...iconProps} fill={theme.palette.warning.light} />
            ) : (
              <StarIcon {...iconProps} />
            )}
          </IconButton>
        )}
      </Box>
      {isChromeExt ? (
        <ChromeExtBottom
          account={account}
          availableTokens={availableTokens}
          delegated={delegated}
          rewards={rewards}
          balanceData={data}
        />
      ) : null}
    </Card>
  )
}

export default AccountCard
