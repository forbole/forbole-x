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

type Stage = 'start' | 'import wallets' | 'import mnemonic' | 'create wallet' | 'confirm mnemonic'

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
  const [error, setError] = React.useState('')

  const createWallet = React.useCallback(async () => {
    try {
      const wallet = await Secp256k1HdWallet.generate(24)
      setMnemonic(wallet.mnemonic)
      setStage('create wallet')
    } catch (err) {
      console.log(err)
    }
  }, [setMnemonic])

  const confirmMnemonic = React.useCallback(
    (input) => {
      if (input === mnemonic) {
        addWallet({ mnemonic, name: 'TEST' })
        onClose()
      } else {
        setError(t('invalid mnemonic'))
      }
    },
    [mnemonic, setStage, addWallet, onClose, setError]
  )

  const content: Content = React.useMemo(() => {
    switch (stage) {
      case 'start':
        return {
          title: t('create wallet title'),
          content: (
            <Start
              onCreateWalletClick={createWallet}
              onImportWalletClick={() => setStage('import wallets')}
            />
          ),
        }
      case 'import wallets':
        return {
          title: '',
          content: <></>,
          prevStage: 'start',
        }
      case 'import mnemonic':
        return {
          title: '',
          content: <></>,
          prevStage: 'start',
        }
      case 'create wallet':
        return {
          title: t('create new wallet title'),
          content: (
            <CreateWallet
              setMnemonic={setMnemonic}
              mnemonic={mnemonic}
              onConfirm={() => setStage('confirm mnemonic')}
            />
          ),
          prevStage: 'start',
        }
      case 'confirm mnemonic':
        return {
          title: t('create new wallet title'),
          content: <ConfirmMnemonic onConfirm={confirmMnemonic} error={error} />,
          prevStage: 'create wallet',
        }
      default:
        return {
          title: '',
          content: <></>,
        }
    }
  }, [stage, t])
  // 'quide check kick present flash casual history auto agree help actor swarm battle decline canyon magnet novel curve dad guild web actor weekend uncover'
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
