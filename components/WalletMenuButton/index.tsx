import React from 'react'
import { Dialog, IconButton, useTheme } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import useStyles from './styles'
import EditIcon from '../../assets/images/icons/icon_edit.svg'
import AddIcon from '../../assets/images/icons/icon_add wallet.svg'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import BackIcon from '../../assets/images/icons/icon_back.svg'
import useIconProps from '../../misc/useIconProps'
import useIsMobile from '../../misc/useIsMobile'
import useStateHistory from '../../misc/useStateHistory'
import ChangeWalletMonikerDialog from './ChangeWalletMoniker'
import ChangeSecurityPassword from './ChangeSecurityPassword'
import ViewMnemonicPhrase from './ViewMnemonicPhrase'
import CreateAccount from './CreateAccount'
import SelectMenu from './SelectMenu'
import DeleteWallet from './DeleteWallet'

enum MenuStage {
  SelectMenuStage = 'select menu',
  ChangeWalletMonikerStage = 'change wallet moniker',
  ChangeSecurityPasswordStage = 'change security password',
  ViewMnenomicPhraseStage = 'view mnenomic phrase',
  AddAccountToWalletStage = 'add account to wallet',
  DeleteWalletStage = 'delete wallet stage',
}

interface MenuDialogProps {
  walletId: string
  walletName: string
}

interface Content {
  content: React.ReactNode
  dialogWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const WalletMenuButton: React.FC<MenuDialogProps> = ({ walletId, walletName }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const isMobile = useIsMobile()
  const theme = useTheme()
  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory<MenuStage>(
    MenuStage.SelectMenuStage
  )
  const [openedDialog, setOpenedDialog] = React.useState('')

  const [dialogOpen, setDialogOpen] = React.useState(false)
  const onClose = () => {
    setDialogOpen(false)
  }

  const onOpenDialog = (dialog: string) => {
    setOpenedDialog(dialog)
    setDialogOpen(true)
  }

  const content: Content = React.useMemo(() => {
    switch (stage) {
      case MenuStage.ChangeWalletMonikerStage:
        return {
          content: <ChangeWalletMonikerDialog walletId={walletId} onClose={onClose} />,
        }
      case MenuStage.ChangeSecurityPasswordStage:
        return {
          dialogWidth: 'xs',
          content: <ChangeSecurityPassword walletId={walletId} onClose={onClose} />,
        }
      case MenuStage.ViewMnenomicPhraseStage:
        return {
          dialogWidth: 'sm',
          content: <ViewMnemonicPhrase walletId={walletId} onClose={onClose} />,
        }
      case MenuStage.DeleteWalletStage:
        return {
          dialogWidth: 'xs',
          content: <DeleteWallet walletId={walletId} onClose={onClose} />,
        }
      case MenuStage.SelectMenuStage:
      default:
        return {
          content: (
            <SelectMenu
              walletId={walletId}
              walletName={walletName}
              changeWalletMoniker={() => setStage(MenuStage.ChangeWalletMonikerStage)}
              changeSecurityPassword={() => setStage(MenuStage.ChangeSecurityPasswordStage)}
              checkMnemonicPhrase={() => setStage(MenuStage.ViewMnenomicPhraseStage)}
              addAccountToWallet={() => setStage(MenuStage.AddAccountToWalletStage)}
              deleteWallet={() => setStage(MenuStage.DeleteWalletStage)}
            />
          ),
        }
    }
  }, [stage, t])

  React.useEffect(() => {
    if (dialogOpen) {
      setStage(MenuStage.SelectMenuStage, true)
    }
  }, [dialogOpen])

  return (
    <>
      <IconButton onClick={() => onOpenDialog('edit account')}>
        <EditIcon {...iconProps} />
      </IconButton>
      <IconButton
        onClick={() => onOpenDialog('add account')}
        style={{ marginLeft: theme.spacing(-1) }}
      >
        <AddIcon {...iconProps} />
      </IconButton>
      <Dialog
        fullWidth
        open={dialogOpen}
        onClose={onClose}
        fullScreen={isMobile}
        PaperProps={{ classes: { root: classes.dialog } }}
      >
        {isPrevStageAvailable ? (
          <IconButton className={classes.backButton} onClick={toPrevStage}>
            <BackIcon {...iconProps} />
          </IconButton>
        ) : null}
        <IconButton className={classes.closeButton} onClick={onClose}>
          <CloseIcon {...iconProps} />
        </IconButton>
        {openedDialog === 'edit account' ? (
          content.content
        ) : (
          <CreateAccount walletId={walletId} onClose={onClose} />
        )}
      </Dialog>
    </>
  )
}

export default React.memo(WalletMenuButton)
