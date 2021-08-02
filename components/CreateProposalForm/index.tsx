import React from 'react'
import { Dialog } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import useStateHistory from '../../misc/useStateHistory'
import CreateProposalContent from './CreateProposalContent'
import ConfirmProposalContent from './ConfirmProposalContent'
import SecurityPassword from '../SecurityPasswordDialogContent'

enum CreateProposalStage {
  Create = 'select amount',
  Confirm = 'select validators',
}

export interface Proposal {
  proposalAccount: Account
  network: { name: string; id: string }
  type: { name: string; id: string }
  title: string
  description: string
  memo?: string
}

interface CreateProposalFormProps {
  account: Account
}

interface Content {
  title: string
  content: React.ReactNode
}

const CreateProposalForm: React.FC<CreateProposalFormProps> = ({ account }) => {
  const { t } = useTranslation('common')
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [proposal, setProposal] = React.useState<Proposal>()
  const [stage, setStage] = useStateHistory<CreateProposalStage>(CreateProposalStage.Create)

  const createDraft = React.useCallback(
    (
      proposalAccount: Account,
      network: { name: string; id: string },
      type: { name: string; id: string },
      title: string,
      description: string,
      memo?: string
    ) => {
      setProposal({ proposalAccount, network, type, title, description, memo })
      setStage(CreateProposalStage.Confirm)
    },
    [setStage]
  )

  const enterPassword = () => {
    setOpen(true)
  }

  const transactionData = {}

  const confirmWithPassword = React.useCallback(
    async (securityPassword: string) => {
      try {
        setLoading(true)
        // handle upload to backend later
        setLoading(false)
      } catch (err) {
        setLoading(false)
        console.log(err)
      }
    },
    [transactionData]
  )

  const content: Content = React.useMemo(() => {
    switch (stage) {
      case CreateProposalStage.Confirm:
        return {
          title: 'proposal/create proposal/confirm proposal',
          content: (
            <ConfirmProposalContent
              account={account}
              proposal={proposal}
              onConfirm={enterPassword}
            />
          ),
        }
      case CreateProposalStage.Create:
      default:
        return {
          title: 'proposal/create proposal',
          content: <CreateProposalContent account={account} onNext={createDraft} />,
        }
    }
  }, [stage, t])

  return (
    <>
      {content.content}
      <Dialog fullWidth maxWidth="sm" open={open}>
        <SecurityPassword
          walletId={account.walletId}
          onConfirm={confirmWithPassword}
          loading={loading}
        />
      </Dialog>
    </>
  )
}

export default CreateProposalForm
