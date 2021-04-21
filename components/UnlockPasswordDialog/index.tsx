import { Dialog, DialogTitle, IconButton } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import useStyles from './styles'
import CloseIcon from '../../assets/images/icons/icon_cross.svg'
import BackIcon from '../../assets/images/icons/icon_back.svg'
import { useWalletsContext } from '../../contexts/WalletsContext'
import ForgotPassword from './ForgotPassword'
import UnlockPassword from './UnlockPassword'
import Reset from './Reset'
import useIconProps from '../../misc/useIconProps'
import useStateHistory from '../../misc/useStateHistory'

enum UnlockPasswordStage {
  UnlockPasswordStage = 'unlock',
  ForgotPasswordStage = 'forgot',
  ResetStage = 'reset',
}


interface Content {
  // title: string
  content: React.ReactNode
  dialogWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const UnlockPasswordDialog: React.FC = () => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const [password, setPassword] = React.useState('')
  const { unlockWallets, wallets } = useWalletsContext()
  const [error, setError] = React.useState('')

  // const onButtonClick = React.useCallback(async () => {
  //   try {
  //     setError('')
  //     await unlockWallets(password)
  //   } catch (err) {
  //     setError(t(err.message))
  //     setPassword('')
  //   }
  // }, [password, setError, setPassword])

  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory<UnlockPasswordStage>(
    UnlockPasswordStage.UnlockPasswordStage
  )

  const content: Content = React.useMemo(() => {
    switch (stage) {
      case UnlockPasswordStage.ResetStage:
        return {
          content: <Reset />,
        }
      case UnlockPasswordStage.ForgotPasswordStage:
        return {
          content: <ForgotPassword />,
        }
      case UnlockPasswordStage.UnlockPasswordStage:
      default:
        return {
          content: <UnlockPassword />,
        }
    }
  }, [stage, t])

  return (
    <Dialog fullWidth open={!wallets.length}>
      {isPrevStageAvailable ? (
        <IconButton className={classes.backButton} onClick={toPrevStage}>
          <BackIcon {...iconProps} />
        </IconButton>
      ) : null}
      <IconButton className={classes.closeButton} >
        <CloseIcon {...iconProps} />
      </IconButton>
      {/* {content.title ? <DialogTitle>{content.title}</DialogTitle> : null} */}
      {content.content}
    </Dialog>
  )
}

export default UnlockPasswordDialog
