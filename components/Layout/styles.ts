import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(
  (theme) => ({
    leftMenuContainer: {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      overflow: 'hidden',
      overflowX: 'hidden',
      zIndex: 2,
      transition: 'width 0.2s ease-in-out',
    },
    navbarLeftComponentContainer: {
      transition: 'margin-left 0.2s ease-in-out',
    },
    menu: {
      margin: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    menuItems: {
      height: '60%',
      overflowY: 'auto',
      overflowX: 'hidden',
    },
    menuItem: {
      height: theme.spacing(6),
      paddingLeft: theme.spacing(1.5),
      paddingRight: theme.spacing(1.5),
      marginBottom: theme.spacing(3),
      borderRadius: theme.spacing(1),
      whiteSpace: 'nowrap',
    },
    favMenu: {
      height: '40%',
      overflowY: 'auto',
      overflowX: 'hidden',
      marginBottom: theme.spacing(4),
    },
    starredAccounts: {
      transition: 'display 0.2s ease-in-out',
      height: theme.spacing(6),
      marginBottom: theme.spacing(3),
      borderRadius: theme.spacing(1),
      padding: theme.spacing(2),
      paddingBottom: 0,
      whiteSpace: 'nowrap',
    },
    manageAccounts: {
      transition: 'display 0.2s ease-in-out',
      height: theme.spacing(6),
      marginBottom: theme.spacing(3),
      borderRadius: theme.spacing(1),
      padding: theme.spacing(2),
      paddingTop: 0,
      overflowWrap: 'break-word',
      wordWrap: 'break-word',
      hyphens: 'auto',
    },
    starButton: {
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(2),
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      width: 'fit-content',
    },
    favMenuItem: {
      height: theme.spacing(8),
      borderRadius: theme.spacing(1),
      whiteSpace: 'nowrap',
      paddingLeft: theme.spacing(1.5),
      paddingRight: theme.spacing(1.5),
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
      padding: theme.spacing(3),
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
    mobileSignoutButton: {
      margin: theme.spacing(3),
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
  }),
  {
    name: 'HookGlobalStyles',
    index: 2,
  }
)

export default useStyles
