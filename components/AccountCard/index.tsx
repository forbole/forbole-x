import { Box, Card, Typography, useTheme, IconButton, CircularProgress } from '@material-ui/core'
import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { gql, useSubscription } from '@apollo/client'
import StarIcon from '../../assets/images/icons/icon_star.svg'
import StarFilledIcon from '../../assets/images/icons/icon_star_marked.svg'
import useStyles from './styles'
import { useSettingsContext } from '../../contexts/SettingsContext'
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

interface AccountCardProps {
  account: Account
}

const AccountCard: React.FC<AccountCardProps> = ({ account }) => {
  const classes = useStyles()
  const theme = useTheme()
  const iconProps = useIconProps()
  const { lang } = useTranslation()
  const { currency } = useSettingsContext()
  const { updateAccount } = useWalletsContext()
  const router = useRouter()
  const { data, loading } = useSubscription(
    gql`
      ${getLatestAccountBalance(account.crypto)}
    `,
    { variables: { address: account.address } }
  )

  const { tokenAmounts, usdBalance } = React.useMemo(() => {
    const accountBalance = transformGqlAcountBalance(data, Date.now())
    return {
      tokenAmounts: getTotalTokenAmount(accountBalance).amount,
      usdBalance: getTotalBalance(accountBalance).balance,
    }
  }, [data])

  const toggleFav = React.useCallback(() => {
    updateAccount(account.address, { fav: !account.fav })
  }, [account.address, account.fav, updateAccount])

  return (
    <Card
      className={classes.container}
      onClick={(e) => {
        const targetClassName = String((e.target as any).className)
        if (targetClassName.includes('MuiBox-root') || targetClassName.includes('MuiCard-root')) {
          router.push(`/account/${account.address}`)
        }
      }}
    >
      <Box id="" mb={5} display="flex" alignItems="flex-start" justifyContent="space-between">
        <AccountAvatar account={account} />
        <AccountMenuButton accountAddress={account.address} />
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
        <IconButton onClick={toggleFav}>
          {account.fav ? (
            <StarFilledIcon {...iconProps} fill={theme.palette.warning.light} />
          ) : (
            <StarIcon {...iconProps} />
          )}
        </IconButton>
      </Box>
    </Card>
  )
}

export default AccountCard
