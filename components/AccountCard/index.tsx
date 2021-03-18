import React from 'react'
import { Box, Card, Avatar, Typography, useTheme, IconButton, Link } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import MoreIcon from '../../assets/images/icons/icon_more.svg'
import StarIcon from '../../assets/images/icons/icon_star.svg'
import StarFilledIcon from '../../assets/images/icons/icon_star_marked.svg'
import CopyIcon from '../../assets/images/icons/icon_copy.svg'
import useStyles from './styles'
import { useSettingsContext } from '../../contexts/SettingsContext'
// import { useAccountCardHook } from './hooks'
import useIconProps from '../../misc/useIconProps'
import cryptocurrencies from '../../misc/cryptocurrencies'
import { useWalletsContext } from '../../contexts/WalletsContext'

interface AccountCardProps {
  // account: Account
  accountInfo?: any
}

const AccountCard: React.FC<AccountCardProps> = ({ accountInfo }) => {
  console.log('accountInfo', accountInfo)
  // console.log('const crypto', cryptocurrencies["SOL"])
  const crypto = cryptocurrencies[accountInfo.crypto]
  const classes = useStyles()
  const theme = useTheme()
  const iconProps = useIconProps()
  const { lang } = useTranslation()
  const { currency } = useSettingsContext()
  const { updateAccount } = useWalletsContext()
  const now = Date.now()
  // TODO: fetch data from backend
  const usdBalance = 626323.54
  const delta = new Array(24).fill(null).map(() => (Math.random() - 0.5) / 10)
  const data = []
  delta.forEach((d, i) => {
    data.unshift({
      time: now - i * 3600000,
      balance: i === 0 ? usdBalance : data[0].balance * (1 + d),
    })
  })

  // const { accountInfo } = useAccountCardHook(account.address)

  const toggleFav = React.useCallback(() => {
    updateAccount(accountInfo.address, { fav: !accountInfo.fav })
  }, [accountInfo.address, accountInfo.fav, updateAccount])
  return (
    <Card className={classes.container}>
      <Box mb={5} display="flex" alignItems="flex-start" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Avatar alt={crypto.name} src={crypto.image} />
          <Box ml={1}>
            <Typography variant="h5">{accountInfo.name}</Typography>
            <Link
              component="button"
              variant="body2"
              color="textSecondary"
              onClick={() => navigator.clipboard.writeText(accountInfo.address)}
            >
              {accountInfo.address}
              <Box display="inline" ml={1}>
                <CopyIcon {...iconProps} />
              </Box>
            </Link>
          </Box>
        </Box>
        <IconButton>
          <MoreIcon {...iconProps} />
        </IconButton>
      </Box>
      <Box display="flex" alignItems="flex-end" justifyContent="space-between">
        <Box>
          <Typography variant="h4">
            {new Intl.NumberFormat(lang, {
              signDisplay: 'never',
            }).format(accountInfo?.total ? accountInfo.total : 0)}{' '}
            {crypto.name}
          </Typography>
          <Typography variant="h6">
            {new Intl.NumberFormat(lang, {
              style: 'currency',
              currency,
            }).format(usdBalance)}{' '}
            {currency}
          </Typography>
        </Box>
        <IconButton onClick={toggleFav}>
          {accountInfo.fav ? (
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
