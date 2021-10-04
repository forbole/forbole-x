import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(
  (theme) => ({
    smallAvatar: {
      width: theme.spacing(3.5),
      height: theme.spacing(3.5),
    },
    largeAvatar: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    wrapText: {
      maxWidth: theme.spacing(18),
      textOverflow: 'ellipsis',
      whiteSpace: 'unset',
      overflow: 'hidden',
      [theme.breakpoints.down('sm')]: {
        maxWidth: theme.spacing(6),
      },
    },
  }),
  {
    name: 'HookGlobalStyles',
    index: 2,
  }
)

export default useStyles
