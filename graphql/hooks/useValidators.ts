import { gql, useQuery, useLazyQuery } from '@apollo/client';
import get from 'lodash/get';
import React from 'react';
import { getValidators, getValidatorsByAddresses } from '../queries/validators';
import { getProfiles } from '../queries/profile';
import { transformValidators } from '../../misc/utils';

const useValidators = (crypto: string, addresses?: string[]) => {
  const { data: validatorsResult } = useQuery(
    gql`
      ${addresses ? getValidatorsByAddresses(crypto) : getValidators(crypto)}
    `,
    addresses
      ? { variables: { addresses }, fetchPolicy: 'cache-and-network' }
      : { fetchPolicy: 'cache-and-network' },
  );

  const [fetchProfiles, { data: profilesData }] = useLazyQuery(
    gql`
      ${getProfiles(crypto)}
    `,
  );
  React.useEffect(() => {
    if (validatorsResult) {
      fetchProfiles({
        variables: {
          addresses: validatorsResult.validator.map(v => get(v, 'info.self_delegate_address', '')),
        },
      });
    }
  }, [validatorsResult]);

  const result = transformValidators(validatorsResult, profilesData);

  return result;
};

export default useValidators;
