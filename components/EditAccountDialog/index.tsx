/* eslint-disable camelcase */
import { Dialog, DialogTitle, IconButton, DialogContent, Box, Typography } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import get from 'lodash/get';
import { gql, useQuery } from '@apollo/client';
import CloseIcon from '../../assets/images/icons/icon_cross.svg';
import BackIcon from '../../assets/images/icons/icon_back.svg';
import useStyles from './styles';
import useIconProps from '../../misc/useIconProps';
import ShareAddress from './ShareAddress';
import useStateHistory from '../../misc/useStateHistory';
import { useWalletsContext } from '../../contexts/WalletsContext';
import AccountInfo from './AccountInfo';
import useIsMobile from '../../misc/useIsMobile';
import EditRewardAddress from './EditRewardAddress';
import RemoveAccount from './RemoveAccount';
import getWithdrawAddress from '../../graphql/queries/withdrawAddress';
import useSendTransaction from '../../misc/tx/useSendTransaction';

enum EditAccountStage {
  AccountInfoStage = 'account info',
  RewardAddressIntroStage = 'reward address intro',
  AddressSharingStage = 'address sharing',
  EditRewardAddressStage = 'edit reward address',
  RemoveAccountStage = 'remove account stage',
}

interface EditAccountDialogProps {
  account: Account;
  open: boolean;
  onClose(): void;
}

interface Content {
  title?: string;
  content: React.ReactNode;
  dialogWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const EditAccountDialog: React.FC<EditAccountDialogProps> = ({ account, open, onClose }) => {
  const { t } = useTranslation('common');
  const classes = useStyles();
  const iconProps = useIconProps();
  const { updateAccount, password } = useWalletsContext();
  const isMobile = useIsMobile();
  const sendTransaction = useSendTransaction();

  const { data } = useQuery(
    gql`
      ${getWithdrawAddress(account.crypto)}
    `,
    { variables: { address: account.address }, pollInterval: 15000 },
  );
  const withdrawAddress = get(data, 'delegation_reward[0].withdraw_address', account.address);

  const [loading, setLoading] = React.useState(false);

  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory<EditAccountStage>(
    EditAccountStage.AccountInfoStage,
  );
  const [sharingAddress, setSharingAddress] = React.useState(account.address);

  const saveMoniker = React.useCallback(
    async (name: string) => {
      try {
        await updateAccount(account.address, account.walletId, { name });
        onClose();
      } catch (err) {
        console.log(err);
      }
    },
    [updateAccount, account.address, account.walletId],
  );

  const editRewardAddress = React.useCallback(
    async (newWithdrawAddress: string, memo: string) => {
      try {
        setLoading(true);
        const msg: TransactionMsgSetWithdrawAddress = {
          typeUrl: '/cosmos.distribution.v1beta1.MsgSetWithdrawAddress',
          value: {
            delegatorAddress: account.address,
            withdrawAddress: newWithdrawAddress,
          },
        };
        await sendTransaction(password, account.address, {
          msgs: [msg],
          memo,
        });
        setLoading(false);
        onClose();
      } catch (err) {
        setLoading(false);
      }
    },
    [setStage, account, sendTransaction],
  );

  const content: Content = React.useMemo(() => {
    switch (stage) {
      case EditAccountStage.RemoveAccountStage:
        return {
          title: t('remove account'),
          dialogWidth: 'xs',
          content: <RemoveAccount onClose={onClose} account={account} />,
        };
      case EditAccountStage.RewardAddressIntroStage:
        return {
          title: t('reward address intro title'),
          content: (
            <DialogContent className={classes.dialogContent}>
              <Box mx={4} mb={8} mt={2}>
                <Typography className={classes.marginBottom}>
                  {t('reward address detail')}
                </Typography>
              </Box>
            </DialogContent>
          ),
        };
      case EditAccountStage.AddressSharingStage:
        return {
          title: t('address sharing title'),
          content: <ShareAddress address={sharingAddress} />,
        };
      case EditAccountStage.EditRewardAddressStage:
        return {
          title: t('edit reward address'),
          content: (
            <EditRewardAddress
              oldWithdrawAddress={withdrawAddress}
              onNext={(r, m) => editRewardAddress(r, m)}
              loading={loading}
            />
          ),
        };
      case EditAccountStage.AccountInfoStage:
      default:
        return {
          title: t('account info title'),
          content: (
            <AccountInfo
              account={account}
              withdrawAddress={withdrawAddress}
              onEdit={() => setStage(EditAccountStage.EditRewardAddressStage)}
              onRemove={() => setStage(EditAccountStage.RemoveAccountStage)}
              onSave={saveMoniker}
              onDetail={() => setStage(EditAccountStage.RewardAddressIntroStage)}
              onShare={address => {
                setStage(EditAccountStage.AddressSharingStage);
                setSharingAddress(address);
              }}
            />
          ),
        };
    }
  }, [stage, t]);

  React.useEffect(() => {
    if (open) {
      setLoading(false);
      setStage(EditAccountStage.AccountInfoStage, true);
    }
  }, [open]);

  return (
    <Dialog
      fullWidth
      maxWidth={content.dialogWidth || 'sm'}
      open={open}
      onClose={onClose}
      fullScreen={isMobile}>
      {isPrevStageAvailable ? (
        <IconButton className={classes.backButton} onClick={toPrevStage}>
          <BackIcon {...iconProps} />
        </IconButton>
      ) : null}
      <IconButton className={classes.closeButton} onClick={onClose}>
        <CloseIcon {...iconProps} />
      </IconButton>
      {content.title ? <DialogTitle>{content.title}</DialogTitle> : null}
      {content.content}
    </Dialog>
  );
};

export default EditAccountDialog;
