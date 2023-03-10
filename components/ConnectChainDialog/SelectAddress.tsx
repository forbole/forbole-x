/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-await-in-loop */
import React from 'react';
import {
  Box,
  DialogTitle,
  DialogContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  DialogActions,
  Button,
  useTheme,
  CircularProgress,
  TextField,
} from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import times from 'lodash/times';
import TablePagination from '../TablePagination';
import useStyles from './styles';
import getWalletAddress from '../../misc/tx/getWalletAddress';
import { CustomTheme } from '../../misc/theme';

const MAX_ADDRESSES = 100;

interface SelectAddressProps {
  onConfirm: (result: { address: string; account: number; change: number; index: number }) => void;
  coinType: number;
  prefix: string;
  mnemonic: string;
  ledgerAppName: string;
  ledgerTransport: any;
}

const SelectAddress: React.FC<SelectAddressProps> = ({
  onConfirm,
  coinType,
  prefix,
  mnemonic,
  ledgerAppName,
  ledgerTransport,
}) => {
  const { t } = useTranslation('common');
  const classes = useStyles();
  const theme: CustomTheme = useTheme();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [addresses, setAddresses] = React.useState(
    times(10).map(() => ({ address: '', index: 0, account: 0, change: 0 })),
  );
  const [selectedAddress, setSelectedAddress] = React.useState<{
    address: string;
    index: number;
    account: number;
    change: number;
  }>({ address: '', index: 0, account: 0, change: 0 });
  const [loading, setLoading] = React.useState(false);
  // Advanced account
  const [isAdvance, setIsAdvance] = React.useState(false);
  const [hdAccount, setHdAccount] = React.useState('');
  const [hdIndex, setHdIndex] = React.useState('');
  const [hdChange, setHdChange] = React.useState('');
  const [hdAddress, setHdAddress] = React.useState('');

  const updateAddresses = React.useCallback(async () => {
    try {
      setLoading(true);
      if (isAdvance && hdAccount !== '' && hdIndex !== '') {
        const address = await getWalletAddress(
          mnemonic,
          {
            prefix,
            coinType,
            ledgerAppName,
            account: Number(hdAccount) || 0,
            change: Number(hdChange) || 0,
            index: Number(hdIndex) || 0,
          },
          ledgerTransport,
        );
        setHdAddress(address);
      } else if (!isAdvance) {
        const newAddresses = [];
        for (let i = page * rowsPerPage; i < (page + 1) * rowsPerPage; i += 1) {
          const address = await getWalletAddress(
            mnemonic,
            {
              prefix,
              coinType,
              ledgerAppName,
              account: i,
              change: 0,
              index: 0,
            },
            ledgerTransport,
          );
          newAddresses.push({ address, index: 0, account: i, change: 0 });
        }
        setAddresses(newAddresses);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, [
    page,
    rowsPerPage,
    coinType,
    prefix,
    mnemonic,
    ledgerAppName,
    ledgerTransport,
    isAdvance,
    hdAccount,
    hdChange,
    hdIndex,
  ]);

  React.useEffect(() => {
    updateAddresses();
  }, [page, rowsPerPage, hdAccount, hdIndex, hdChange, isAdvance]);

  return (
    <form
      noValidate
      onSubmit={async e => {
        e.preventDefault();
        onConfirm(
          isAdvance
            ? {
                address: hdAddress,
                account: Number(hdAccount) || 0,
                index: Number(hdIndex) || 0,
                change: Number(hdChange) || 0,
              }
            : selectedAddress,
        );
      }}
    >
      {isAdvance ? (
        <DialogContent>
          <Box mt={2} mb={2} display="flex" flex={1}>
            <Button onClick={() => setIsAdvance(false)} color="primary">
              {t('select address to connect')}
            </Button>
          </Box>
          <Typography gutterBottom>{t('advanced account')}</Typography>
          <Typography gutterBottom>{t('enter hd path')}</Typography>
          <Box display="flex" alignItems="center">
            <Typography>
              m/44'/
              {coinType}
              '/
            </Typography>
            <Box mx={2}>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                InputProps={{
                  disableUnderline: true,
                }}
                value={hdAccount}
                onChange={e => setHdAccount(e.target.value)}
              />
            </Box>
            {!ledgerTransport ? (
              <>
                <Typography>'/</Typography>
                <Box mx={2}>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    InputProps={{
                      disableUnderline: true,
                    }}
                    value={hdChange}
                    onChange={e => setHdChange(e.target.value)}
                  />
                </Box>
                <Typography>'/</Typography>
              </>
            ) : (
              <Typography>'/0'/</Typography>
            )}
            <Box mx={2}>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                InputProps={{
                  disableUnderline: true,
                }}
                value={hdIndex}
                onChange={e => setHdIndex(e.target.value)}
              />
            </Box>
          </Box>
          {hdAddress ? (
            <Box mt={2}>
              <Typography>{t('account')}</Typography>
              <Typography color="textSecondary">{hdAddress}</Typography>
            </Box>
          ) : null}
        </DialogContent>
      ) : (
        <DialogContent>
          <Box mt={2} mb={2} display="flex" flex={1}>
            <Typography>{t('select address to connect')}</Typography>
          </Box>
          <Table style={{ position: 'relative' }}>
            <TableHead>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCell}> </TableCell>
                <TableCell className={classes.tableCell}>
                  <Typography>#</Typography>
                </TableCell>
                <TableCell className={classes.tableCell}>{t('address')}</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {addresses.map(({ address }, i) => {
                const account = page * rowsPerPage + i;
                return (
                  <TableRow key={account} className={classes.tableRow}>
                    <TableCell className={classes.tableCell}>
                      <Checkbox
                        className={classes.denseCheckbox}
                        disabled={loading}
                        checked={selectedAddress.address && selectedAddress.account === account}
                        onChange={() =>
                          setSelectedAddress({ address, account, index: 0, change: 0 })
                        }
                        color="primary"
                        size="small"
                      />
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <Typography>{account}</Typography>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <Typography>{address}</Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            {loading ? (
              <Box
                position="absolute"
                top={0}
                bottom={0}
                left={0}
                right={0}
                display="flex"
                justifyContent="center"
                alignItems="center"
                bgcolor={theme.palette.translucent}
              >
                <CircularProgress />
              </Box>
            ) : null}
          </Table>
          <TablePagination
            page={page}
            rowsPerPage={rowsPerPage}
            rowsCount={MAX_ADDRESSES}
            onPageChange={setPage}
            onRowsPerPageChange={setRowsPerPage}
          />
        </DialogContent>
      )}
      {isAdvance ? null : (
        <Box ml={2} mb={-2}>
          <Button onClick={() => setIsAdvance(true)} color="primary">
            {t('advanced account')}
          </Button>
        </Box>
      )}
      <DialogActions>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
          disabled={isAdvance ? !hdAddress : !selectedAddress.address}
        >
          {t('next')}
        </Button>
      </DialogActions>
    </form>
  );
};

export default SelectAddress;
