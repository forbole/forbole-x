import { Dialog, DialogTitle, IconButton } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import ClossIcon from '../../assets/images/icons/icon_cross.svg'
import BackIcon from '../../assets/images/icons/icon_back.svg'
import React from 'react'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'
import Start from './Start'
import CreateWallet from './CreateWallet'
import { Secp256k1HdWallet } from '@cosmjs/launchpad'
import ConfirmMnemonic from './ConfirmMnemonic'
import { useWalletsContext } from '../../contexts/WalletsContext'
import SecurityPassword from './SecurityPassword'

type Stage =
  | 'start'
  | 'import wallets'
  | 'import mnemonic'
  | 'create wallet'
  | 'confirm mnemonic'
  | 'set security password'
  | 'import wallet'

interface CreateWalletDialogProps {
  open: boolean
  onClose(): void
}

interface Content {
  title: string
  content: React.ReactNode
  prevStage?: Stage
}

const CreateWalletDialog: React.FC<CreateWalletDialogProps> = ({ open, onClose }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const { addWallet } = useWalletsContext()
  const [stage, setStage] = React.useState<Stage>('start')
  const [mnemonic, setMnemonic] = React.useState('')
  const [pubkey, setPubkey] = React.useState<Uint8Array>()
  const [securityPassword, setSecurityPassword] = React.useState('')
  const [error, setError] = React.useState('')

  const createWallet = React.useCallback(async () => {
    const wallet = await Secp256k1HdWallet.generate(24)
    setPubkey((wallet as any).pubkey)
    setMnemonic(wallet.mnemonic)
    setStage('create wallet')
  }, [setMnemonic])

  const confirmMnemonic = React.useCallback(
    (input) => {
      if (input === mnemonic) {
        setStage('set security password')
      } else {
        setError(t('invalid mnemonic'))
      }
    },
    [mnemonic, setStage, setError, pubkey]
  )

  const confirmSecurityPassword = React.useCallback(
    (pw: string) => {
      setSecurityPassword(pw)
      setStage('import wallet')
    },
    [setStage, setSecurityPassword]
  )

  const content: Content = React.useMemo(() => {
    switch (stage) {
      case 'import wallets':
        return {
          title: '',
          content: <></>,
          prevStage: 'start',
        }
      // case 'import mnemonic':
      //   return {
      //     title: '',
      //     content: <></>,
      //     prevStage: 'start',
      //   }
      case 'create wallet':
        return {
          title: t('create new wallet title'),
          content: (
            <CreateWallet mnemonic={mnemonic} onConfirm={() => setStage('confirm mnemonic')} />
          ),
          prevStage: 'start',
        }
      case 'confirm mnemonic':
        return {
          title: t('create new wallet title'),
          content: <ConfirmMnemonic onConfirm={confirmMnemonic} error={error} />,
          prevStage: 'create wallet',
        }
      case 'set security password':
        return {
          title: t('security password title'),
          content: <SecurityPassword onConfirm={confirmSecurityPassword} />,
          prevStage: 'confirm mnemonic',
        }
      case 'import wallet':
        return {
          title: t('import wallet title'),
          content: <></>,
          prevStage: 'set security password',
        }
      case 'start':
      default:
        return {
          title: t('create wallet title'),
          content: (
            <Start
              onCreateWalletClick={createWallet}
              onImportWalletClick={() => setStage('import wallets')}
            />
          ),
        }
    }
  }, [stage, t])

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      {content.prevStage ? (
        <IconButton className={classes.backButton} onClick={() => setStage(content.prevStage)}>
          <BackIcon {...iconProps} />
        </IconButton>
      ) : null}
      <IconButton className={classes.closeButton} onClick={onClose}>
        <ClossIcon {...iconProps} />
      </IconButton>
      <DialogTitle>{content.title}</DialogTitle>
      {content.content}
    </Dialog>
  )
}

export default CreateWalletDialog
