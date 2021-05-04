import { DialogTitle } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { useWalletsContext } from '../../contexts/WalletsContext'
import ForgotPassword from './ForgotPassword'
import UnlockPassword from './UnlockPassword'
import Reset from './Reset'
import useStateHistory from '../../misc/useStateHistory'

enum UnlockPasswordContentStage {
  UnlockPasswordStage = 'unlock',
  ForgotPasswordStage = 'forgot',
  ResetStage = 'reset',
}

interface Content {
  title: string
  content: React.ReactNode
  dialogWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

interface UnlockPasswordContentProps {
  onConfirm(): void
}

const UnlockPasswordContent: React.FC<UnlockPasswordContentProps> = ({ onConfirm }) => {
  const { t } = useTranslation('common')
  const { wallets, reset } = useWalletsContext()
  const [isReset, setReset] = React.useState(false)
  const [stage, setStage] = useStateHistory<UnlockPasswordContentStage>(
    UnlockPasswordContentStage.UnlockPasswordStage
  )

  const forgotPassword = React.useCallback(() => {
    setStage(UnlockPasswordContentStage.ForgotPasswordStage)
  }, [setStage])

  const resetAll = React.useCallback(() => {
    setStage(UnlockPasswordContentStage.ResetStage)
  }, [setStage])

  const cancel = React.useCallback(() => {
    setStage(UnlockPasswordContentStage.UnlockPasswordStage)
  }, [setStage])

  const resetApp = React.useCallback(async () => {
    await reset()
    setReset(true)
  }, [reset, wallets])

  const { unlockWallets } = useWalletsContext()
  const [error, setError] = React.useState('')
  const [password, setPassword] = React.useState('')

  const onButtonClick = React.useCallback(async () => {
    try {
      setError('')
      await unlockWallets(password)
      onConfirm()
    } catch (err) {
      setError(t(err.message))
      setPassword('')
    }
  }, [password, setError, setPassword])

  const content: Content = React.useMemo(() => {
    switch (stage) {
      case UnlockPasswordContentStage.ResetStage:
        return {
          content: <Reset onCancel={cancel} onResetApp={resetApp} />,
          title: t('reset'),
        }
      case UnlockPasswordContentStage.ForgotPasswordStage:
        return {
          content: <ForgotPassword onReset={resetAll} />,
          title: t('forgot password'),
        }
      case UnlockPasswordContentStage.UnlockPasswordStage:
      default:
        return {
          content: (
            <UnlockPassword
              onForgot={forgotPassword}
              onUnlock={onButtonClick}
              password={password}
              setPassword={setPassword}
            />
          ),
          title: t('unlock password title'),
        }
    }
  }, [stage, t])

  return (
    <>
      {content.title ? <DialogTitle>{content.title}</DialogTitle> : null}
      {content.content}
    </>
  )
}

export default UnlockPasswordContent
