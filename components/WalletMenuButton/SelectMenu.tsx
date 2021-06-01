import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Typography,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import useStyles from './styles'
import { useWalletsContext } from '../../contexts/WalletsContext'
import useIconProps from '../../misc/useIconProps'
import PasswordInput from '../PasswordInput'
import useStateHistory from '../../misc/useStateHistory'
import useIsMobile from '../../misc/useIsMobile'

enum Stage {
  SecurityPassword = 'security password',
  BackupPassword = 'backup password',
  ExportMnemonic = 'export mnemonic',
}

interface SelectMenuProps {
  walletId: string
  walletName: string
  changeWalletMoniker(): void
  changeSecurityPassword(): void
  checkMnemonicPhrase(): void
  addAccountToWallet(): void
  deleteWallet(): void
  // onClose(): void
}

const SelectMenu: React.FC<SelectMenuProps> = ({
  walletId,
  walletName,
  changeWalletMoniker,
  changeSecurityPassword,
  checkMnemonicPhrase,
  addAccountToWallet,
  deleteWallet,
}) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const isMobile = useIsMobile()
  const [error, setError] = React.useState('')
  const [securityPassword, setSecurityPassword] = React.useState('')
  const [backupPassword, setBackupPassword] = React.useState('')
  const [encryptionPhrase, setEncryptionPhrase] = React.useState('')
  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory<Stage>(
    Stage.SecurityPassword
  )
  const { viewMnemonicPhrase, viewMnemonicPhraseBackup } = useWalletsContext()
  // console.log('viewMnemonicPhrase', viewMnemonicPhrase(walletId, securityPassword))

  const onButtonClick = React.useCallback(async () => {
    try {
      setError('')
      if (stage === Stage.SecurityPassword) {
        await viewMnemonicPhrase(walletId, securityPassword)
        setStage(Stage.BackupPassword)
      } else if (stage === Stage.BackupPassword) {
        // const result = await viewMnemonicPhraseBackup(walletId, securityPassword, backupPassword)
        const result = await viewMnemonicPhrase(walletId, securityPassword)
        console.log('result', result)
        // setEncryptionPhrase(result)
        setStage(Stage.ExportMnemonic)
      } else {
        // onClose()
      }
    } catch (err) {
      setError(err.message)
    }
  }, [
    securityPassword,
    walletId,
    backupPassword,
    stage,
    setError,
    setStage,
    viewMnemonicPhraseBackup,
    viewMnemonicPhrase,
  ])

  return (
    <>
      <DialogTitle>{`${walletName}${t('`s wallet')} `}</DialogTitle>
      <DialogContent>
        <Box mt={2}>
          <Divider />
          <Box my={1} display="flex">
            <Button className={classes.itemButton} onClick={() => changeWalletMoniker()}>
              {t('change wallet moniker')}
            </Button>
          </Box>
          <Divider />
          <Box my={1} display="flex">
            <Button className={classes.itemButton} onClick={() => changeSecurityPassword()}>
              {t('change security password')}
            </Button>
          </Box>
          <Divider />
          <Box my={1} display="flex">
            <Button className={classes.itemButton} onClick={() => checkMnemonicPhrase()}>
              {t('view mnemonic phrase')}
            </Button>
          </Box>
          <Divider />
          <Box my={1} display="flex">
            <Button className={classes.itemButton} onClick={() => addAccountToWallet()}>
              {t('add account to wallet')}
            </Button>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.dialogButton}
          variant="contained"
          color="primary"
          onClick={() => deleteWallet()}
          disabled={stage === Stage.BackupPassword && backupPassword.length < 6}
        >
          {t('delete wallet')}
        </Button>
      </DialogActions>
    </>
  )
}

export default SelectMenu
