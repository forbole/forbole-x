import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(
  (theme) => ({
    sendButton: {
      width: theme.spacing(13),
      marginLeft: theme.spacing(2),
      backgroundColor: theme.palette.warning.main,
      '&:hover': {
        backgroundColor: theme.palette.warning.dark,
      },
    },
    fixedWidthButton: {
      width: theme.spacing(13),
      marginLeft: theme.spacing(2),
    },
    iconButton: {
      minWidth: 0,
      marginLeft: theme.spacing(2),
      width: theme.spacing(4),
      padding: 0,
    },
  }),
  {
    name: 'HookGlobalStyles',
    index: 2,
  }
)

export default useStyles