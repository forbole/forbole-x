import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(
  (theme) => ({
    container: {
      marginBottom: theme.spacing(4),
    },
    sendButton: {
      color: 'white',
      width: theme.spacing(18),
      marginLeft: theme.spacing(2),
      backgroundColor: theme.palette.success.main,
      '&:hover': {
        backgroundColor: theme.palette.success.dark,
      },
    },
    fixedWidthButton: {
      color: 'white',
      width: theme.spacing(18),
      marginLeft: theme.spacing(2),
    },
    iconButton: {
      minWidth: 0,
      marginLeft: theme.spacing(2),
      width: theme.spacing(6),
      height: theme.spacing(5),
      padding: 0,
      [theme.breakpoints.down('sm')]: {
        marginLeft: 0,
      },
    },
  }),
  {
    name: 'HookGlobalStyles',
    index: 2,
  }
)

export default useStyles
