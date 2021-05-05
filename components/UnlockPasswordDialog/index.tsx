import { Dialog, DialogTitle, IconButton } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import useStyles from './styles'
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
  title: string
  content: React.ReactNode
  dialogWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const UnlockPasswordDialog: React.FC = () => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const iconProps = useIconProps()
  const { wallets, reset } = useWalletsContext()
  const [isReset, setReset] = React.useState(false)
  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory<UnlockPasswordStage>(
    UnlockPasswordStage.UnlockPasswordStage
  )

  const forgotPassword = React.useCallback(() => {
    setStage(UnlockPasswordStage.ForgotPasswordStage)
  }, [setStage])

  const resetAll = React.useCallback(() => {
    setStage(UnlockPasswordStage.ResetStage)
  }, [setStage])

  const cancel = React.useCallback(() => {
    setStage(UnlockPasswordStage.UnlockPasswordStage)
  }, [setStage])

  const resetApp = React.useCallback(async () => {
    await reset()
    setReset(true)
  }, [reset, wallets])

  const content: Content = React.useMemo(() => {
    switch (stage) {
      case UnlockPasswordStage.ResetStage:
        return {
          content: <Reset onCancel={cancel} onResetApp={resetApp} />,
          title: t('reset'),
        }
      case UnlockPasswordStage.ForgotPasswordStage:
        return {
          content: <ForgotPassword onReset={resetAll} />,
          title: t('forgot password'),
        }
      case UnlockPasswordStage.UnlockPasswordStage:
      default:
        return {
          content: <UnlockPassword onForgot={forgotPassword} />,
          title: t('unlock password title'),
        }
    }
  }, [stage, t])

  return (
    <Dialog fullWidth open={!(wallets.length !== 0 || isReset)}>
      {isPrevStageAvailable && stage !== 'unlock' ? (
        <IconButton className={classes.backButton} onClick={toPrevStage}>
          <BackIcon {...iconProps} />
        </IconButton>
      ) : null}
      {content.title ? <DialogTitle>{content.title}</DialogTitle> : null}
      {content.content}
    </Dialog>
  )
}

export default UnlockPasswordDialog
