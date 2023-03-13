import { makeStyles, createStyles } from '@material-ui/core/styles';
import { CustomTheme } from '../../misc/theme';

const useStyles = makeStyles(
  (theme: CustomTheme) =>
    createStyles({
      root: {
        width: theme.spacing(1),
        height: theme.spacing(1),
        background: theme.palette.condition.zero,
        margin: '0',
        borderRadius: '50%',
        '&.green': {
          background: theme.palette.condition.one,
        },
        '&.yellow': {
          background: theme.palette.condition.two,
        },
        '&.red': {
          background: theme.palette.condition.three,
        },
      },
    }),
  {
    name: 'HookGlobalStyles',
    index: 2,
  },
);

export default useStyles;
