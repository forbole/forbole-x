import { DialogTitle } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { useWalletsContext } from '../../contexts/WalletsContext'
import ForgotPassword from './ForgotPassword'
import SecurityPassword from './SecurityPassword'
import Reset from './Reset'
import useStateHistory from '../../misc/useStateHistory'

enum SecurityPasswordDialogContentStage {
  UnlockPasswordStage = 'unlock',
  ForgotPasswordStage = 'forgot',
  ResetStage = 'reset',
}

interface Content {
  title: string
  content: React.ReactNode
  dialogWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

interface SecurityPasswordDialogContentProps {
  onConfirm(password: string): void
  loading: boolean
  walletId: string
}

const SecurityPasswordDialogContent: React.FC<SecurityPasswordDialogContentProps> = ({
  onConfirm,
  loading,
  walletId,
}) => {
  const { t } = useTranslation('common')
  const { reset } = useWalletsContext()
  const [stage, setStage] = useStateHistory<SecurityPasswordDialogContentStage>(
    SecurityPasswordDialogContentStage.UnlockPasswordStage
  )

  const forgotPassword = React.useCallback(() => {
    setStage(SecurityPasswordDialogContentStage.ForgotPasswordStage)
  }, [setStage])

  const resetAll = React.useCallback(() => {
    setStage(SecurityPasswordDialogContentStage.ResetStage)
  }, [setStage])

  const cancel = React.useCallback(() => {
    setStage(SecurityPasswordDialogContentStage.UnlockPasswordStage)
  }, [setStage])
  const [error, setError] = React.useState('')
  const [password, setPassword] = React.useState('')

  const onButtonClick = React.useCallback(async () => {
    try {
      setError('')
      onConfirm(password)
    } catch (err) {
      setError(t(err.message))
      setPassword('')
    }
  }, [password, setError, setPassword])

  const content: Content = React.useMemo(() => {
    switch (stage) {
      case SecurityPasswordDialogContentStage.ResetStage:
        return {
          content: <Reset onCancel={cancel} onResetApp={reset} />,
          title: t('reset'),
        }
      case SecurityPasswordDialogContentStage.ForgotPasswordStage:
        return {
          content: <ForgotPassword onReset={resetAll} />,
          title: t('forgot password'),
        }
      case SecurityPasswordDialogContentStage.UnlockPasswordStage:
      default:
        return {
          content: (
            <SecurityPassword
              onForgot={forgotPassword}
              onUnlock={onButtonClick}
              password={password}
              setPassword={setPassword}
              loading={loading}
              walletId={walletId}
            />
          ),
          title: t('security password title'),
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

export default SecurityPasswordDialogContent
