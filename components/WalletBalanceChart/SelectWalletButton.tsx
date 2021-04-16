import { Button, Menu, MenuItem } from '@material-ui/core'
import React from 'react'
import get from 'lodash/get'
import WalletIcon from '../../assets/images/icons/icon_wallet_manage.svg'
import DropDownIcon from '../../assets/images/icons/icon_arrow_down_input_box.svg'
import useIconProps from '../../misc/useIconProps'

interface SelectWalletButtonProps {
  wallets: Wallet[]
  currentWallet?: Wallet
  onWalletChange(wallet: Wallet): void
}

const SelectWalletButton: React.FC<SelectWalletButtonProps> = ({
  wallets,
  currentWallet,
  onWalletChange,
}) => {
  const iconProps = useIconProps(2)

  const [anchor, setAnchor] = React.useState<Element>()

  const onClose = React.useCallback(() => setAnchor(undefined), [setAnchor])
  const onItemClick = React.useCallback(
    (c) => {
      onWalletChange(c)
      onClose()
    },
    [onWalletChange, onClose]
  )

  return (
    <>
      <Button
        onClick={(e) => setAnchor(e.currentTarget)}
        startIcon={<WalletIcon {...iconProps} />}
        endIcon={<DropDownIcon {...iconProps} />}
      >
        {get(currentWallet, 'name', '')}
      </Button>
      <Menu
        anchorEl={anchor}
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
        open={!!anchor}
        onClose={onClose}
      >
        {wallets.map((w) => (
          <MenuItem
            selected={w.id === get(currentWallet, 'id', '')}
            key={w.id}
            onClick={() => onItemClick(w)}
          >
            {w.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default React.memo(SelectWalletButton)
