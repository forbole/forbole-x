import { makeStyles, createStyles } from '@material-ui/core/styles';
import { CustomTheme } from '../../misc/theme';

const useGetStyles = () => {
  const useStyles = makeStyles(
    (theme: CustomTheme) =>
      createStyles({
        itemButton: {
          width: theme.spacing(16),
        },
        button: {
          width: theme.spacing(16),
        },
        confirmTitle: {
          fontSize: theme.spacing(4),
        },
        input: {
          backgroundColor: theme.palette.background.paper,
        },
      }),
    {
      name: 'HookGlobalStyles',
      index: 2,
    },
  );
  return {
    classes: useStyles(),
  };
};

export default useGetStyles;
