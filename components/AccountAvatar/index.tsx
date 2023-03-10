import {
  Box,
  Avatar,
  Typography,
  Snackbar,
  useTheme,
  IconButton,
  TypographyProps,
} from '@material-ui/core';
import React from 'react';
import { Alert } from '@material-ui/lab';
import useTranslation from 'next-translate/useTranslation';
import { Variant } from '@material-ui/core/styles/createTypography';
import CopyIcon from '../../assets/images/icons/icon_copy.svg';
import useIconProps from '../../misc/useIconProps';
import cryptocurrencies from '../../misc/cryptocurrencies';
import useStyles from './styles';
import { CustomTheme } from '../../misc/theme';
import { useWalletsContext } from '../../contexts/WalletsContext';
import LedgerIcon from '../../assets/images/icons/usb_device.svg';

interface AccountAvatarProps {
  address?: {
    address: string;
    crypto: string;
    moniker: string;
    note?: string;
    img?: string;
  };
  account?: Account;
  hideAddress?: boolean;
  disableCopyAddress?: boolean;
  size?: 'small' | 'base' | 'large';
  ledgerIconDisabled?: boolean;
  titleProps?: TypographyProps;
  avatarSize?: number;
}

const AccountAvatar: React.FC<AccountAvatarProps> = ({
  account,
  hideAddress,
  size = 'base',
  disableCopyAddress,
  address,
  ledgerIconDisabled,
  titleProps,
  avatarSize,
}) => {
  const crypto = cryptocurrencies[account ? account.crypto : address.crypto];
  const { t } = useTranslation('common');
  const iconProps = useIconProps();
  const themeStyle: CustomTheme = useTheme();
  const classes = useStyles();
  const [isCopySuccess, setIsCopySuccess] = React.useState(false);
  const { wallets } = useWalletsContext();
  const walletAccountInfo = React.useMemo(
    () =>
      account
        ? { ...account, ...wallets.find(wal => wal.id === account.walletId) }
        : { type: 'mnemonic' },
    [account, wallets],
  );

  let avatarClass = '';
  let titleVariant: Variant = 'h5';
  if (size === 'small') {
    avatarClass = classes.smallAvatar;
    titleVariant = 'body1';
  } else if (size === 'large') {
    avatarClass = classes.largeAvatar;
    titleVariant = 'h3';
  }

  const copyText = React.useCallback(
    e => {
      e.stopPropagation();
      navigator.clipboard.writeText(account ? account.address : address.address);
      setIsCopySuccess(true);
    },
    [account],
  );

  const onClose = React.useCallback(() => {
    setIsCopySuccess(false);
  }, []);

  return (
    <>
      <Box display="flex" alignItems="center">
        <Avatar
          className={avatarClass}
          style={
            avatarSize
              ? { width: themeStyle.spacing(avatarSize), height: themeStyle.spacing(avatarSize) }
              : {}
          }
          alt={crypto.name}
          src={crypto.image}
        />
        <Box mx={1}>
          <Typography variant={titleVariant} {...titleProps}>
            {account ? account.name : address.moniker}
          </Typography>
          {hideAddress || disableCopyAddress ? null : (
            <Box display="flex" alignItems="center" my={-1}>
              <Typography color="textSecondary" variant="body2">
                {account ? account.address : address.address}
              </Typography>
              <IconButton onClick={copyText}>
                <CopyIcon {...iconProps} />
              </IconButton>
            </Box>
          )}
          {disableCopyAddress && !hideAddress ? (
            <Typography variant="body2" color="textSecondary">
              {account ? account.address : address.address}
            </Typography>
          ) : null}
        </Box>
        {walletAccountInfo.type === 'ledger' ? (
          <LedgerIcon
            fill={themeStyle.palette.text.primary}
            style={{ display: ledgerIconDisabled ? 'none' : 'block' }}
          />
        ) : null}
      </Box>
      <Snackbar open={isCopySuccess} autoHideDuration={5000} onClose={onClose}>
        <Alert onClose={onClose} severity="success">
          {t('copied to clipboard')}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AccountAvatar;
