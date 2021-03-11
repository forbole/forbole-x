import { Box, Button, Card, useTheme } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import StarIcon from '../../assets/images/icons/icon_star.svg'
import EditIcon from '../../assets/images/icons/icon_edit_tool.svg'
import StarFilledIcon from '../../assets/images/icons/icon_star_marked.svg'
import AccountAvatar from '../AccountAvatar'
import BalanceChart from '../BalanceChart'
import { useSettingsContext } from '../../contexts/SettingsContext'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'

interface AccountDetailCardProps {
  account: Account
}

const AccountDetailCard: React.FC<AccountDetailCardProps> = ({ account }) => {
  const { lang } = useTranslation()
  const { currency } = useSettingsContext()
  const classes = useStyles()
  const iconProps = useIconProps()
  const theme = useTheme()

  // TODO: fetch data from backend
  const now = Date.now()
  const balance = 656333.849
  const btcBalance = 57.987519
  const delta = new Array(24 * 7).fill(null).map(() => (Math.random() - 0.5) / 10)
  const data = []
  delta.forEach((d, i) => {
    data.unshift({
      time: now - i * 3600000,
      balance: i === 0 ? balance : data[0].balance * (1 + d),
    })
  })

  return (
    <Card>
      <Box p={2}>
        <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
          <AccountAvatar account={account} />
          <Box display="flex">
            <Button
              classes={{ root: classes.fixedWidthButton }}
              size="small"
              variant="contained"
              color="primary"
            >
              Delegate
            </Button>
            <Button
              classes={{ root: classes.fixedWidthButton }}
              size="small"
              variant="contained"
              color="secondary"
            >
              Claim Rewards
            </Button>
            <Button
              classes={{ root: classes.sendButton }}
              size="small"
              variant="contained"
              color="secondary"
            >
              Send
            </Button>
            <Button classes={{ root: classes.iconButton }} variant="outlined">
              {account.fav ? (
                <StarFilledIcon {...iconProps} fill={theme.palette.warning.light} />
              ) : (
                <StarIcon {...iconProps} />
              )}
            </Button>
            <Button classes={{ root: classes.iconButton }} variant="outlined">
              <EditIcon {...iconProps} />
            </Button>
          </Box>
        </Box>
        <BalanceChart
          data={data}
          ticks={new Array(7).fill(null).map((_a, i) => now - (6 - i) * 24 * 3600000)}
          title={`${new Intl.NumberFormat(lang, {
            style: 'currency',
            currency,
          }).format(balance)} ${currency}`}
          subtitle={`${new Intl.NumberFormat(lang, {
            signDisplay: 'never',
          }).format(btcBalance)} ฿`}
        />
      </Box>
    </Card>
  )
}

export default AccountDetailCard
