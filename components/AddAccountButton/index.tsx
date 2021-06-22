import {
  Avatar,
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListItemAvatar,
  MenuItem,
  TextField,
  Typography,
  Divider,
  Dialog,
  IconButton,
  useTheme,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import useStyles from './styles'
import { useWalletsContext } from '../../contexts/WalletsContext'
import useIconProps from '../../misc/useIconProps'
import cryptocurrencies from '../../misc/cryptocurrencies'
import useStateHistory from '../../misc/useStateHistory'
import PasswordInput from '../PasswordInput'
import CreateAccountIcon from '../../assets/images/icons/icon_create account.svg'
import ImportAccountIcon from '../../assets/images/icons/icon_import account.svg'
import Success from '../Success'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import BackIcon from '../../assets/images/icons/icon_back.svg'
import AddIcon from '../../assets/images/icons/icon_add wallet.svg'
import useIsMobile from '../../misc/useIsMobile'
import getWalletAddress from '../../misc/getWalletAddress'

enum Stage {
  AddAccount = 'add account',
  ImportAccount = 'import account',
  CreateAccount = 'create account',
  ConfirmImport = 'confirm import',
  SecurityPassword = 'security password',
  SuccessStage = 'success',
}

interface AddAccountButtonProps {
  walletId: string
}

const AddAccountButton: React.FC<AddAccountButtonProps> = ({ walletId }) => {
  const { t } = useTranslation('common')
  const smallIconProps = useIconProps()
  const iconProps = useIconProps(3)
  const classes = useStyles()
  // for create account
  const [crypto, setCrypto] = React.useState('')
  const [name, setName] = React.useState('')
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const onClose = () => {
    setDialogOpen(false)
  }
  const theme = useTheme()
  const isMobile = useIsMobile()

  // for import account
  const [importedCrypto, setImportedCrypto] = React.useState('')
  const [importedName, setImportedName] = React.useState('')
  const [importedAddress, setImportedAddress] = React.useState('')

  const [securityPassword, setSecurityPassword] = React.useState('')
  const [error, setError] = React.useState('')
  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory<Stage>(
    Stage.AddAccount
  )
  const { addAccount, accounts, wallets, viewMnemonicPhrase } = useWalletsContext()
  const wallet = wallets.find((w) => w.id === walletId)

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
    if (stage === Stage.CreateAccount) {
      setStage(Stage.SecurityPassword)
    }
    if (stage === Stage.SecurityPassword) {
      onSubmit()
    }
    if (stage === Stage.ImportAccount) {
      setStage(Stage.ConfirmImport)
    }
    if (stage === Stage.ConfirmImport) {
      setStage(Stage.SuccessStage)
    }
  }

  React.useEffect(() => {
    if (dialogOpen) {
      setImportedCrypto('')
      setImportedName('')
      setImportedAddress('')
      setSecurityPassword('')
      setError('')
      setStage(Stage.AddAccount, true)
    }
  }, [dialogOpen])

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
          {stage === Stage.SuccessStage ? null : <DialogTitle>{t(`${stage} title`)}</DialogTitle>}

          <DialogContent>
            {stage === Stage.AddAccount ? (
              <>
                <Box mt={2} mb={3} display="flex" flex={1}>
                  <Button
                    variant="contained"
                    className={classes.addAccountButton}
                    onClick={() => setStage(Stage.CreateAccount)}
                  >
                    <Box display="flex" flex={1}>
                      <CreateAccountIcon {...iconProps} />
                      <Box ml={1}>
                        <Typography color="textPrimary">{t('create account')}</Typography>
                      </Box>
                    </Box>
                  </Button>
                </Box>
                <Box mb={30} display="flex" flex={1}>
                  <Button
                    variant="contained"
                    className={classes.addAccountButton}
                    onClick={() => setStage(Stage.ImportAccount)}
                  >
                    <Box display="flex" flex={1}>
                      <ImportAccountIcon {...iconProps} />
                      <Box ml={1}>
                        <Typography color="textPrimary">{t('import account')}</Typography>
                      </Box>
                    </Box>
                  </Button>
                </Box>
              </>
            ) : null}
            {stage === Stage.ImportAccount ? (
              <>
                <Box mb={2}>
                  <Typography gutterBottom>{t('select network')}</Typography>
                  <TextField
                    fullWidth
                    variant="filled"
                    placeholder={t('select network')}
                    InputProps={{
                      disableUnderline: true,
                    }}
                    SelectProps={{
                      classes: { icon: classes.icon },
                    }}
                    value={importedCrypto}
                    onChange={(e) => setImportedCrypto(e.target.value)}
                    select
                  >
                    {Object.values(cryptocurrencies).map((c) => (
                      <MenuItem key={c.name} value={c.name}>
                        <ListItemAvatar className={classes.cryptoMenuItemAvatar}>
                          <Avatar alt={c.name} src={c.image} className={classes.smallAvatar} />
                        </ListItemAvatar>
                        <Typography>{c.name}</Typography>
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
                <Box mb={2}>
                  <Typography gutterBottom>{t('insert address')}</Typography>
                  <TextField
                    fullWidth
                    variant="filled"
                    InputProps={{
                      disableUnderline: true,
                    }}
                    placeholder={t('insert address')}
                    value={importedAddress}
                    onChange={(e) => setImportedAddress(e.target.value)}
                  />
                </Box>
                <Box mb={8}>
                  <Typography gutterBottom>{t('moniker')}</Typography>
                  <TextField
                    fullWidth
                    variant="filled"
                    InputProps={{
                      disableUnderline: true,
                    }}
                    placeholder={t('set an account name')}
                    value={importedName}
                    onChange={(e) => setImportedName(e.target.value)}
                  />
                </Box>
              </>
            ) : null}
            {stage === Stage.CreateAccount ? (
              <>
                <Box mb={2}>
                  <Typography gutterBottom>{t('network')}</Typography>
                  <TextField
                    fullWidth
                    variant="filled"
                    placeholder={t('select network')}
                    InputProps={{
                      disableUnderline: true,
                    }}
                    SelectProps={{
                      classes: { icon: classes.icon },
                    }}
                    value={crypto}
                    onChange={(e) => setCrypto(e.target.value)}
                    select
                  >
                    {Object.values(cryptocurrencies).map((c) => (
                      <MenuItem key={c.name} value={c.name}>
                        <ListItemAvatar className={classes.cryptoMenuItemAvatar}>
                          <Avatar alt={c.name} src={c.image} className={classes.smallAvatar} />
                        </ListItemAvatar>
                        <Typography>{c.name}</Typography>
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
                <Box mb={8}>
                  <Typography gutterBottom>{t('moniker')}</Typography>
                  <TextField
                    fullWidth
                    variant="filled"
                    InputProps={{
                      disableUnderline: true,
                    }}
                    placeholder={t('account moniker')}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Box>
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
              <Success onClose={onClose} content="success created accout" hideButton />
            ) : null}
            {stage === Stage.ConfirmImport ? (
              <Box mb={6}>
                <Box my={2}>
                  <Typography gutterBottom>{t('network')}</Typography>
                  <Box display="flex" alignItems="center" my={1.5}>
                    <Avatar
                      alt={cryptocurrencies[importedCrypto].name}
                      src={cryptocurrencies[importedCrypto].image}
                      className={classes.smallAvatar}
                    />
                    <Typography color="textSecondary" className={classes.networkText}>
                      {cryptocurrencies[importedCrypto].name}
                    </Typography>
                  </Box>
                </Box>
                <Divider />
                <Box my={2}>
                  <Typography gutterBottom>{t('address')}</Typography>
                  <Box display="flex" alignItems="center" my={1.5}>
                    <Typography color="textSecondary">{importedAddress}</Typography>
                  </Box>
                </Box>
                <Divider />
                <Box my={2}>
                  <Typography gutterBottom>{t('moniker')}</Typography>
                  <Box display="flex" alignItems="center" my={1.5}>
                    <Typography color="textSecondary">{importedName}</Typography>
                  </Box>
                </Box>
                <Divider />
              </Box>
            ) : null}
          </DialogContent>
          <DialogActions>
            {stage === Stage.CreateAccount ? (
              <Button
                className={classes.dialogButton}
                variant="contained"
                color="primary"
                type="submit"
                disabled={!(crypto !== '' && name !== '')}
              >
                {t('next')}
              </Button>
            ) : null}
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
            {stage === Stage.ImportAccount ? (
              <Button
                className={classes.dialogButton}
                variant="contained"
                color="primary"
                type="submit"
                disabled={!(importedCrypto !== '' && importedName !== '' && importedAddress !== '')}
              >
                {t('next')}
              </Button>
            ) : null}
            {stage === Stage.ConfirmImport ? (
              <Button
                className={classes.dialogButton}
                variant="contained"
                color="primary"
                type="submit"
              >
                {t('confirm')}
              </Button>
            ) : null}
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export default AddAccountButton
