import React from 'react'
import { Dialog, IconButton } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import useStyles from './styles'
import EditIcon from '../../assets/images/icons/icon_edit.svg'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import BackIcon from '../../assets/images/icons/icon_back.svg'
import useIconProps from '../../misc/useIconProps'
import useIsMobile from '../../misc/useIsMobile'
import useStateHistory from '../../misc/useStateHistory'
import ChangeWalletMonikerDialog from './ChangeWalletMoniker'
import ChangeSecurityPassword from './ChangeSecurityPassword'
import ViewMnemonicPhrase from './ViewMnemonicPhrase'
import SelectMenu from './SelectMenu'
import DeleteWallet from './DeleteWallet'

enum Stage {
  SelectMenuStage = 'select menu',
  ChangeWalletMonikerStage = 'change wallet moniker',
  ChangeSecurityPasswordStage = 'change security password',
  ViewMnenomicPhraseStage = 'view mnenomic phrase',
  AddAccountToWalletStage = 'add account to wallet',
  DeleteWalletStage = 'delete wallet stage',
}

interface EditWalletButtonProps {
  wallet: Wallet
}

interface Content {
  content: React.ReactNode
  dialogWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const EditWalletButton: React.FC<EditWalletButtonProps> = ({ wallet }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const isMobile = useIsMobile()
  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory<Stage>(
    Stage.SelectMenuStage
  )

  const [dialogOpen, setDialogOpen] = React.useState(false)
  const onClose = () => {
    setDialogOpen(false)
  }

  const content: Content = React.useMemo(() => {
    switch (stage) {
      case Stage.ChangeWalletMonikerStage:
        return {
          content: <ChangeWalletMonikerDialog walletId={wallet.id} onClose={onClose} />,
        }
      case Stage.ChangeSecurityPasswordStage:
        return {
          dialogWidth: 'xs',
          content: <ChangeSecurityPassword walletId={wallet.id} onClose={onClose} />,
        }
      case Stage.ViewMnenomicPhraseStage:
        return {
          dialogWidth: 'sm',
          content: <ViewMnemonicPhrase walletId={wallet.id} onClose={onClose} />,
        }
      case Stage.DeleteWalletStage:
        return {
          dialogWidth: 'xs',
          content: <DeleteWallet walletId={wallet.id} onClose={onClose} />,
        }
      case Stage.SelectMenuStage:
      default:
        return {
          content: (
            <SelectMenu
              wallet={wallet}
              changeWalletMoniker={() => setStage(Stage.ChangeWalletMonikerStage)}
              changeSecurityPassword={() => setStage(Stage.ChangeSecurityPasswordStage)}
              checkMnemonicPhrase={() => setStage(Stage.ViewMnenomicPhraseStage)}
              addAccountToWallet={() => setStage(Stage.AddAccountToWalletStage)}
              deleteWallet={() => setStage(Stage.DeleteWalletStage)}
            />
          ),
        }
    }
  }, [stage, t])

  React.useEffect(() => {
    if (dialogOpen) {
      setStage(Stage.SelectMenuStage, true)
    }
  }, [dialogOpen])

  return (
    <>
      <IconButton onClick={() => setDialogOpen(true)}>
        <EditIcon {...iconProps} />
      </IconButton>
      <Dialog fullWidth open={dialogOpen} onClose={onClose} fullScreen={isMobile}>
        {isPrevStageAvailable && stage !== Stage.DeleteWalletStage ? (
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

export default React.memo(EditWalletButton)
