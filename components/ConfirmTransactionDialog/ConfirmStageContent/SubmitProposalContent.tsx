import React from 'react';
import { Box, Divider, Typography } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import last from 'lodash/last';
import cryptocurrencies from '../../../misc/cryptocurrencies';

interface SubmitProposalContentProps {
  msgs: TransactionMsgSubmitProposal[];
  account: Account;
}

const SubmitProposalContent: React.FC<SubmitProposalContentProps> = ({ msgs, account }) => {
  const { t } = useTranslation('common');

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" my={4}>
        <Typography variant="h4">{t('confirm proposal')}</Typography>
      </Box>
      <Divider />
      <Box my={1}>
        <Typography>{t('address')}</Typography>
        <Typography color="textSecondary">{account.address}</Typography>
      </Box>
      <Divider />
      <Box my={1}>
        <Typography>{t('network')}</Typography>
        <Typography color="textSecondary">
          {cryptocurrencies[account.crypto].chainName} -
{account.crypto}
        </Typography>
      </Box>
      <Divider />
      <Box my={1}>
        <Typography>{t('type')}</Typography>
        <Typography color="textSecondary">
          {t(last(msgs[0].value.content.typeUrl.split('.')))}
        </Typography>
      </Box>
      <Divider />
      <Box my={1}>
        <Typography>{t('title')}</Typography>
        <Typography color="textSecondary">{msgs[0].value.content.value.title}</Typography>
      </Box>
      <Divider />
      <Box my={1}>
        <Typography>{t('description')}</Typography>
        <Typography color="textSecondary">{msgs[0].value.content.value.description}</Typography>
      </Box>
      <Divider />
    </>
  );
};

export default SubmitProposalContent;
