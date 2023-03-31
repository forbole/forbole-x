import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(
  () => ({
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
