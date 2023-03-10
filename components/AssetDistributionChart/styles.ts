import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(
  theme => ({
    container: {
      padding: theme.spacing(2),
    },
    timeRangeButton: {
      margin: theme.spacing(0, 1),
    },
    divider: {
      position: 'absolute',
      right: 0,
      borderTop: `1px solid ${theme.palette.grey[200]}`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      height: 0,
    },
    percentText: {
      marginTop: theme.spacing(-5.5),
      marginBottom: theme.spacing(2),
    },
    noAsset: {
      marginTop: theme.spacing(6),
    },
    avatar: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      marginRight: theme.spacing(1),
    },
  }),
  {
    name: 'HookGlobalStyles',
    index: 2,
  },
);

export default useStyles;
