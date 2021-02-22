import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(
  (theme) => ({
    iconButton: {
      marginLeft: theme.spacing(1),
    },
    menuItem: {
      padding: theme.spacing(1, 3),
      borderBottom: `1px solid ${theme.palette.grey[100]}`,
    },
    dialogButton: {
      flex: 1,
      margin: theme.spacing(4, 2),
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
  }),
  {
    name: 'HookGlobalStyles',
    index: 2,
  }
)

export default useStyles
