import React from 'react';
import { Box, Button, Menu, MenuItem, Typography } from '@material-ui/core';
import groupBy from 'lodash/groupBy';
import { useWalletsContext } from '../../contexts/WalletsContext';
import AccountAvatar from '../AccountAvatar';
import DropDownIcon from '../../assets/images/icons/icon_arrow_down_input_box.svg';
import useIconProps from '../../misc/useIconProps';

interface SelectAccountButtonProps {
  activeAccount: Account;
  onAccountChange: (account: Account) => void;
}

const SelectAccountButton: React.FC<SelectAccountButtonProps> = ({
  activeAccount,
  onAccountChange,
}) => {
  const iconProps = useIconProps();
  const { accounts, wallets } = useWalletsContext();
  const accountsMap = React.useMemo(
    () =>
      groupBy(
        accounts.map((a, index) => ({ ...a, index })),
        'walletId',
      ),
    [accounts],
  );
  const [accountMenuAnchor, setAccountMenuAnchor] = React.useState<Element>();

  return (
    <>
      <Button
        onClick={e => setAccountMenuAnchor(e.currentTarget)}
        size="small"
        endIcon={<DropDownIcon {...iconProps} />}>
        <AccountAvatar account={activeAccount} hideAddress size="small" />
      </Button>
      <Menu
        anchorEl={accountMenuAnchor}
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
        open={!!accountMenuAnchor}
        onClose={() => setAccountMenuAnchor(undefined)}>
        {wallets.map(w => (
          <Box mb={2} key={w.id}>
            <Box px={2}>
              <Typography gutterBottom variant="body2" color="textSecondary">
                {w.name}
              </Typography>
            </Box>
            {accountsMap[w.id].map(a => (
              <MenuItem
                key={a.address}
                button
                onClick={() => {
                  onAccountChange(a);
                  setAccountMenuAnchor(undefined);
                }}>
                <AccountAvatar account={a} hideAddress size="small" />
              </MenuItem>
            ))}
          </Box>
        ))}
      </Menu>
    </>
  );
};

export default SelectAccountButton;
