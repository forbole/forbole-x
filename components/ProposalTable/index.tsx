import React from 'react'
import { Box, Card, Typography, Avatar, Divider } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { useGetStyles } from './styles'
import Active from './Active'
import InActive from './InActive'

interface Proposal {
  no: string
  proposer: {
    name: string
    image: string
    address: string
  }
  title: string
  content: string
  votingTime: string
  duration?: string
  isActive: boolean
  tag: string
}

interface ProposalsTableProps {
  proposals: Proposal[]
}

const ProposalTable: React.FC<ProposalsTableProps> = ({ proposals }) => {
  const { classes } = useGetStyles()
  const { t } = useTranslation('common')

  const router = useRouter()
  const onClick = () => {
    // link to vote / deposit page
  }

  return (
    <Card>
      {proposals.map((x) => {
        return (
          <Box
            className={classes.box}
            onClick={() => {
              router.push(`/proposal/${x.no}`)
            }}
          >
            <Box p={4} display="flex" justifyContent="flex-end">
              <Box>
                <Typography variant="h6">{`#${x.no}`}</Typography>
              </Box>

              <Box pl={3} flex={1}>
                <Box display="flex" mb={2}>
                  <Typography variant="h6">{t('proposer')}</Typography>
                  <Avatar
                    className={classes.validatorAvatar}
                    alt={x.proposer.name}
                    src={x.proposer.image}
                  />
                  <Typography variant="h6" className={classes.ellipsisText}>
                    {x.proposer.name}
                  </Typography>
                </Box>
                <Typography variant="h6">{x.title}</Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {x.content}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {x.votingTime}
                  <span className={classes.duration}>{x.duration}</span>
                </Typography>
              </Box>

              <Box display="flex-end">
                {x.isActive ? (
                  <Active status={x.tag} onClick={onClick} />
                ) : (
                  <InActive status={x.tag} />
                )}
              </Box>
            </Box>
            <Divider className={classes.divider} />
          </Box>
        )
      })}
    </Card>
  )
}

export default ProposalTable
