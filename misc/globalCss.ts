import { withStyles } from '@material-ui/core'

const GlobalCss = withStyles((theme) => ({
  '@global': {
    '.MuiDialogTitle-root': {
      marginTop: theme.spacing(3),
      textAlign: 'center',
    },
    '.MuiDialogTitle-root .MuiTypography-h6': {
      ...theme.typography.h4,
    },
    '.MuiDialogContentText-root': {
      textAlign: 'center',
      whiteSpace: 'pre',
      marginBottom: theme.spacing(5),
    },
    '.MuiFilledInput-root': {
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.grey[50],
    },
    '.MuiFilledInput-root.Mui-focused': {
      backgroundColor: theme.palette.grey[100],
    },
    '.MuiFilledInput-root:hover': {
      backgroundColor: theme.palette.grey[100],
    },
    '.MuiFilledInput-input': {
      padding: theme.spacing(1.5),
    },
  },
}))(() => null)

export default GlobalCss
