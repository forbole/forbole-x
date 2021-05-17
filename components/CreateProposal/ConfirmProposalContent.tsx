import React from 'react'
import {
  Box,
  Card,
  Button,
  DialogActions,
  DialogContent,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Divider,
  Grid,
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import keyBy from 'lodash/keyBy'
import useIconProps from '../../misc/useIconProps'
import { useGetStyles } from './styles'
import Active from './Active'
import InActive from './InActive'
import DropDownIcon from '../../assets/images/icons/icon_arrow_down_input_box.svg'
import { Proposal } from './index'

// interface Proposal {
//   no: string
//   proposer: {
//     name: string
//     image: string
//     address: string
//   }
//   title: string
//   content: string
//   votingTime: string
//   duration?: string
//   isActive: boolean
//   tag: string
// }

interface ConfirmProposalContentProps {
  proposal: Proposal
  accounts: Account[]
  onConfirm: () => void
}

const ConfirmProposalContent: React.FC<ConfirmProposalContentProps> = ({
  accounts,
  proposal,
  onConfirm,
}) => {
  const { classes } = useGetStyles()
  const { t } = useTranslation('common')

  const iconProps = useIconProps()
  const networks = [
    {
      name: 'Cosmoshub - ATOM',
      id: '01',
    },
    {
      name: 'Desmoshub - DSM',
      id: '02',
    },
  ]

  const types = [
    {
      name: 'Text Proposal',
      id: '01',
    },
    {
      name: 'Other Proposal',
      id: '02',
    },
  ]

  const testAccount = [
    ...accounts,
    {
      walletId: '1111',
      address: 'desmos111111',
      createdAt: 111111,
      crypto: 'DSM',
      fav: false,
      index: 0,
      name: 'DSM',
      displayName: '',
      id: '',
      rpDisplayName: '',
    },
  ]

  const [network, setNetwork] = React.useState<{ name: string; id: string }>()

  const [type, setType] = React.useState<{ name: string; id: string }>()

  const [proposalAccount, setProposalAccount] = React.useState<Account>(testAccount[0])

  const accountsMap = keyBy(testAccount, 'address')

  const networksMap = keyBy(networks, 'id')

  const typesMap = keyBy(types, 'id')

  const [description, setDescription] = React.useState('')

  const [title, setTitle] = React.useState('')

  return (
    <Card>
      <Box m={3}>
        <Box display="flex" alignItems="center" mt={4} mb={4}>
          <Typography variant="h1" className={classes.confirmTitle}>
            {t('confirm proposal')}
          </Typography>
        </Box>
        <Divider />
        <Box pt={1.5} pb={1.5}>
          <Typography>{t('address')}</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {proposal.proposalAccount.address}
          </Typography>
        </Box>
        <Divider />
        <Box pt={1.5} pb={1.5}>
          <Typography>{t('network')}</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {proposal.network.name}
          </Typography>
        </Box>
        <Divider />
        <Box pt={1.5} pb={1.5}>
          <Typography>{t('type')}</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {proposal.type.name}
          </Typography>
        </Box>
        <Divider />
        <Box pt={1.5} pb={1.5}>
          <Typography>{t('title')}</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {proposal.title}
          </Typography>
        </Box>
        <Divider />
        <Box pt={1.5} pb={1.5}>
          <Typography>{t('description')}</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {proposal.description}
          </Typography>
        </Box>
        <Divider />
        <Box pt={1.5} pb={1.5}>
          <Typography>{t('memo')}</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {proposal.memo ? proposal.memo : 'N/A'}
          </Typography>
        </Box>
        <Divider />
        <Box pt={1.5} pb={1.5}>
          <Typography>{t('fee')}</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {proposal.memo ? proposal.memo : 'N/A'}
          </Typography>
        </Box>
        <Divider />
        <Box display="flex" justifyContent="flex-end" pt={12}>
          <Button
            variant="contained"
            className={classes.button}
            color="primary"
            onClick={() => onConfirm()}
            // onClick={() =>
            //   onConfirm(
            //     delegations
            //       .filter((v) => v.validator.name && Number(v.amount))
            //       .map((v) => ({
            //         validator: v.validator,
            //         amount: Number(v.amount),
            //       })),
            //     memo
            //   )
            // }
          >
            {t('next')}
          </Button>
        </Box>
      </Box>
    </Card>
  )
}

export default ConfirmProposalContent
