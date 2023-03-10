import { Dialog, DialogTitle, IconButton } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import flatten from 'lodash/flatten';
import keyBy from 'lodash/keyBy';
import get from 'lodash/get';
import { gql, useQuery } from '@apollo/client';
import useStateHistory from '../../misc/useStateHistory';
import { formatTokenAmount, getTokenAmountFromDenoms } from '../../misc/utils';
import useStyles from './styles';
import useIsMobile from '../../misc/useIsMobile';
import { useWalletsContext } from '../../contexts/WalletsContext';
import { getTokensPrices } from '../../graphql/queries/tokensPrices';
import CloseIcon from '../../assets/images/icons/icon_cross.svg';
import BackIcon from '../../assets/images/icons/icon_back.svg';
import useIconProps from '../../misc/useIconProps';
import ConfirmStageContent from './ConfirmStageContent';
import ConnectLedgerDialogContent from '../ConnectLedgerDialogContent';
import SuccessContent from './SuccessContent';
import FailContent from './FailContent';
import SecurityPasswordDialogContent from '../SecurityPasswordDialogContent';
import sendMsgToChromeExt from '../../misc/sendMsgToChromeExt';
import cryptocurrencies from '../../misc/cryptocurrencies';
import useSignerInfo from '../../misc/tx/useSignerInfo';
import signAndBroadcastTransaction from '../../misc/tx/signAndBroadcastTransaction';
import useIsChromeExt from '../../misc/useIsChromeExt';
import estimateGasFee from '../../misc/tx/estimateGasFee';
import useValidators from '../../graphql/hooks/useValidators';

enum ConfirmTransactionStage {
  ConfirmStage = 'confirm',
  SecurityPasswordStage = 'security password',
  ConnectLedgerStage = 'connect ledger',
  SuccessStage = 'success',
  FailStage = 'fail',
}

interface Content {
  title: string;
  content: React.ReactNode;
  dialogWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

interface ConfirmTransactionDialogProps {
  address: string;
  transactionData: Transaction;
  open: boolean;
  onClose(): void;
}

const emptyGas = { amount: [{ amount: '0', denom: '' }], gas: '' };

const ConfirmTransactionDialog: React.FC<ConfirmTransactionDialogProps> = ({
  address,
  transactionData: defaultTransactionData,
  open,
  onClose,
}) => {
  const { t, lang } = useTranslation('common');
  const classes = useStyles();
  const isMobile = useIsMobile();
  const iconProps = useIconProps();
  const { isSentFromWeb } = useIsChromeExt();

  const { accounts, password, wallets } = useWalletsContext();
  const account = accounts.find(a => a.address === address);
  const wallet = account ? wallets.find(w => w.id === account.walletId) : undefined;
  const crypto = account ? account.crypto : Object.keys(cryptocurrencies)[0];

  const [errMsg, setErrMsg] = React.useState('');
  const [fee, setFee] = React.useState<any>(emptyGas);

  const { data: denomsData } = useQuery(
    gql`
      ${getTokensPrices(crypto)}
    `,
  );
  const denoms = get(denomsData, 'token_price', []);
  const signerInfo = useSignerInfo(account);
  const transactionData = React.useMemo(() => {
    if (!account) {
      return {
        msgs: [],
        fee: {
          amount: [],
          gas: '0',
        },
        memo: '',
      };
    }
    return {
      fee,
      ...signerInfo,
      ...defaultTransactionData,
    };
  }, [account, signerInfo, defaultTransactionData, fee]);

  const validatorsAddresses = flatten(
    transactionData.msgs.map(m => {
      switch (m.typeUrl) {
        case '/cosmos.staking.v1beta1.MsgDelegate':
          return [m.value.validatorAddress];
        case '/cosmos.staking.v1beta1.MsgBeginRedelegate':
          return [m.value.validatorSrcAddress, m.value.validatorDstAddress];
        case '/cosmos.staking.v1beta1.MsgUndelegate':
          return [m.value.validatorAddress];
        case '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward':
        case '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission':
          return [m.value.validatorAddress];
        default:
          return [];
      }
    }),
  );

  const totalAmount = getTokenAmountFromDenoms(
    flatten(
      transactionData.msgs
        .map(
          msg =>
            (msg.value as any).amount ||
            (msg.value as any).token ||
            flatten(get(msg, 'value.inputs', []).map(i => i.coins)),
        )
        .filter(a => a),
    ),
    denoms,
  );

  const successMessage = React.useMemo(() => {
    switch (get(transactionData, 'msgs[0].typeUrl', '')) {
      case '/cosmos.bank.v1beta1.MsgSend':
      case '/cosmos.bank.v1beta1.MsgMultiSend':
      case '/ibc.applications.transfer.v1.MsgTransfer':
        return t('successfully sent', {
          title: formatTokenAmount(totalAmount, { defaultUnit: crypto, lang }),
        });
      case '/cosmos.staking.v1beta1.MsgDelegate':
        return t('successfully delegated', {
          title: formatTokenAmount(totalAmount, { defaultUnit: crypto, lang }),
        });
      case '/cosmos.staking.v1beta1.MsgBeginRedelegate':
        return t('successfully redelegated', {
          title: formatTokenAmount(totalAmount, { defaultUnit: crypto, lang }),
        });
      case '/cosmos.staking.v1beta1.MsgUndelegate':
        return t('successfully undelegated', {
          title: formatTokenAmount(totalAmount, { defaultUnit: crypto, lang }),
        });
      case '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward':
      case '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission':
        return t('rewards was successfully withdrew');
      case '/cosmos.gov.v1beta1.MsgDeposit':
        return t('successfully deposited', {
          title: formatTokenAmount(totalAmount, { defaultUnit: crypto, lang }),
        });
      case '/desmos.profiles.v3.MsgSaveProfile':
        return t('profile was saved');
      default:
        return '';
    }
  }, [transactionData, t, totalAmount, crypto, lang]);

  const validatorsData = useValidators(crypto, validatorsAddresses);

  const validators = keyBy(validatorsData, 'address');

  const [stage, setStage, toPrevStage, isPrevStageAvailable] =
    useStateHistory<ConfirmTransactionStage>(ConfirmTransactionStage.ConfirmStage);

  React.useEffect(() => {
    if (defaultTransactionData && account && stage === ConfirmTransactionStage.ConfirmStage) {
      setFee(emptyGas);
      estimateGasFee(defaultTransactionData, account).then(setFee);
    }
  }, [defaultTransactionData, account, stage]);
  // For ledger
  const [isTxSigned, setIsTxSigned] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  const closeDialog = React.useCallback(() => {
    if (isSentFromWeb) {
      sendMsgToChromeExt({ event: 'closeChromeExtension' });
    } else {
      onClose();
    }
  }, [isSentFromWeb]);

  const confirm = React.useCallback(
    async (securityPassword?: string, ledgerSigner?: any) => {
      try {
        setLoading(true);
        await signAndBroadcastTransaction(
          password,
          account,
          transactionData,
          securityPassword,
          ledgerSigner,
          () => setIsTxSigned(true),
        );
        setLoading(false);
        setIsTxSigned(false);
        setStage(ConfirmTransactionStage.SuccessStage, true);
      } catch (err) {
        console.log(err);
        setErrMsg(err.message);
        setStage(ConfirmTransactionStage.FailStage, true);
      }
    },
    [account, transactionData, password],
  );

  const content: Content = React.useMemo(() => {
    switch (stage) {
      case ConfirmTransactionStage.ConfirmStage:
        return {
          title: '',
          dialogWidth: 'sm',
          content: (
            <ConfirmStageContent
              totalAmount={totalAmount}
              denoms={denoms}
              transactionData={transactionData}
              account={account}
              validators={validators}
              onConfirm={f => {
                setFee(f);
                setStage(
                  get(wallet, 'type', '') === 'ledger'
                    ? ConfirmTransactionStage.ConnectLedgerStage
                    : ConfirmTransactionStage.SecurityPasswordStage,
                );
              }}
            />
          ),
        };
      case ConfirmTransactionStage.SecurityPasswordStage:
        return {
          title: '',
          dialogWidth: 'sm',
          content: (
            <SecurityPasswordDialogContent
              walletId={account.walletId}
              onConfirm={confirm}
              loading={loading}
            />
          ),
        };
      case ConfirmTransactionStage.ConnectLedgerStage:
        return {
          title: '',
          dialogWidth: 'sm',
          content: (
            <ConnectLedgerDialogContent
              onConnect={ledgerSigner => confirm(undefined, ledgerSigner)}
              ledgerAppName={cryptocurrencies[account.crypto].ledgerAppName}
              signTransaction
              isTxSigned={isTxSigned}
            />
          ),
        };
      case ConfirmTransactionStage.SuccessStage:
        return {
          title: '',
          dialogWidth: 'sm',
          content: <SuccessContent message={successMessage} onClose={closeDialog} />,
        };
      case ConfirmTransactionStage.FailStage:
      default:
        return {
          title: '',
          dialogWidth: 'sm',
          content: <FailContent message={errMsg} onClose={closeDialog} />,
        };
    }
  }, [
    stage,
    t,
    transactionData,
    account,
    validators,
    wallet,
    confirm,
    successMessage,
    totalAmount,
  ]);

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} fullScreen={isMobile}>
      {isPrevStageAvailable ? (
        <IconButton className={classes.backButton} onClick={toPrevStage}>
          <BackIcon {...iconProps} />
        </IconButton>
      ) : null}
      {isSentFromWeb ? (
        <IconButton className={classes.closeButton} onClick={onClose}>
          <CloseIcon {...iconProps} />
        </IconButton>
      ) : null}
      {content.title ? <DialogTitle>{content.title}</DialogTitle> : null}
      {account && wallet && denoms ? content.content : null}
    </Dialog>
  );
};

export default ConfirmTransactionDialog;
