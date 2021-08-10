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

const MAX_ADDRESSES = 100

interface SelectAddressesProps {
  onSelect: (addresses: Array<{ address: string; index: number }>) => void
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
    Array<{ address: string; index: number }>
  >([])
  const [loading, setLoading] = React.useState(false)
  const { viewMnemonicPhrase, accounts } = useWalletsContext()
  const existingAddresses = accounts.map((a) => a.address)

  const updateAddresses = React.useCallback(async () => {
    try {
      setLoading(true)
      const newAddresses = []
      const mnemonic = await viewMnemonicPhrase(walletId, securityPassword)
      for (let i = page * rowsPerPage; i < (page + 1) * rowsPerPage; i += 1) {
        const address = await getWalletAddress(mnemonic, crypto, i, ledgerTransport)
        const { total: balance } = await fetchAccountBalance(address, crypto, true)
        newAddresses.push({ address, balance })
      }
      setAddresses(newAddresses)
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }, [page, rowsPerPage, securityPassword, crypto, walletId, ledgerTransport])

  React.useEffect(() => {
    updateAddresses()
  }, [page, rowsPerPage])

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        onSelect(selectedAddresses)
      }}
    >
      <DialogTitle>{t('add account')}</DialogTitle>
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
              const index = page * rowsPerPage + i
              return (
                <TableRow key={index} className={classes.tableRow}>
                  <TableCell className={classes.tableCell}>
                    <Checkbox
                      className={classes.checkbox}
                      disabled={existingAddresses.includes(address)}
                      checked={
                        !!selectedAddresses.find((a) => a.index === index) ||
                        existingAddresses.includes(address)
                      }
                      onChange={(e) =>
                        setSelectedAddresses((a) =>
                          e.target.checked
                            ? [...a, { address, index }]
                            : a.filter((aa) => aa.index !== index)
                        )
                      }
                      color="primary"
                      size="small"
                    />
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <Typography>{index}</Typography>
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <Typography>{`${address.slice(0, 10)}......${address.slice(-10)}`}</Typography>
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
      <DialogActions>
        <Button
          className={classes.dialogButton}
          variant="contained"
          color="primary"
          type="submit"
          disabled={selectedAddresses.length === 0}
        >
          {t('next')}
        </Button>
      </DialogActions>
    </form>
  )
}

export default SelectAddresses
