import { Box, Card, Typography } from '@material-ui/core'
import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import useStateHistory from '../../misc/useStateHistory'
import { useStyles } from './styles'
import CheckClaimable from './CheckClaimable'

interface Content {
  title: string
  content: React.ReactNode
}

export enum CommonStage {
  StartStage = 'start',
  CheckClaimableStage = 'dsm airdrop is claimable',
}

type Stage = CommonStage

const DsmAirdrop: React.FC = () => {
  const classes = useStyles()
  const { t } = useTranslation('common')

  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory<Stage>(
    CommonStage.StartStage
  )

  const content: Content = React.useMemo(() => {
    switch (stage) {
      case CommonStage.CheckClaimableStage:
        return {
          title: t('dsm airdrop is claimable'),
          content: <CheckClaimable onConfirm={() => setStage(CommonStage.CheckClaimableStage)} />,
        }
      case CommonStage.StartStage:
      default:
        return {
          title: t('create wallet title'),
          content: <CheckClaimable onConfirm={() => setStage(CommonStage.CheckClaimableStage)} />,
        }
    }
  }, [stage, t])

  return (
    <Card>
      <Box className={classes.mainCard}>
        {content.title ? (
          <Typography variant="h4" align="center" className={classes.title}>
            {content.title}
          </Typography>
        ) : null}
        {content.content}
      </Box>
    </Card>
  )
}

export default DsmAirdrop
