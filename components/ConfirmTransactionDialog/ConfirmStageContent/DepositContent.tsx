import { Divider, Typography, Box } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { formatTokenAmount, getTokenAmountFromDenoms } from '../../../misc/utils';

interface DepositContentProps {
  msgs: TransactionMsgDeposit[];
  account: Account;
  denoms: TokenPrice[];
}

const DepositContent: React.FC<DepositContentProps> = ({ msgs, account, denoms }) => {
  const { t, lang } = useTranslation('common');

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" my={4}>
        <Typography variant="h4">{t('deposit')}</Typography>
      </Box>
      <Divider />
      {msgs.map((msg, i) => (
        <React.Fragment key={String(i)}>
          <Box my={1}>
            <Typography>{t('address')}</Typography>
            <Typography color="textSecondary">{msg.value.depositor}</Typography>
          </Box>
          <Divider />
          <Box my={1}>
            <Typography>{t('deposit to')}</Typography>
            <Typography color="textSecondary">
              {`${t('proposal')} #${msg.value.proposalId}`}
            </Typography>
          </Box>
          <Divider />
          <Box my={1}>
            <Typography>{t('amount')}</Typography>
            <Typography color="textSecondary">
              {formatTokenAmount(getTokenAmountFromDenoms(msg.value.amount, denoms), {
                defaultUnit: account.crypto,
                lang,
              })}
            </Typography>
          </Box>
          <Divider />
        </React.Fragment>
      ))}
    </>
  );
};

export default DepositContent;
