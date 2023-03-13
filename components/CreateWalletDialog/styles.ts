import { makeStyles } from '@material-ui/core/styles';
import { CustomTheme } from '../../misc/theme';

const useStyles = makeStyles(
  (theme: CustomTheme) => ({
    button: {
      flex: 1,
      margin: theme.spacing(2),
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
    selectionBox: {
      border: `1px solid ${theme.palette.grey[200]}`,
      borderRadius: theme.shape.borderRadius,
      height: theme.spacing(32),
      padding: theme.spacing(2, 4),
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      justifyContent: 'center',
      '&:hover': {
        border: `1px solid ${theme.palette.grey[300]}`,
      },
    },
    borderedButton: {
      border: `1px solid ${theme.palette.grey[200]}`,
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(2, 3),
      margin: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      textAlign: 'left',
      alignSelf: 'stretch',
      '&:hover': {
        border: `1px solid ${theme.palette.grey[300]}`,
      },
      width: `calc(100% - ${theme.spacing(3)}px)`,
    },
    cryptoButton: {
      border: `1px solid ${theme.palette.grey[200]}`,
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(1, 2),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '100%',
      '&:hover': {
        border: `1px solid ${theme.palette.grey[300]}`,
      },
    },
    menuItem: {
      padding: theme.spacing(1),
      width: theme.spacing(20),
    },
    timeRangeButton: {
      borderColor: theme.palette.iconBorder,
      margin: theme.spacing(0, 1),
      padding: theme.spacing(0.5, 1.5),
      width: theme.spacing(20),
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
    dialogContent: {
      overflowY: 'initial',
    },
  }),
  {
    name: 'HookGlobalStyles',
    index: 2,
  },
);

export default useStyles;
