import React from 'react'
import { Box, Popover, Typography, Avatar, Divider } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import get from 'lodash/get'
import useStyles from './styles'
import { formatCurrency, formatTokenAmount } from '../../misc/utils'

interface AssetPopoverProps {
  accountBalance: AccountBalance
  cryptocurrency: Cryptocurrency
  percentage: string
  anchorEl: any
  onClose(): void
}

const AssetPopover: React.FC<AssetPopoverProps> = ({
  accountBalance,
  cryptocurrency,
  percentage,
  anchorEl,
  onClose,
}) => {
  const classes = useStyles()
  const { t, lang } = useTranslation()
  return (
    <Popover
      open={!!anchorEl}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Box p={2} display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Avatar className={classes.avatar} src={cryptocurrency.image} />
          <Typography>{cryptocurrency.name}</Typography>
        </Box>
        <Typography>{percentage}</Typography>
      </Box>
      {['available', 'delegated', 'unbonding', 'reward'].map((key) => (
        <>
          <Divider />
          <Box p={2} display="flex" alignItems="center" justifyContent="space-between">
            <Typography>{t(key)}</Typography>
            <Box display="flex" flexDirection="column" justifyContent="flex-end">
              <Typography>
                {formatTokenAmount(
                  get(accountBalance, `balance.${key}.${cryptocurrency.name}`),
                  cryptocurrency.name,
                  lang
                )}
              </Typography>
              <Typography>
                {formatCurrency(
                  get(accountBalance, `balance.${key}.${cryptocurrency.name}.amount`, 0) *
                    get(accountBalance, `balance.${key}.${cryptocurrency.name}.price`, 0),
                  cryptocurrency.name,
                  lang
                )}
              </Typography>
            </Box>
          </Box>
        </>
      ))}
    </Popover>
  )
}

export default AssetPopover
