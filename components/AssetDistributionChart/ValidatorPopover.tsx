import React from 'react'
import { Box, Popover, Typography, Avatar, Divider, useTheme } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import get from 'lodash/get'
import useStyles from './styles'
import {
  formatCrypto,
  formatCurrency,
  formatPercentage,
  formatTokenAmount,
  getTokenAmountBalance,
} from '../../misc/utils'
import { useGeneralContext } from '../../contexts/GeneralContext'

interface ValidatorPopoverProps {
  balance: TokenAmount
  validator: {
    moniker: string
    avatar: string
  }
  percentage: number
  anchorPosition?: { top: number; left: number }
  onClose(): void
}

const ValidatorPopover: React.FC<ValidatorPopoverProps> = ({
  balance,
  validator,
  percentage,
  anchorPosition,
  onClose,
}) => {
  const classes = useStyles()
  const { t, lang } = useTranslation('common')
  const { currency, currencyRate, hideAmount } = useGeneralContext()
  const theme = useTheme()

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
        width={theme.spacing(40)}
        p={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center">
          <Avatar className={classes.avatar} src={validator.avatar} />
          <Typography>{validator.moniker}</Typography>
        </Box>
        <Typography>{formatPercentage(percentage, lang)}</Typography>
      </Box>
      <Box p={2} pt={0}>
        <Typography variant="body2" color="textSecondary">
          {t('total delegation amount')}
        </Typography>
        <Typography>
          {formatCurrency(getTokenAmountBalance(balance) * currencyRate, {
            currency,
            lang,
            hideAmount,
          })}
        </Typography>
      </Box>
      {Object.keys(balance).map((key) => (
        <React.Fragment key={key}>
          <Divider />
          <Box p={2} display="flex" justifyContent="space-between">
            <Typography variant="body2" color="textSecondary">
              {t('delegated')}
            </Typography>
            <Box display="flex" flexDirection="column" alignItems="flex-end">
              <Typography>
                {formatCrypto(get(balance, `${key}.amount`, 0) as number, {
                  unit: key,
                  lang,
                  hideAmount,
                })}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {formatCurrency(
                  get(balance as any, `${key}.amount`, 0) *
                    get(balance as any, `${key}.price`, 0) *
                    currencyRate,
                  { currency, lang, hideAmount }
                )}
              </Typography>
            </Box>
          </Box>
        </React.Fragment>
      ))}
    </Popover>
  )
}

export default ValidatorPopover
