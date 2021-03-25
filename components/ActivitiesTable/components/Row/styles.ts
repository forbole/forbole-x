import { makeStyles, createStyles } from '@material-ui/core/styles'

export const useGetStyles = (tag: string) => {
  const useStyles = makeStyles((theme) =>
    createStyles({
      rowContainer: {
        display: 'flex',
        alignItems: 'center',
      },
      tagContainer: {
        width: theme.spacing(24),
      },
      tag: {
        background: tag ? theme.palette.tagColor[tag] : theme.palette.grey[100],
        width: 'fit-content',
        borderRadius: theme.spacing(0.5),
        padding: theme.spacing(0.6, 1.75),
        color: 'white',
      },
      accountAvatar: {
        width: theme.spacing(3.5),
        height: theme.spacing(3.5),
        marginRight: theme.spacing(1),
      },
      validatorAvatar: {
        width: theme.spacing(3.5),
        height: theme.spacing(3.5),
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
      },
      validatorTypography: {
        marginRight: theme.spacing(1),
      },
      amount: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        fontWeight: 600,
      },
      receiverTypography: {
        marginLeft: theme.spacing(1),
      },
      proposalTypography: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
      },
      detail: {
        marginTop: theme.spacing(3),
      },
    })
  )

  return {
    classes: useStyles(),
  }
}
