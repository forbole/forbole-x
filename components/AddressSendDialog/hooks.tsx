import React from 'react';
import get from 'lodash/get';
import { getTokenAmountFromDenoms } from '../../misc/utils';
import useLatestAccountBalance from '../../graphql/hooks/useLatestAccountBalance';

interface useAddressSendDialogHookProps {
  crypto: any;
  account: Account;
}

const useAddressSendDialogHook = ({ account, crypto }: useAddressSendDialogHookProps) => {
  const { data: balanceData } = useLatestAccountBalance(crypto.name, account?.address || '');

  const availableTokens = get(balanceData, 'account[0].available[0]', {
    coins: [],
    tokens_prices: [],
  });

  const availableAmount = React.useMemo(
    () => getTokenAmountFromDenoms(availableTokens.coins, availableTokens.tokens_prices),
    [availableTokens],
  );

  return {
    availableAmount,
    availableTokens,
  };
};

export default useAddressSendDialogHook;
