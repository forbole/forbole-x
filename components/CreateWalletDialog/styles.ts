import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(
  (theme) => ({
    button: {
      flex: 1,
      margin: theme.spacing(2),
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
    selectionBox: {
      border: `1px solid ${theme.palette.grey[200]}`,
      borderRadius: theme.shape.borderRadius,
      height: theme.spacing(38),
      padding: theme.spacing(2, 4),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      '&:hover': {
        border: `1px solid ${theme.palette.grey[300]}`,
      },
    },
    borderedButton: {
      border: `1px solid ${theme.palette.grey[200]}`,
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(2, 3),
      margin: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      textAlign: 'left',
      alignSelf: 'stretch',
      '&:hover': {
        border: `1px solid ${theme.palette.grey[300]}`,
      },
    },
    cryptoButton: {
      border: `1px solid ${theme.palette.grey[200]}`,
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(1, 2),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '100%',
      '&:hover': {
        border: `1px solid ${theme.palette.grey[300]}`,
      },
    },
    dialogContent: {
      overflowY: 'initial',
    },
  }),
  {
    name: 'HookGlobalStyles',
    index: 2,
  }
)

export default useStyles
