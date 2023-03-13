import {
  Box,
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
  Slider,
  TextField,
  Typography,
  useTheme,
} from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import dynamic from 'next/dynamic';
import get from 'lodash/get';
import EditGasIcon from '../../../assets/images/icons/edit_gas.svg';
import CloseIcon from '../../../assets/images/icons/icon_cross.svg';
import { formatTokenAmount, getTokenAmountFromDenoms } from '../../../misc/utils';
import useStyles from '../styles';
import SendContent from './SendContent';
import DelegateContent from './DelegateContent';
import RedelegateContent from './RedelegateContent';
import UndelegateContent from './UndelegateContent';
import ClaimRewardsContent from './ClaimRewardsContent';
import { useGeneralContext } from '../../../contexts/GeneralContext';
import { CustomTheme } from '../../../misc/theme';
import IBCTransferContent from './IBCTransferContent';
import SubmitProposalContent from './SubmitProposalContent';
import VoteContent from './VoteContent';
import DepositContent from './DepositContent';
import SaveProfileContent from './SaveProfileContent';
import SetWithdrawAddressContent from './SetWithdrawAddressContent';
import MultiSendContent from './MultiSendContent';
import ChainLinkContent from './ChainLinkContent';
import ChainUnlinkContent from './ChainUnlinkContent';
import useIconProps from '../../../misc/useIconProps';
import cryptocurrencies from '../../../misc/cryptocurrencies';
import { transformFee } from '../../../misc/tx/estimateGasFee';

const ReactJson = dynamic(() => import('react-json-view'), { ssr: false });

interface ConfirmStageContentProps {
  account: Account;
  denoms: TokenPrice[];
  validators: { [address: string]: Validator };
  transactionData: Transaction;
  onConfirm(fee: { amount: { amount: string; denom: string }[]; gas: string }): void;
  totalAmount: TokenAmount;
}

const ConfirmStageContent: React.FC<ConfirmStageContentProps> = ({
  account,
  denoms,
  validators,
  transactionData,
  onConfirm,
  totalAmount,
}) => {
  const { t, lang } = useTranslation('common');
  const classes = useStyles();
  const { theme } = useGeneralContext();
  const themeStyle: CustomTheme = useTheme();
  const iconProps = useIconProps();

  const [viewingData, setViewingData] = React.useState(false);
  const [gas, setGas] = React.useState(transactionData.fee.gas);
  const fee = transformFee(cryptocurrencies[account.crypto], Number(gas));
  const [isEdittingGas, setIsEdittingGas] = React.useState(false);

  React.useEffect(() => {
    setGas(transactionData.fee.gas);
  }, [transactionData.fee.gas]);

  const { typeUrl } = transactionData.msgs[0];

  const content = React.useMemo(() => {
    switch (typeUrl) {
      case '/cosmos.bank.v1beta1.MsgSend':
        return (
          <SendContent
            account={account}
            denoms={denoms}
            totalAmount={totalAmount}
            msgs={transactionData.msgs as TransactionMsgSend[]}
          />
        );
      case '/cosmos.bank.v1beta1.MsgMultiSend':
        return (
          <MultiSendContent
            account={account}
            denoms={denoms}
            totalAmount={totalAmount}
            msgs={transactionData.msgs as TransactionMsgMultiSend[]}
          />
        );
      case '/cosmos.staking.v1beta1.MsgDelegate':
        return (
          <DelegateContent
            account={account}
            denoms={denoms}
            totalAmount={totalAmount}
            msgs={transactionData.msgs as TransactionMsgDelegate[]}
            validators={validators}
          />
        );
      case '/cosmos.staking.v1beta1.MsgUndelegate':
        return (
          <UndelegateContent
            account={account}
            denoms={denoms}
            totalAmount={totalAmount}
            msgs={transactionData.msgs as TransactionMsgUndelegate[]}
            validators={validators}
          />
        );
      case '/cosmos.staking.v1beta1.MsgBeginRedelegate':
        return (
          <RedelegateContent
            account={account}
            denoms={denoms}
            totalAmount={totalAmount}
            msgs={transactionData.msgs as TransactionMsgRedelegate[]}
            validators={validators}
          />
        );
      case '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward':
      case '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission':
        return (
          <ClaimRewardsContent
            account={account}
            msgs={
              transactionData.msgs as (
                | TransactionMsgWithdrawReward
                | TransactionMsgWithdrawCommission
              )[]
            }
            validators={validators}
          />
        );
      case '/ibc.applications.transfer.v1.MsgTransfer':
        return (
          <IBCTransferContent
            account={account}
            denoms={denoms}
            totalAmount={totalAmount}
            msgs={transactionData.msgs as TransactionMsgIBCTransfer[]}
          />
        );
      case '/cosmos.gov.v1beta1.MsgSubmitProposal':
        return (
          <SubmitProposalContent
            account={account}
            msgs={transactionData.msgs as TransactionMsgSubmitProposal[]}
          />
        );
      case '/cosmos.gov.v1beta1.MsgVote':
        return <VoteContent msgs={transactionData.msgs as TransactionMsgVote[]} />;
      case '/cosmos.gov.v1beta1.MsgDeposit':
        return (
          <DepositContent
            msgs={transactionData.msgs as TransactionMsgDeposit[]}
            account={account}
            denoms={denoms}
          />
        );
      case '/desmos.profiles.v3.MsgSaveProfile':
        return <SaveProfileContent msgs={transactionData.msgs as TransactionMsgSaveProfile[]} />;
      case '/desmos.profiles.v3.MsgLinkChainAccount':
        return (
          <ChainLinkContent
            account={account}
            msgs={transactionData.msgs as TransactionMsgLinkChainAccount[]}
          />
        );
      case '/desmos.profiles.v3.MsgUnlinkChainAccount':
        return (
          <ChainUnlinkContent
            account={account}
            msgs={transactionData.msgs as TransactionMsgUnlinkChainAccount[]}
          />
        );
      case '/cosmos.distribution.v1beta1.MsgSetWithdrawAddress':
        return (
          <SetWithdrawAddressContent
            account={account}
            msgs={transactionData.msgs as TransactionMsgSetWithdrawAddress[]}
          />
        );
      default:
        return null;
    }
  }, [typeUrl, validators, account, transactionData, totalAmount, denoms]);

  return (
    <>
      <DialogContent className={classes.dialogContent}>
        {content}
        <Box my={1}>
          <Typography gutterBottom>{t('memo')}</Typography>
          <Typography color="textSecondary">{transactionData.memo || t('NA')}</Typography>
        </Box>
        <Divider />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography>{t('fee')}</Typography>
          <Box display="flex" alignItems="center">
            <Typography color="textSecondary">
              {!transactionData.fee.gas
                ? t('estimating gas')
                : formatTokenAmount(getTokenAmountFromDenoms(fee.amount, denoms || []), {
                    defaultUnit: account.crypto,
                    lang,
                  })}
            </Typography>
            <IconButton onClick={() => setIsEdittingGas(g => !g)}>
              {isEdittingGas ? <CloseIcon {...iconProps} /> : <EditGasIcon {...iconProps} />}
            </IconButton>
          </Box>
        </Box>
        {isEdittingGas ? (
          <>
            <Typography color="textSecondary">{t('set gas')}</Typography>
            <TextField
              fullWidth
              autoFocus
              variant="filled"
              InputProps={{
                disableUnderline: true,
              }}
              placeholder={get(transactionData, 'fee.gas', '0')}
              value={gas}
              onChange={e => setGas(e.target.value)}
            />
            <Box px={1}>
              <Slider
                value={Number(gas) / Number(get(transactionData, 'fee.gas', '0'))}
                onChange={(e, v: number) =>
                  setGas((Number(get(transactionData, 'fee.gas', '0')) * v).toFixed(0))
                }
                min={1}
                max={2}
                step={0.01}
              />
            </Box>
          </>
        ) : null}

        <Divider />
        <Box my={1} display="flex" justifyContent="flex-end">
          <Button onClick={() => setViewingData(v => !v)} variant="text" color="primary">
            {t(viewingData ? 'hide data' : 'view data')}
          </Button>
        </Box>
        {viewingData ? (
          <Box flex={1} overflow="auto">
            <ReactJson
              src={{ ...transactionData, fee }}
              style={{
                backgroundColor: themeStyle.palette.reactJsonBackground,
                borderRadius: themeStyle.spacing(1),
                padding: themeStyle.spacing(1),
                overflowX: 'auto',
              }}
              displayDataTypes={false}
              displayObjectSize={false}
              enableClipboard={false}
              name={false}
              indentWidth={2}
              theme={theme === 'dark' ? 'google' : 'rjv-default'}
            />
          </Box>
        ) : null}
      </DialogContent>
      <DialogActions className={classes.dialogContent}>
        <Button
          variant="contained"
          className={classes.fullWidthButton}
          color="primary"
          disabled={!Number(fee.gas)}
          onClick={() => onConfirm(fee)}>
          {!transactionData.fee.gas ? (
            <CircularProgress size={themeStyle.spacing(3.5)} />
          ) : (
            t('confirm')
          )}
        </Button>
      </DialogActions>
    </>
  );
};

export default ConfirmStageContent;
