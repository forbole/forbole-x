import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(
  (theme) => ({
    leftMenuContainer: {
      width: theme.spacing(32),
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      overflow: 'auto',
    },
    menu: {
      margin: theme.spacing(2, 2.5),
    },
    menuItem: {
      height: theme.spacing(6),
      marginBottom: theme.spacing(3),
      borderRadius: theme.spacing(1),
    },
    navBar: {
      position: 'fixed',
      top: 0,
      right: 0,
      left: 0,
      height: theme.spacing(11),
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      padding: theme.spacing(5),
    },
    navBarButton: {
      marginLeft: theme.spacing(2),
    },
    main: {
      padding: theme.spacing(3),
      paddingTop: 0,
      marginLeft: theme.spacing(32),
      marginTop: theme.spacing(11),
      display: 'flex',
      flexDirection: 'column',
    },
  }),
  { name: 'HookGlobalStyles', index: 2 }
)

export default useStyles
