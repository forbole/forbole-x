import { Dialog, IconButton } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import EditIcon from '../../assets/images/icons/icon_edit.svg'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import BackIcon from '../../assets/images/icons/icon_back.svg'
import useStyles from './styles'
import { useWalletsContext } from '../../contexts/WalletsContext'
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
  const [error, setError] = React.useState('')
  const [isSettingNewPassword, setIsSettingNewPassword] = React.useState(false)
  const [securityPassword, setSecurityPassword] = React.useState('')
  const [newSecurityPassword, setNewSecurityPassword] = React.useState('')
  const { updateWallet, viewMnemonicPhrase } = useWalletsContext()
  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory<MenuStage>(
    MenuStage.SelectMenuStage
  )

  // const changeWallet = React.useCallback() => {
  //     setDelegations(d)
  //     setMemo(m)
  //     setStage(DelegationStage.ConfirmDelegationStage)
  //   },
  //   [setStage]
  // )
  const [dialogOpen, setDialogOpen] = React.useState(false)

  // const [anchor, setAnchor] = React.useState<Element>()
  // const onClose = React.useCallback(() => setAnchor(undefined), [setAnchor])
  const onClose = () => {
    setDialogOpen(false)
  }
  const onClick = () => {
    // setAnchor(e.currentTarget)
    setDialogOpen(true)
  }

  const { wallets } = useWalletsContext()
  const wallet = wallets.find((w) => w.id === walletId)
  const [anchor, setAnchor] = React.useState<Element>()

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
      case MenuStage.AddAccountToWalletStage:
        return {
          dialogWidth: 'xs',
          content: <CreateAccount walletId={walletId} onClose={onClose} />,
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
      setError('')
      setSecurityPassword('')
      setNewSecurityPassword('')
      setIsSettingNewPassword(false)
    }
  }, [dialogOpen])

  return (
    <>
      <IconButton onClick={() => onClick()}>
        <EditIcon {...iconProps} />
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
        {content.content}
      </Dialog>
    </>
  )
}

export default React.memo(WalletMenuButton)
