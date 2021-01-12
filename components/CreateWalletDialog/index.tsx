import { Dialog, DialogTitle, IconButton } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import ClossIcon from '../../assets/images/icons/icon_cross.svg'
import React from 'react'
import useStyles from './styles'
import useIconProps from '../../misc/useIconProps'
import Start from './Start'
import CreateWallet from './CreateWallet'

type Stage = 'start' | 'import wallets' | 'import mnemonic' | 'create wallet' | 'confirm mnemonic'

interface CreateWalletDialogProps {
  open: boolean
  onClose(): void
}

const CreateWalletDialog: React.FC<CreateWalletDialogProps> = ({ open, onClose }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const [stage, setStage] = React.useState<Stage>('start')

  const content = React.useMemo(() => {
    switch (stage) {
      case 'start':
        return {
          title: t('create wallet title'),
          content: (
            <Start
              onCreateWalletClick={() => setStage('create wallet')}
              onImportWalletClick={() => setStage('import wallets')}
            />
          ),
        }
      case 'import wallets':
        return {
          title: '',
          content: <></>,
        }
      case 'import mnemonic':
        return {
          title: '',
          content: <></>,
        }
      case 'create wallet':
        return {
          title: t('create new wallet title'),
          content: <CreateWallet />,
        }
      case 'confirm mnemonic':
        return {
          title: '',
          content: <></>,
        }
      default:
        return {
          title: '',
          content: <></>,
        }
    }
  }, [stage, t])

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <IconButton className={classes.closeButton} onClick={onClose}>
        <ClossIcon {...iconProps} />
      </IconButton>
      <DialogTitle>{content.title}</DialogTitle>
      {content.content}
    </Dialog>
  )
}

export default CreateWalletDialog
