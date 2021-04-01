import { Box, Card, Typography, useTheme, IconButton } from '@material-ui/core'
import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import StarIcon from '../../assets/images/icons/icon_star.svg'
import StarFilledIcon from '../../assets/images/icons/icon_star_marked.svg'
import useStyles from './styles'
import { useGeneralContext } from '../../contexts/GeneralContext'
import useIconProps from '../../misc/useIconProps'
import cryptocurrencies from '../../misc/cryptocurrencies'
import { useWalletsContext } from '../../contexts/WalletsContext'
import AccountMenuButton from '../AccountMenuButton'
import AccountAvatar from '../AccountAvatar'
import { formatCrypto, formatCurrency } from '../../misc/utils'

interface AccountCardProps {
  account: Account
}

const AccountCard: React.FC<AccountCardProps> = ({ account }) => {
  const crypto = cryptocurrencies[account.crypto]
  const classes = useStyles()
  const theme = useTheme()
  const iconProps = useIconProps()
  const { lang } = useTranslation()
  const { currency } = useGeneralContext()
  const { updateAccount } = useWalletsContext()
  const router = useRouter()
  // TODO: fetch data from backend
  const balance = 104387.26
  const usdBalance = 626323.54

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
        <Box>
          <Typography variant="h4">{formatCrypto(balance, crypto.name, lang)}</Typography>
          <Typography variant="h6">{formatCurrency(usdBalance, currency, lang)}</Typography>
        </Box>
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
