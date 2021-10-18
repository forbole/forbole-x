/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-await-in-loop */
import React from 'react'
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
  Link,
  TextField,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import times from 'lodash/times'
import TablePagination from '../TablePagination'
import useStyles from './styles'
import getWalletAddress from '../../misc/getWalletAddress'
import { useWalletsContext } from '../../contexts/WalletsContext'
import { fetchAccountBalance } from '../../graphql/fetch/accountBalances'
import { formatTokenAmount } from '../../misc/utils'
import { CustomTheme } from '../../misc/theme'
import cryptocurrencies from '../../misc/cryptocurrencies'

const MAX_ADDRESSES = 100

interface SelectAddressesProps {
  onSelect: (
    addresses: Array<{ address: string; index: number; account: number; change: number }>
  ) => void
  walletId: string
  securityPassword: string
  ledgerTransport?: any
  crypto: string
}

const SelectAddresses: React.FC<SelectAddressesProps> = ({
  onSelect,
  walletId,
  securityPassword,
  crypto,
  ledgerTransport,
}) => {
  const { t, lang } = useTranslation('common')
  const classes = useStyles()
  const theme: CustomTheme = useTheme()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [addresses, setAddresses] = React.useState<
    Array<{ address: string; balance: TokenAmount }>
  >(times(10).map(() => ({ address: '', balance: {} })))
  const [selectedAddresses, setSelectedAddresses] = React.useState<
    Array<{ address: string; index: number; account: number; change: number }>
  >([])
  const [loading, setLoading] = React.useState(false)
  // Advanced account
  const [isAdvance, setIsAdvance] = React.useState(false)
  const [hdAccount, setHdAccount] = React.useState('')
  const [hdIndex, setHdIndex] = React.useState('')
  const [hdChange, setHdChange] = React.useState('')
  const [hdAddress, setHdAddress] = React.useState({ address: '', balance: {} })

  const { viewMnemonicPhrase, accounts, wallets } = useWalletsContext()
  const existingAddresses = accounts.map((a) => a.address)
  const wallet = wallets.find((w) => w.id === walletId)

  const updateAddresses = React.useCallback(async () => {
    try {
      setLoading(true)
      const mnemonic = await viewMnemonicPhrase(walletId, securityPassword)
      if (isAdvance && hdAccount !== '' && hdIndex !== '') {
        const address = await getWalletAddress(
          mnemonic,
          crypto,
          Number(hdAccount) || 0,
          Number(hdChange) || 0,
          Number(hdIndex) || 0,
          ledgerTransport
        )
        const { total: balance } = await fetchAccountBalance(address, crypto, true)
        setHdAddress({ address, balance })
      } else if (!isAdvance) {
        const newAddresses = []
        for (let i = page * rowsPerPage; i < (page + 1) * rowsPerPage; i += 1) {
          const address = await getWalletAddress(mnemonic, crypto, i, 0, 0, ledgerTransport)
          const { total: balance } = await fetchAccountBalance(address, crypto, true)
          newAddresses.push({ address, balance })
        }
        setAddresses(newAddresses)
      }
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }, [
    page,
    rowsPerPage,
    securityPassword,
    crypto,
    walletId,
    ledgerTransport,
    isAdvance,
    hdAccount,
    hdChange,
    hdIndex,
  ])

  React.useEffect(() => {
    updateAddresses()
  }, [page, rowsPerPage, hdAccount, hdIndex, hdChange, isAdvance])

  return (
    <form
      noValidate
      onSubmit={async (e) => {
        e.preventDefault()
        onSelect(
          isAdvance
            ? [
                {
                  address: hdAddress.address,
                  account: Number(hdAccount) || 0,
                  index: Number(hdIndex) || 0,
                  change: Number(hdChange) || 0,
                },
              ]
            : selectedAddresses
        )
      }}
    >
      <DialogTitle>{t('add account')}</DialogTitle>
      {isAdvance ? (
        <DialogContent>
          <Box mt={2} mb={2} display="flex" flex={1}>
            <Button onClick={() => setIsAdvance(false)} color="primary">
              {t('select account(s) you want to add')}
            </Button>
          </Box>
          <Typography gutterBottom>{t('advanced account')}</Typography>
          <Typography gutterBottom>{t('enter hd path')}</Typography>
          <Box display="flex" alignItems="center">
            <Typography>m/44'/{cryptocurrencies[crypto].coinType}'/</Typography>
            <Box mx={2}>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                InputProps={{
                  disableUnderline: true,
                }}
                value={hdAccount}
                onChange={(e) => setHdAccount(e.target.value)}
              />
            </Box>
            {wallet.type === 'mnemonic' ? (
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
                    onChange={(e) => setHdChange(e.target.value)}
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
                onChange={(e) => setHdIndex(e.target.value)}
              />
            </Box>
          </Box>
          {hdAddress.address ? (
            <>
              <Box mt={2}>
                <Typography>{t('account')}</Typography>
                <Typography color="textSecondary">{hdAddress.address}</Typography>
              </Box>
              <Box mt={2}>
                <Typography>{t('balance')}</Typography>
                <Typography color="textSecondary">
                  {formatTokenAmount(hdAddress.balance, crypto, lang)}
                </Typography>
              </Box>
            </>
          ) : null}
        </DialogContent>
      ) : (
        <DialogContent>
          <Box mt={2} mb={2} display="flex" flex={1}>
            <Typography>{t('select account(s) you want to add')}</Typography>
          </Box>
          <Table style={{ position: 'relative' }}>
            <TableHead>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCell}> </TableCell>
                <TableCell className={classes.tableCell}>
                  <Typography>#</Typography>
                </TableCell>
                <TableCell className={classes.tableCell}>{t('address')}</TableCell>
                <TableCell className={classes.tableCell} align="right">
                  {t('balance')}
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {addresses.map(({ address, balance }, i) => {
                const account = page * rowsPerPage + i
                return (
                  <TableRow key={account} className={classes.tableRow}>
                    <TableCell className={classes.tableCell}>
                      <Checkbox
                        className={classes.checkbox}
                        disabled={loading || existingAddresses.includes(address)}
                        checked={
                          !!selectedAddresses.find((a) => a.account === account) ||
                          existingAddresses.includes(address)
                        }
                        onChange={(e) =>
                          setSelectedAddresses((a) =>
                            e.target.checked
                              ? [...a, { address, account, index: 0, change: 0 }]
                              : a.filter((aa) => aa.account !== account)
                          )
                        }
                        color="primary"
                        size="small"
                      />
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <Typography>{account}</Typography>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <Typography>
                        {`${address.slice(0, 10)}......${address.slice(-10)}`}
                      </Typography>
                    </TableCell>
                    <TableCell className={classes.tableCell} align="right">
                      <Typography>{formatTokenAmount(balance, crypto, lang)}</Typography>
                    </TableCell>
                  </TableRow>
                )
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
          className={classes.dialogButton}
          variant="contained"
          color="primary"
          type="submit"
          disabled={isAdvance ? !hdAddress.address : selectedAddresses.length === 0}
        >
          {t('next')}
        </Button>
      </DialogActions>
    </form>
  )
}

export default SelectAddresses
