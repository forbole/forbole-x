import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(
  () => ({
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
