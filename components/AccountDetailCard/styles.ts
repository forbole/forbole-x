import { makeStyles } from '@material-ui/core/styles';
import { CustomTheme } from '../../misc/theme';

const useStyles = makeStyles(
  (theme: CustomTheme) => ({
    container: {
      marginBottom: theme.spacing(2),
    },
    accountCard: {
      position: 'sticky',
      top: theme.spacing(10),
      zIndex: 1,
      backgroundColor: theme.palette.background.paper,
      borderRadius: '4px 4px 0px 0px',
    },
    sendButton: {
      color: 'white',
      width: theme.spacing(18),
      marginLeft: theme.spacing(2),
      backgroundColor: theme.palette.success.main,
      '&:hover': {
        backgroundColor: theme.palette.success.dark,
      },
    },
    delegateButton: {
      color: 'white',
      width: theme.spacing(18),
      marginLeft: theme.spacing(2),
      padding: theme.spacing(0.5),
    },
    withdrawButton: {
      color: 'white',
      width: theme.spacing(22),
      marginLeft: theme.spacing(2),
      padding: theme.spacing(0.5),
    },
    profileButton: {
      width: theme.spacing(18),
      marginLeft: theme.spacing(2),
      padding: theme.spacing(0.5),
      borderColor: theme.palette.iconBorder,
    },
    iconButton: {
      borderColor: theme.palette.iconBorder,
      minWidth: 0,
      marginLeft: theme.spacing(2),
      width: theme.spacing(5),
      height: theme.spacing(5),
      padding: 0,
      [theme.breakpoints.down('sm')]: {
        marginLeft: 0,
      },
    },
    tabIndicator: {
      backgroundColor: theme.palette.indicator,
      width: theme.spacing(1),
    },
    tab: {
      '& .Mui-selected': {
        color: theme.palette.indicator,
      },
    },
  }),
  {
    name: 'HookGlobalStyles',
    index: 2,
  },
);

export default useStyles;
