import React from 'react';
import { Box, Divider, Typography, useTheme } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import SendIcon from '../../../assets/images/icons/icon_send_tx.svg';
import { formatTokenAmount, getTokenAmountFromDenoms } from '../../../misc/utils';

interface IBCTransferContentProps {
  totalAmount: TokenAmount;
  msgs: TransactionMsgIBCTransfer[];
  denoms: TokenPrice[];
  account: Account;
}

const IBCTransferContent: React.FC<IBCTransferContentProps> = ({
  msgs,
  denoms,
  totalAmount,
  account,
}) => {
  const { t, lang } = useTranslation('common');
  const theme = useTheme();
  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" mt={6}>
        <SendIcon width={theme.spacing(6)} height={theme.spacing(6)} />
        <Box mt={2} mb={4}>
          <Typography variant="h4">
            {t('ibc transfer')}{' '}
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
        <React.Fragment key={m.value.receiver}>
          <Box my={1}>
            <Typography>{t('send to', { number: `# ${i + 1}` })}</Typography>
            <Typography color="textSecondary" gutterBottom>
              {m.value.receiver}
            </Typography>
            <Typography>{t('amount')}</Typography>
            <Typography color="textSecondary">
              {formatTokenAmount(getTokenAmountFromDenoms([m.value.token], denoms || []), {
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

export default IBCTransferContent;
