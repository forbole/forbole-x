import { Button, Menu, MenuItem } from '@material-ui/core'
import React from 'react'
import isEqual from 'lodash/isEqual'
import WalletIcon from '../../assets/images/icons/icon_wallet_manage.svg'
import DropDownIcon from '../../assets/images/icons/icon_arrow_down_input_box.svg'
import useIconProps from '../../misc/useIconProps'

interface SelectWalletButtonProps {
  wallets: Wallet[]
  currentWallet: Wallet
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
        {currentWallet.name}
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
            selected={isEqual(w.pubkey, currentWallet.pubkey)}
            key={JSON.stringify(w.pubkey)}
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
