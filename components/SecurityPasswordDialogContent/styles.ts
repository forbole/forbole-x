import { makeStyles } from '@material-ui/core/styles'
import { CustomTheme } from '../../misc/theme'

const useStyles = makeStyles(
  (theme: CustomTheme) => ({
    passwordRequirement: {
      marginTop: theme.spacing(1),
    },
    button: {
      margin: theme.spacing(1, 2),
      marginTop: theme.spacing(20),
    },
    resetButton: {
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
    form: {
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
