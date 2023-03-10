import { makeStyles } from '@material-ui/core/styles';
import { CustomTheme } from '../../misc/theme';

const useStyles = makeStyles(
  (theme: CustomTheme) => ({
    helperText: {
      '& .MuiFormHelperText-contained': {
        marginLeft: 0,
      },
    },
  }),
  {
    name: 'HookGlobalStyles',
    index: 2,
  },
);

export default useStyles;
