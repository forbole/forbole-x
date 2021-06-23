import {
  Avatar,
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Checkbox,
  Typography,
  Dialog,
  IconButton,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import useStyles from './styles'
import { useWalletsContext } from '../../contexts/WalletsContext'
import useIconProps from '../../misc/useIconProps'
import useStateHistory from '../../misc/useStateHistory'
import PasswordInput from '../PasswordInput'
import Success from '../Success'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import BackIcon from '../../assets/images/icons/icon_back.svg'
import AddIcon from '../../assets/images/icons/icon_add wallet.svg'
import useIsMobile from '../../misc/useIsMobile'
import TablePagination from '../TablePagination'
import getWalletAddress from '../../misc/getWalletAddress'

enum Stage {
  SecurityPassword = 'security password',
  SelectNetwork = 'select network',
  SelectAddress = 'select address',
  SuccessStage = 'success',
}

interface AddAccountButtonProps {
  walletId: string
}

const AddAccountButton: React.FC<AddAccountButtonProps> = ({ walletId }) => {
  const { t } = useTranslation('common')
  const smallIconProps = useIconProps()
  const classes = useStyles()
  const [crypto, setCrypto] = React.useState('')
  const [name, setName] = React.useState('')
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const onClose = () => {
    setDialogOpen(false)
  }
  const theme = useTheme()
  const isMobile = useIsMobile()
  const [securityPassword, setSecurityPassword] = React.useState('')
  const [error, setError] = React.useState('')
  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory<Stage>(
    Stage.SecurityPassword
  )
  const { addAccount, accounts, wallets, viewMnemonicPhrase } = useWalletsContext()
  const wallet = wallets.find((w) => w.id === walletId)
  const [state, setState] = React.useState({})

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const onSubmitSecurityPassword = React.useCallback(async () => {
    try {
      await viewMnemonicPhrase(walletId, securityPassword)
      setStage(Stage.SelectNetwork)
    } catch (err) {
      setError(err.message)
    }
  }, [walletId, securityPassword, setError])

  const onSubmit = React.useCallback(async () => {
    try {
      const mnemonic = await viewMnemonicPhrase(walletId, securityPassword)
      const index =
        accounts
          .filter((a) => a.walletId === walletId)
          .map((a) => a.index)
          .reduce((a, b) => Math.max(a, b), 0) + 1
      const address = await getWalletAddress(mnemonic, crypto, index)
      await addAccount({ name, crypto, walletId, index, address }, securityPassword)
      setStage(Stage.SuccessStage)
    } catch (err) {
      setError(err.message)
    }
  }, [
    accounts,
    name,
    addAccount,
    walletId,
    wallet,
    crypto,
    securityPassword,
    setError,
    viewMnemonicPhrase,
  ])

  const onNext = () => {
    if (stage === Stage.SecurityPassword) {
      onSubmitSecurityPassword()
    }
    if (stage === Stage.SelectNetwork) {
      onSubmit()
      setStage(Stage.SelectAddress)
    }
    if (stage === Stage.SelectAddress) {
      setStage(Stage.SuccessStage)
    }
  }

  // fake data for testing
  const networkList = [
    {
      name: 'Akash - AKT',
      img: 'https://raw.githubusercontent.com/forbole/big-dipper-networks/main/logos/akash.svg?sanitize=true',
    },
    {
      name: 'Band Protocol - BAND',
      img: 'https://raw.githubusercontent.com/forbole/big-dipper-networks/main/logos/band.svg?sanitize=true',
    },
    {
      name: 'Cosmos - ATOM',
      img: 'https://raw.githubusercontent.com/forbole/big-dipper-networks/main/logos/cosmoshub.svg?sanitize=true',
    },
    {
      name: 'Desmos- DSM',
      img: 'https://raw.githubusercontent.com/forbole/big-dipper-networks/main/logos/desmos.svg?sanitize=true',
    },
    {
      name: 'e-Money- NGM',
      img: 'https://raw.githubusercontent.com/forbole/big-dipper-networks/main/logos/e-money.svg?sanitize=true',
    },
    {
      name: 'Flow- FLOW',
      img: 'https://raw.githubusercontent.com/forbole/big-dipper-networks/main/logos/flow.svg?sanitize=true',
    },
  ]

  // fake data for testing
  const addressList = [
    {
      ref: 0,
      isSelected: false,
      address: 'cosmos14kn24s...mswhp',
      balance: 110,
    },
    {
      ref: 1,
      isSelected: false,
      address: 'cosmos147fn50...40vndi',
      balance: 11000,
    },
    {
      ref: 2,
      isSelected: false,
      address: 'cosmos147fn50...40vndi',
      balance: 12.0,
    },
    {
      ref: 3,
      isSelected: false,
      address: 'cosmos14kn24s...mswhp',
      balance: 110,
    },
    {
      ref: 4,
      isSelected: false,
      address: 'cosmos147fn50...40vndi',
      balance: 11000,
    },
    {
      ref: 5,
      isSelected: false,
      address: 'cosmos147fn50...40vndi',
      balance: 12.0,
    },
    {
      ref: 6,
      isSelected: false,
      address: 'cosmos14kn24s...mswhp',
      balance: 110,
    },
    {
      ref: 7,
      isSelected: false,
      address: 'cosmos147fn50...40vndi',
      balance: 11000,
    },
    {
      ref: 8,
      isSelected: false,
      address: 'cosmos147fn50...40vndi',
      balance: 12.0,
    },
    {
      ref: 9,
      isSelected: false,
      address: 'cosmos14kn24s...mswhp',
      balance: 110,
    },
    {
      ref: 10,
      isSelected: false,
      address: 'cosmos147fn50...40vndi',
      balance: 11000,
    },
    {
      ref: 11,
      isSelected: false,
      address: 'cosmos147fn50...40vndi',
      balance: 12.0,
    },
  ]

  const [latestAddressList, setLatestAddressList] = React.useState(addressList)

  React.useEffect(() => {
    if (dialogOpen) {
      setSecurityPassword('')
      setError('')
      setStage(Stage.SecurityPassword, true)
    }
  }, [dialogOpen])

  const onSelect = (ref) => {
    const index = latestAddressList.findIndex((v) => v.ref === ref)
    const updatedList = latestAddressList

    if (updatedList[index].isSelected === true) {
      updatedList[index].isSelected = false
    } else {
      updatedList[index].isSelected = true
    }
    setLatestAddressList(updatedList)
  }

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }

  return (
    <>
      <IconButton onClick={() => setDialogOpen(true)} style={{ marginLeft: theme.spacing(-1) }}>
        <AddIcon {...smallIconProps} />
      </IconButton>
      <Dialog fullWidth open={dialogOpen} onClose={onClose} fullScreen={isMobile}>
        {isPrevStageAvailable ? (
          <IconButton className={classes.backButton} onClick={toPrevStage}>
            <BackIcon {...smallIconProps} />
          </IconButton>
        ) : null}
        <IconButton className={classes.closeButton} onClick={onClose}>
          <CloseIcon {...smallIconProps} />
        </IconButton>
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault()
            onNext()
          }}
        >
          {stage === Stage.SecurityPassword ? (
            <DialogTitle>{t('security password')}</DialogTitle>
          ) : null}
          {stage === Stage.SelectNetwork || stage === Stage.SelectAddress ? (
            <DialogTitle>{t('add account')}</DialogTitle>
          ) : null}
          <DialogContent>
            {stage === Stage.SelectNetwork ? (
              <>
                <Box mt={2} mb={1} display="flex" flex={1}>
                  <Typography>{t('select network')}</Typography>
                </Box>

                {networkList.map((x) => (
                  <Box mb={1} display="flex" flex={1}>
                    <Button
                      variant="contained"
                      className={classes.addAccountButton}
                      onClick={() => setStage(Stage.SelectAddress)}
                    >
                      <Box display="flex" flex={1}>
                        <Avatar className={classes.smallAvatar} alt={x.name} src={x.img} />
                        <Box ml={1}>
                          <Typography color="textPrimary">{x.name}</Typography>
                        </Box>
                      </Box>
                    </Button>
                  </Box>
                ))}
              </>
            ) : null}
            {stage === Stage.SelectAddress ? (
              <>
                <Box mt={2} mb={2} display="flex" flex={1}>
                  <Typography>{t('select account(s) you want too add')}</Typography>
                </Box>

                <Table>
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
                    {latestAddressList
                      .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                      .map((x) => (
                        <TableRow className={classes.tableRow}>
                          <TableCell className={classes.tableCell}>
                            <Checkbox
                              className={classes.checkbox}
                              checked={x.isSelected}
                              onClick={() => onSelect(x.ref)}
                              onChange={handleChange}
                              color="primary"
                              size="small"
                              name={String(x.ref)}
                            />
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            <Typography>{x.ref}</Typography>
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            <Typography>{x.address}</Typography>
                          </TableCell>
                          <TableCell className={classes.tableCell} align="right">
                            <Typography>{x.balance}</Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
                <TablePagination
                  page={page}
                  rowsPerPage={rowsPerPage}
                  rowsCount={addressList.length}
                  onPageChange={setPage}
                  onRowsPerPageChange={setRowsPerPage}
                />
              </>
            ) : null}
            {stage === Stage.SecurityPassword ? (
              <Box mb={18}>
                <Typography gutterBottom>{t('enter security password')}</Typography>
                <PasswordInput
                  value={securityPassword}
                  onChange={(e) => setSecurityPassword(e.target.value)}
                  placeholder={t('password')}
                  error={!!error}
                  helperText={error}
                />
              </Box>
            ) : null}
            {stage === Stage.SuccessStage ? (
              <Success onClose={onClose} content="success added accout" hideButton />
            ) : null}
          </DialogContent>
          <DialogActions>
            {stage === Stage.SecurityPassword ? (
              <Button
                className={classes.dialogButton}
                variant="contained"
                color="primary"
                type="submit"
                disabled={securityPassword.length < 6}
              >
                {t('next')}
              </Button>
            ) : null}
            {stage === Stage.SelectAddress ? (
              <Button
                className={classes.dialogButton}
                variant="contained"
                color="primary"
                type="submit"
                disabled={latestAddressList.filter((x) => x.isSelected).length === 0}
              >
                {t('next')}
              </Button>
            ) : null}
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export default AddAccountButton
