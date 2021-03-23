import { Box, Typography } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import useStyles from './styles'
import { Activity } from '../../index'

interface ActivitiesTableProps {
  activity: Activity
}

const SetRewardAddress: React.FC<ActivitiesTableProps> = ({ activity }) => {
  const classes = useStyles()
  const { t } = useTranslation('common')

  return (
    <div className={classes.info__footer}>
      <div className={classes.footer__container}>
        <p className={classes.footer__type}>{t(activity.tag)}</p>
      </div>
      <Box display="flex" alignItems="center">
        <Typography className={classes.validatorTypography}>
          {activity.detail.srcAddress}
        </Typography>
        {t(`${activity.tag}Activity`)}
        <Typography className={classes.proposalTypography}>{activity.detail.dstAddress}</Typography>
      </Box>
    </div>
  )
}

export default SetRewardAddress
