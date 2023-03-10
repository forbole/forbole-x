import { makeStyles } from '@material-ui/core/styles';
import { CustomTheme } from '../../misc/theme';

const useStyles = makeStyles(
  (theme: CustomTheme) => ({
    title: {
      fontSize: theme.spacing(3),
      marginTop: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      top: theme.spacing(2),
      right: theme.spacing(2),
    },
    dialogContent: {
      overflowY: 'auto',
    },
    fullWidthButton: {
      flex: 1,
      margin: theme.spacing(2, 1),
    },
    coverImg: {
      width: '100%',
      height: theme.spacing(12),
      objectFit: 'cover',
    },
    avatar: {
      width: theme.spacing(9),
      height: theme.spacing(9),
      borderWidth: theme.spacing(0.25),
      borderColor: theme.palette.background.default,
      borderStyle: 'solid',
    },
    imgOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    coverCameraIconContainer: {
      position: 'absolute',
      right: theme.spacing(2),
      bottom: theme.spacing(2),
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: theme.palette.background.default,
      padding: theme.spacing(0.5),
    },
    avatarCameraIconContainer: {
      position: 'absolute',
      right: theme.spacing(-0.5),
      bottom: theme.spacing(-0.5),
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: theme.palette.background.default,
      padding: theme.spacing(0.5),
    },
  }),
  {
    name: 'HookGlobalStyles',
    index: 2,
  },
);

export default useStyles;
