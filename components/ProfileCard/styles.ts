import { makeStyles } from '@material-ui/core/styles';
import { CustomTheme } from '../../misc/theme';

const useStyles = makeStyles(
  (theme: CustomTheme) => ({
    container: {
      marginBottom: theme.spacing(2),
    },
    content: {
      padding: theme.spacing(3),
      marginTop: theme.spacing(-10.5),
      [theme.breakpoints.down('md')]: {
        marginTop: theme.spacing(-9),
      },
    },
    coverImage: {
      height: theme.spacing(27.5),
      [theme.breakpoints.down('md')]: {
        height: theme.spacing(15),
      },
    },
    avatar: {
      width: theme.spacing(15),
      height: theme.spacing(15),
      marginBottom: theme.spacing(2),
      [theme.breakpoints.down('md')]: {
        width: theme.spacing(12),
        height: theme.spacing(12),
      },
    },
    button: {
      borderColor: theme.palette.iconBorder,
    },
  }),
  {
    name: 'HookGlobalStyles',
    index: 2,
  },
);

export default useStyles;
