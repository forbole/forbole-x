import React from 'react'
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
  Breadcrumbs,
  Link as MLink,
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import groupBy from 'lodash/groupBy'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import ProposalTable from '../components/ProposalTable'
import { useWalletsContext } from '../contexts/WalletsContext'
import AccountAvatar from '../components/AccountAvatar'
import DropDownIcon from '../assets/images/icons/icon_arrow_down_input_box.svg'
import useIconProps from '../misc/useIconProps'
import CreateProposal from '../components/CreateProposal'

const Proposals: React.FC = () => {
  const { t } = useTranslation('common')
  const iconProps = useIconProps()
  const { accounts, wallets } = useWalletsContext()
  const accountsMap = React.useMemo(
    () =>
      groupBy(
        accounts.map((a, index) => ({ ...a, index })),
        'walletId'
      ),
    [accounts]
  )
  const [accountMenuAnchor, setAccountMenuAnchor] = React.useState<Element>()
  const [activeAccountIndex, setActiveAccountIndex] = React.useState(0)
  const activeAccount = accounts[activeAccountIndex]
  const router = useRouter()

  return (
    // <Layout
    //   passwordRequired
    //   activeItem="/proposals"
    //   HeaderLeftComponent={
    //     <Breadcrumbs>
    //       <MLink color="textPrimary">{t('proposal/create proposal')}</MLink>
    //     </Breadcrumbs>
    //   }
    // >
    <CreateProposal accounts={accounts} />
    // </Layout>
  )
}

export default Proposals
