import { makeStyles } from '@material-ui/core/styles'
import { CustomTheme } from '../../misc/theme'

const useStyles = makeStyles(
  (theme: CustomTheme) => ({
    button: {
      width: theme.spacing(16),
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
    iconButton: {
      borderColor: theme.palette.iconBorder,
      color: theme.palette.iconBorder,
      minWidth: 0,
      marginLeft: theme.spacing(2),
      width: theme.spacing(8),
      height: theme.spacing(3),
      padding: 0,
      [theme.breakpoints.down('sm')]: {
        marginLeft: 0,
      },
    },
    saveButton: {
      borderColor: theme.palette.iconBorder,
      flex: 1,
      height: theme.spacing(5),
      margin: theme.spacing(1, 2),
      padding: 0,
      [theme.breakpoints.down('sm')]: {
        marginLeft: 0,
      },
    },
    nextButton: {
      borderColor: theme.palette.iconBorder,
      flex: 1,
      height: theme.spacing(5),
      margin: theme.spacing(3, 2),
      padding: 0,
      [theme.breakpoints.down('sm')]: {
        marginLeft: 0,
      },
      '&:disabled': {
        backgroundColor: theme.palette.buttonDisabled,
        color: 'white',
      },
    },
    dialogButton: {
      flex: 1,
      margin: theme.spacing(4, 2),
      color: 'white',
    },
    divider: {
      background: theme.palette.divider,
    },
    actionButton: {
      flex: 1,
      margin: theme.spacing(1, 2),
      color: 'white',
    },
    helpOutLine: {
      width: theme.spacing(2),
      height: theme.spacing(2),
      marginLeft: theme.spacing(0.6),
    },
    socialMediaButton: {
      width: theme.spacing(5),
      height: theme.spacing(7),
      background: 'white',
    },
  }),
  {
    name: 'HookGlobalStyles',
    index: 2,
  }
)

export default useStyles
