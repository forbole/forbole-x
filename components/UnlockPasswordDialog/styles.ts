import { makeStyles } from '@material-ui/core/styles'
import { CustomTheme } from '../../misc/theme'

const useStyles = makeStyles(
  (theme: CustomTheme) => ({
    passwordRequirement: {
      marginTop: theme.spacing(1),
    },
    button: {
      margin: theme.spacing(1, 3),
      marginTop: theme.spacing(20),
      '&:disabled': {
        backgroundColor: theme.palette.buttonDisabled,
        color: 'white',
      },
    },
    dialog: {
      background: theme.palette.dialogBackground,
    },
    resetButton: {
      flex: 1,
      margin: theme.spacing(4, 2),
      marginTop: theme.spacing(6),
      color: 'white',
    },
    forgotButton: {
      marginBottom: theme.spacing(2),
      color: theme.palette.primary.main,
      width: 'fit-content',
      alignSelf: 'center',
    },
    action: {
      display: 'contents',
    },
    closeButton: {
      position: 'absolute',
      top: theme.spacing(2),
      right: theme.spacing(2),
    },
    backButton: {
      position: 'absolute',
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
  }),
  {
    name: 'HookGlobalStyles',
    index: 2,
  }
)

export default useStyles
