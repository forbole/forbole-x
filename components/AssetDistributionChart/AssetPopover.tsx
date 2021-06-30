import React from 'react'
import { Box, Popover, Typography, Avatar, Divider, useTheme } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import get from 'lodash/get'
import useStyles from './styles'
import { formatCurrency, formatPercentage, formatTokenAmount } from '../../misc/utils'
import { useGeneralContext } from '../../contexts/GeneralContext'

interface AssetPopoverProps {
  accountBalance: {
    available: TokenAmount
    delegated: TokenAmount
    rewards: TokenAmount
    commissions: TokenAmount
    unbonding: TokenAmount
    total: TokenAmount
  }
  cryptocurrency: Cryptocurrency
  percentage: number
  anchorPosition?: { top: number; left: number }
  onClose(): void
}

const AssetPopover: React.FC<AssetPopoverProps> = ({
  accountBalance,
  cryptocurrency,
  percentage,
  anchorPosition,
  onClose,
}) => {
  const classes = useStyles()
  const { t, lang } = useTranslation('common')
  const { currency } = useGeneralContext()
  const theme = useTheme()
  console.log(accountBalance, cryptocurrency)

  return (
    <Popover
      open={!!anchorPosition}
      anchorReference="anchorPosition"
      anchorPosition={anchorPosition}
      onClose={onClose}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <Box
        width={theme.spacing(30)}
        p={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center">
          <Avatar className={classes.avatar} src={cryptocurrency.image} />
          <Typography>{cryptocurrency.name}</Typography>
        </Box>
        <Typography>{formatPercentage(percentage, lang)}</Typography>
      </Box>
      {['available', 'delegated', 'unbonding', 'rewards', 'total'].map((key) => (
        <React.Fragment key={key}>
          <Divider />
          <Box p={2} display="flex" justifyContent="space-between">
            <Typography variant="body2" color="textSecondary">
              {t(key)}
            </Typography>
            <Box display="flex" flexDirection="column" alignItems="flex-end">
              <Typography>
                {formatTokenAmount(get(accountBalance, key, {}), cryptocurrency.name, lang)}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {formatCurrency(
                  get(accountBalance, `${key}.${cryptocurrency.name.toLowerCase()}.amount`, 0) *
                    get(accountBalance, `${key}.${cryptocurrency.name.toLowerCase()}.price`, 0),
                  currency,
                  lang
                )}
              </Typography>
            </Box>
          </Box>
        </React.Fragment>
      ))}
    </Popover>
  )
}

export default AssetPopover
