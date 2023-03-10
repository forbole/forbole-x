import React from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  useTheme,
  IconButton,
  TableSortLabel,
} from '@material-ui/core';
import { gql, useQuery } from '@apollo/client';
import useTranslation from 'next-translate/useTranslation';
import keyBy from 'lodash/keyBy';
import get from 'lodash/get';
import { ArrowDropDown } from '@material-ui/icons';
import TablePagination from '../TablePagination';
import InActiveStatus from './InActive';
import useGetStyles from './styles';
import useIconProps from '../../misc/useIconProps';
import { getSlashingParams } from '../../graphql/queries/validators';
import {
  formatPercentage,
  formatCrypto,
  getValidatorCondition,
  getValidatorConditionClass,
} from '../../misc/utils';
import StarIcon from '../../assets/images/icons/icon_star.svg';
import StarFilledIcon from '../../assets/images/icons/icon_star_marked.svg';
import { useGeneralContext } from '../../contexts/GeneralContext';
import { useTableDefaultHook } from './hooks';
import DelegationDialog from '../DelegationDialog';
import InfoPopover from './InfoPopover';
import ValidatorAvatar from '../ValidatorAvatar';
import Condition from '../Condition';

interface ValidatorsTableProps {
  validators: Validator[];
  crypto: any;
  account: Account;
  onToggle?: any;
  alignRight?: boolean;
  initialActiveSort?: string;
  initialSortDirection?: 'asc' | 'desc';
  pagination?: {
    rowsPerPage: number | undefined;
  };
  availableTokens: AvailableTokens;
  currentTab: number;
}

const ValidatorsTable: React.FC<ValidatorsTableProps> = ({
  validators,
  crypto,
  account,
  alignRight,
  pagination,
  initialActiveSort,
  initialSortDirection,
  availableTokens,
  currentTab,
}) => {
  const { classes } = useGetStyles();
  const { t, lang } = useTranslation('common');
  const theme = useTheme();
  const iconProps = useIconProps();
  const { addFavValidators, deleteFavValidators, favValidators } = useGeneralContext();
  const [delegatingValidator, setDelegatingValidator] = React.useState<Validator>();
  const validatorsMap = keyBy(validators, 'address');

  const { data: paramsData } = useQuery(
    gql`
      ${getSlashingParams(get(crypto, 'name', ''))}
    `,
  );
  const slashingParams = get(paramsData, ['slashing_params', 0, 'params'], {
    signed_blocks_window: 0,
  });
  const signedBlockWindow = slashingParams.signed_blocks_window;

  const totalVotingPower = React.useMemo(
    () => validators.map(v => v.votingPower).reduce((a, b) => a + b, 0),
    [validators],
  );

  const { handleChangePage, handleChangeRowsPerPage, handleSort, state } = useTableDefaultHook({
    data: validators,
    rowsPerPageCount: pagination?.rowsPerPage,
    initialActiveSort,
    initialSortDirection,
  });

  const columns = [
    {
      label: 'order',
      display: 'order',
      sort: true,
    },
    {
      label: 'name',
      display: 'validator',
      sort: true,
    },
    // {
    //   label: 'location',
    //   display: 'location',
    // },
    {
      label: 'votingPower',
      display: 'voting power',
      sort: true,
    },
    // {
    //   label: 'selfRatio',
    //   display: 'self ratio',
    //   sort: true,
    // },
    {
      label: 'commission',
      display: 'commission',
      sort: true,
    },
    {
      label: 'status',
      display: 'status',
      lableAlign: alignRight,
      detail: 'status popover detail',
    },
  ];

  const toggleFav = (validator: Validator) => {
    if (favValidators.includes(validator.address)) {
      deleteFavValidators(validator.address);
    } else {
      addFavValidators(validator.address);
    }
  };

  React.useEffect(() => {
    handleChangePage(0);
  }, [currentTab]);

  return (
    <Box mt={2}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {columns.map(column => {
              if (column.sort) {
                return (
                  <TableCell key={column.label}>
                    <TableSortLabel
                      className={classes.table__label}
                      active={state.activeSort === column.label}
                      direction={state.activeSort === column.label ? state.sortDirection : 'asc'}
                      onClick={handleSort(column.label)}
                      IconComponent={ArrowDropDown}>
                      {column.display ? t(column.display) : ''}
                    </TableSortLabel>
                  </TableCell>
                );
              }
              return (
                <TableCell key={column.label} className={classes.table__label}>
                  <Box display="flex" alignItems="center">
                    {column.display ? t(column.label) : ''}
                    {column.label === 'status' ? (
                      <InfoPopover detail={t(column.detail)} className={classes.popover} />
                    ) : null}
                  </Box>
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {state.data
            .slice(
              state.page * state.rowsPerPage,
              state.page * state.rowsPerPage + state.rowsPerPage,
            )
            .map(v => {
              const missedBlockCounter = get(validatorsMap, [v.address, 'missedBlockCounter'], 0);
              const conditionClass = getValidatorCondition(signedBlockWindow, missedBlockCounter);
              const condition =
                get(validatorsMap, [v.address, 'status'], '') === 'active'
                  ? getValidatorConditionClass(conditionClass)
                  : undefined;
              return (
                <TableRow key={v.address} className={classes.tableRow}>
                  <TableCell className={classes.tableCell}>
                    <Box
                      display="flex"
                      alignItems="center"
                      width={theme.spacing(8)}
                      justifyContent="space-between">
                      {v.order}
                      <IconButton onClick={() => toggleFav({ ...v })}>
                        {favValidators.includes(v.address) ? (
                          <StarFilledIcon {...iconProps} fill={theme.palette.warning.light} />
                        ) : (
                          <StarIcon {...iconProps} />
                        )}
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <ValidatorAvatar crypto={crypto} validator={v} size="small" />
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {formatCrypto(v.votingPower, { unit: crypto.name, lang })} (
                    {formatPercentage(v.votingPower / totalVotingPower, lang)})
                  </TableCell>
                  {/* <TableCell className={classes.tableCell}>
                    {formatPercentage(v.selfRatio, lang)}
                  </TableCell> */}
                  <TableCell className={classes.tableCell}>
                    {formatPercentage(v.commission, lang)}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {v.isActive ? (
                      <Condition className={condition} onClick={() => setDelegatingValidator(v)} />
                    ) : (
                      <InActiveStatus
                        status={v.status}
                        alignRight={alignRight}
                        onClick={() => setDelegatingValidator(v)}
                      />
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <TablePagination
        page={state.page}
        rowsPerPage={state.rowsPerPage}
        rowsCount={validators.length}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {account && availableTokens ? (
        <DelegationDialog
          open={!!delegatingValidator}
          onClose={() => setDelegatingValidator(undefined)}
          account={account}
          validators={validators}
          defaultValidator={delegatingValidator}
          availableTokens={availableTokens}
        />
      ) : null}
    </Box>
  );
};

export default ValidatorsTable;
