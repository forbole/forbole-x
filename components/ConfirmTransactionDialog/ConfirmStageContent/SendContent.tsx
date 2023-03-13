import React from 'react';
import { Box, Divider, Typography, useTheme } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import SendIcon from '../../../assets/images/icons/icon_send_tx.svg';
import { formatTokenAmount, getTokenAmountFromDenoms } from '../../../misc/utils';

interface SendContentProps {
  totalAmount: TokenAmount;
  msgs: TransactionMsgSend[];
  denoms: TokenPrice[];
  account: Account;
}

const SendContent: React.FC<SendContentProps> = ({ msgs, denoms, totalAmount, account }) => {
  const { t, lang } = useTranslation('common');
  const theme = useTheme();
  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" mt={6}>
        <SendIcon width={theme.spacing(6)} height={theme.spacing(6)} />
        <Box mt={2} mb={4}>
          <Typography variant="h4">
            {t('send')}{' '}
            {formatTokenAmount(totalAmount, { defaultUnit: account.crypto, lang, delimiter: ', ' })}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box my={1}>
        <Typography>{t('from')}</Typography>
        <Typography color="textSecondary">{account.address}</Typography>
      </Box>
      <Divider />
      {msgs.map((m, i) => (
        <React.Fragment key={m.value.toAddress}>
          <Box my={1}>
            <Typography>{t('send to', { number: `# ${i + 1}` })}</Typography>
            <Typography color="textSecondary" gutterBottom>
              {m.value.toAddress}
            </Typography>
            <Typography>{t('amount')}</Typography>
            <Typography color="textSecondary">
              {formatTokenAmount(getTokenAmountFromDenoms(m.value.amount, denoms || []), {
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

export default SendContent;
