import { makeStyles } from '@material-ui/core/styles';
import { CustomTheme } from '../../misc/theme';

const useStyles = makeStyles(
  (theme: CustomTheme) => ({
    addAccountButton: {
      backgroundColor: theme.palette.grey[50],
      flex: 1,
      display: 'flex',
      padding: theme.spacing(2, 2.5),
      '&:hover': {
        backgroundColor: theme.palette.grey[100],
      },
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
    smallAvatar: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    networkText: {
      marginLeft: theme.spacing(1),
    },
    tableCell: {
      borderBottom: 'none',
    },
    tableRow: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    checkbox: {
      padding: 0,
      marginLeft: theme.spacing(-1.5),
      '&.MuiCheckbox-colorPrimary.Mui-disabled': {
        color: theme.palette.grey[400],
      },
    },
  }),
  {
    name: 'HookGlobalStyles',
    index: 2,
  },
);

export default useStyles;
