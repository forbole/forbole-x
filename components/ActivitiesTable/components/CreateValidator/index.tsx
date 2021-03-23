import { Box, Avatar, Typography } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import useStyles from './styles'
import { Activity, Account } from '../../index'

interface ActivitiesTableProps {
  activity: Activity
  account: Account
}

const CreateValidator: React.FC<ActivitiesTableProps> = ({ activity, account }) => {
  const classes = useStyles()
  const { t } = useTranslation('common')

  return (
    <div className={classes.info__footer}>
      <div className={classes.footer__container}>
        <p className={classes.footer__type}>{t(activity.tag)}</p>
      </div>
      <Box display="flex" alignItems="center">
        <Avatar className={classes.validatorAvatar} alt={account.name} src={account.imageURL} />
        <Typography className={classes.validatorTypography}>{account.name}</Typography>
        {t(`${activity.tag}Activity`)}
        <Avatar
          className={classes.validatorAvatar}
          alt={activity?.detail?.name}
          src={activity?.detail?.image}
        />
        <Typography className={classes.validatorTypography}>{activity?.detail?.name}</Typography>
      </Box>
    </div>
  )
}

export default CreateValidator
