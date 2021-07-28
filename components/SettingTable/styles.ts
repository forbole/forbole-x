import { makeStyles, createStyles } from '@material-ui/core/styles'
import { CustomTheme } from '../../misc/theme'

const useStyles = makeStyles(
  (theme: CustomTheme) =>
    createStyles({
      timeRangeButton: {
        borderColor: theme.palette.iconBorder,
        margin: theme.spacing(0, 1),
        padding: theme.spacing(0.5, 1.5),
        width: theme.spacing(20),
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
      },
      menuItem: {
        padding: theme.spacing(1),
        width: theme.spacing(20),
      },
      searchingBox: {
        width: '50%',
      },
      gridContainer: {
        marginTop: theme.spacing(5),
        width: '100%',
      },
      textInput: {
        height: '2rem',
      },
      mailTo: {
        color: theme.palette.primary.main,
      },
      dropDownIcon: {
        marginTop: '4px',
      },
      closeButton: {
        position: 'absolute',
        top: theme.spacing(2),
        right: theme.spacing(2),
      },
      tabIndicator: {
        backgroundColor: theme.palette.indicator,
        width: theme.spacing(1),
      },
      tab: {
        '& .Mui-selected': {
          color: theme.palette.indicator,
        },
      },
      switchRoot: {
        width: 42,
        height: 26,
        padding: 0,
        margin: theme.spacing(0, 1),
      },
      switchBase: {
        padding: 1,
        '&$checked': {
          transform: 'translateX(16px)',
          color: theme.palette.common.white,
          '& + $track': {
            backgroundColor: '#52d869',
            opacity: 1,
            border: 'none',
          },
        },
        '&$focusVisible $thumb': {
          color: '#52d869',
          border: '6px solid #fff',
        },
      },
      thumb: {
        width: 24,
        height: 24,
        color: theme.palette.common.white,
      },
      track: {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.grey[300],
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border']),
      },
      checked: {},
      focusVisible: {},
      dialogButton: {
        flex: 1,
        margin: theme.spacing(4, 2),
        color: 'white',
      },
<<<<<<< HEAD
      externalLink: {
        color: theme.palette.text.primary,
        textDecoration: 'none',
      },
      iconText: {
        marginLeft: theme.spacing(1),
=======
      button: {
        width: theme.spacing(16),
      },
      message: {
        marginTop: theme.spacing(2),
      },
      subject: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(6),
>>>>>>> cb92145e94b61aa184908ea5610b98d2cc7f3436
      },
    }),
  {
    name: 'HookGlobalStyles',
    index: 2,
  }
)

export default useStyles
