import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(
  (theme) => ({
    leftMenuContainer: {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      overflow: 'auto',
      overflowX: 'hidden',
      zIndex: 2,
      transition: 'width 0.2s ease-in-out',
    },
    navbarLeftComponentContainer: {
      transition: 'margin-left 0.2s ease-in-out',
    },
    menu: {
      margin: theme.spacing(2, 2.5),
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    menuItem: {
      height: theme.spacing(6),
      marginBottom: theme.spacing(3),
      borderRadius: theme.spacing(1),
      whiteSpace: 'nowrap',
    },
    favMenu: {
      marginTop: 'auto',
      overflow: 'scroll',
      height: '40%',
    },
    favMenuItem: {
      height: theme.spacing(6),
      borderRadius: theme.spacing(1),
      whiteSpace: 'nowrap',
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
      backgroundColor: theme.palette.background.default,
      zIndex: 1,
    },
    navBarButton: {
      marginLeft: theme.spacing(2),
    },
    main: {
      padding: theme.spacing(3),
      paddingTop: 0,
      marginTop: theme.spacing(11),
      display: 'flex',
      flexDirection: 'column',
      transition: 'margin-left 0.2s ease-in-out',
    },
  }),
  {
    name: 'HookGlobalStyles',
    index: 2,
  }
)

export default useStyles
