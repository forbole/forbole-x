import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(
  (theme) => ({
    passwordRequirement: {
      marginTop: theme.spacing(1),
    },
    button: {
      flex: 1,
      margin: theme.spacing(1, 2),
      marginTop: theme.spacing(20),
    },
    forgotButtom: {
      marginBottom: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
    action: {
      display: 'contents',
    },
    closeButton: {
      position: 'absolute',
      top: theme.spacing(2),
      right: theme.spacing(2),
    },
  }),
  {
    name: 'HookGlobalStyles',
    index: 2,
  }
)

export default useStyles
