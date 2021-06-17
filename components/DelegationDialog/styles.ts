import { makeStyles } from '@material-ui/core/styles'
import { CustomTheme } from '../../misc/theme'

const useStyles = makeStyles(
  (theme: CustomTheme) => ({
    button: {
      width: theme.spacing(16),
      '&:disabled': {
        backgroundColor: theme.palette.buttonDisabled,
        color: 'white',
      },
    },
    card: {
      marginTop: theme.spacing(1),
      padding: theme.spacing(1, 2),
      boxShadow: `${theme.spacing(0, 1, 5, -1.5)} rgb(0 0 0 / 30%)`,
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
    dialogContent: {
      overflowY: 'auto',
    },
    dialog: {
      background: theme.palette.dialogBackground,
    },
    marginLeft: {
      marginLeft: theme.spacing(1),
    },
    marginBottom: {
      marginBottom: theme.spacing(2),
    },
    validatorAvatar: {
      width: theme.spacing(3.5),
      height: theme.spacing(3.5),
      marginRight: theme.spacing(1),
    },
    percentageTextField: {
      width: theme.spacing(16),
      marginLeft: theme.spacing(2),
    },
    numberInput: {
      paddingRight: 0,
      marginRight: theme.spacing(-1),
    },
    fullWidthButton: {
      flex: 1,
      margin: theme.spacing(2, 1),
    },
  }),
  {
    name: 'HookGlobalStyles',
    index: 2,
  }
)

export default useStyles
