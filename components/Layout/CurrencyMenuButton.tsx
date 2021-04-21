import { Button, Menu, MenuItem } from '@material-ui/core'
import React from 'react'
import currencies from '../../misc/currencies'
import useStyles from './styles'
import CurrencyIcon from '../../assets/images/icons/icon_delegate_08.svg'
import { useGeneralContext } from '../../contexts/GeneralContext'
import useIconProps from '../../misc/useIconProps'

const CurrencyMenuButton: React.FC = () => {
  const { currency, setCurrency } = useGeneralContext()
  const classes = useStyles()
  const iconProps = useIconProps(3)

  const [currencyAnchor, setCurrencyAnchor] = React.useState<Element>()

  const onClose = React.useCallback(() => setCurrencyAnchor(undefined), [setCurrencyAnchor])
  const onItemClick = React.useCallback(
    (c) => {
      setCurrency(c)
      onClose()
    },
    [setCurrency, onClose]
  )

  return (
    <>
      <Button
        onClick={(e) => setCurrencyAnchor(e.currentTarget)}
        className={classes.navBarButton}
        startIcon={<CurrencyIcon {...iconProps} />}
      >
        {currency}
      </Button>
      <Menu
        anchorEl={currencyAnchor}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        keepMounted
        open={!!currencyAnchor}
        onClose={onClose}
      >
        {currencies
          .filter((c) => c !== currency)
          .map((c) => (
            <MenuItem key={c} onClick={() => onItemClick(c)}>
              {c}
            </MenuItem>
          ))}
      </Menu>
    </>
  )
}

export default React.memo(CurrencyMenuButton)
