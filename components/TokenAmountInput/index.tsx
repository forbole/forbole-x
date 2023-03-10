import {
  Button,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  FilledTextFieldProps,
} from '@material-ui/core';
import React from 'react';
import DropDownIcon from '../../assets/images/icons/icon_arrow_down_input_box.svg';
import useIconProps from '../../misc/useIconProps';

interface TokenAmountInputProps extends Partial<FilledTextFieldProps> {
  denom: string;
  onValueChange(value: string): void;
  onDenomChange(denom: string): void;
  availableAmount: TokenAmount;
}

const TokenAmountInput: React.FC<TokenAmountInputProps> = ({
  denom,
  onValueChange,
  onDenomChange,
  availableAmount,
  InputProps = {},
  ...props
}) => {
  const iconProps = useIconProps();
  const [anchor, setAnchor] = React.useState<Element>();
  return (
    <TextField
      fullWidth
      variant="filled"
      InputProps={{
        disableUnderline: true,
        endAdornment: (
          <InputAdornment position="end">
            <Button
              variant="text"
              size="small"
              endIcon={<DropDownIcon {...iconProps} />}
              onClick={e => setAnchor(e.currentTarget)}>
              {denom}
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
              onClose={() => setAnchor(undefined)}>
              {Object.keys(availableAmount).map(d => (
                <MenuItem
                  button
                  key={d}
                  onClick={() => {
                    onDenomChange(d);
                    setAnchor(undefined);
                  }}>
                  {d}
                </MenuItem>
              ))}
            </Menu>
          </InputAdornment>
        ),
        ...InputProps,
      }}
      placeholder="0"
      type="number"
      onChange={e => onValueChange(e.target.value)}
      {...props}
    />
  );
};

export default TokenAmountInput;
