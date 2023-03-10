import { Dialog, DialogTitle, IconButton, Tabs, Tab } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import CloseIcon from '../../assets/images/icons/icon_cross.svg';
import useStyles from './styles';
import useIconProps from '../../misc/useIconProps';
import SelectValidators from './SelectValidators';
import { useWalletsContext } from '../../contexts/WalletsContext';
import cryptocurrencies from '../../misc/cryptocurrencies';
import useIsMobile from '../../misc/useIsMobile';
import useSendTransaction from '../../misc/tx/useSendTransaction';
import WithdrawCommission from './WithdrawCommission';

export interface ValidatorTag extends Validator {
  isSelected: boolean;
}

interface WithdrawRewardsDialogProps {
  wallet: Wallet;
  account: Account;
  tokensPrices: TokenPrice[];
  open: boolean;
  onClose(): void;
  validators: Validator[];
  commissions: TokenAmount;
  preselectedValidatorAddresses?: string[];
  openDelegationDialog: () => void;
}

const WithdrawRewardsDialog: React.FC<WithdrawRewardsDialogProps> = ({
  wallet,
  account,
  open,
  onClose,
  validators,
  commissions,
  preselectedValidatorAddresses,
  openDelegationDialog,
}) => {
  const { t } = useTranslation('common');
  const classes = useStyles();
  const iconProps = useIconProps();
  const isMobile = useIsMobile();
  const sendTransaction = useSendTransaction();
  const crypto = account ? cryptocurrencies[account.crypto] : Object.values(cryptocurrencies)[0];
  const [loading, setLoading] = React.useState(false);
  const [currentTab, setCurrentTab] = React.useState(0);
  const { password } = useWalletsContext();

  const confirm = React.useCallback(
    async (delegations: Array<ValidatorTag>, memo: string) => {
      try {
        setLoading(true);
        const msgs: (TransactionMsgWithdrawReward | TransactionMsgWithdrawCommission)[] =
          delegations.map(r =>
            currentTab === 0
              ? {
                  typeUrl: '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
                  value: {
                    delegatorAddress: account.address,
                    validatorAddress: r.address,
                  },
                }
              : {
                  typeUrl: '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission',
                  value: {
                    validatorAddress: r.address,
                  },
                },
          );
        await sendTransaction(password, account.address, {
          msgs,
          memo,
        });
        setLoading(false);
        onClose();
      } catch (err) {
        setLoading(false);
      }
    },
    [password, account, sendTransaction, currentTab],
  );

  const totalAmount = React.useMemo(() => {
    const total: TokenAmount = {};

    validators
      .filter(v => !!v.rewards)
      .forEach(x => {
        Object.keys(x.rewards || {}).forEach(denom => {
          if (total[denom]) {
            total[denom].amount += x.rewards[denom].amount;
          } else {
            total[denom] = cloneDeep(x.rewards[denom]);
          }
        });
      });
    return total;
  }, [validators]);

  React.useEffect(() => {
    if (open) {
      setLoading(false);
    }
  }, [open]);

  return (
    <Dialog
      fullWidth
      maxWidth={Object.keys(totalAmount).length > 0 ? 'md' : 'sm'}
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
    >
      <IconButton className={classes.closeButton} onClick={onClose}>
        <CloseIcon {...iconProps} />
      </IconButton>

      <DialogTitle>
        {commissions && Object.values(commissions).length ? (
          <Tabs
            value={currentTab}
            classes={{ indicator: classes.tabIndicator, root: classes.tabs }}
            onChange={(e, v) => setCurrentTab(v)}
            centered
          >
            <Tab classes={{ root: classes.tab }} label={t('withdraw reward')} />
            <Tab classes={{ root: classes.tab }} label={t('withdraw commission')} />
          </Tabs>
        ) : (
          t('withdraw reward')
        )}
      </DialogTitle>
      {currentTab === 0 ? (
        <SelectValidators
          wallet={wallet}
          account={account}
          crypto={crypto}
          totalAmount={totalAmount}
          onConfirm={confirm}
          validators={validators.filter(v => !!v.rewards)}
          preselectedValidatorAddresses={preselectedValidatorAddresses}
          loading={loading}
          openDelegationDialog={openDelegationDialog}
          onClose={onClose}
        />
      ) : (
        <WithdrawCommission
          account={account}
          loading={loading}
          totalAmount={commissions}
          onConfirm={m =>
            confirm(
              validators
                .filter(v => Object.values(v.commissionAmount || {}).length > 0)
                .map(v => ({ ...v, isSelected: true })),
              m,
            )
          }
        />
      )}
    </Dialog>
  );
};

export default WithdrawRewardsDialog;
