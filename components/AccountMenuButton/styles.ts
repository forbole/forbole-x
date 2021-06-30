import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(
  (theme) => ({
    menuItem: {
      padding: theme.spacing(1, 3),
      borderBottom: `1px solid ${theme.palette.grey[100]}`,
    },
    dialogButton: {
      flex: 1,
      margin: theme.spacing(4, 2),
      color: 'white',
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
    passwordRequirement: {
      marginTop: theme.spacing(1),
    },
    stageDescription: {
      marginBottom: theme.spacing(4),
    },
    smallAvatar: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    cryptoMenuItemAvatar: {
      minWidth: theme.spacing(4),
    },
  }),
  {
    name: 'HookGlobalStyles',
    index: 2,
  }
)

export default useStyles
