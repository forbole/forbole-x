import { withStyles } from '@material-ui/core'

const GlobalCss = withStyles(
  (theme) => ({
    '@global': {
      '@font-face': [
        {
          fontFamily: 'Aurulent Sans Mono',
          src: 'url("/fonts/AurulentSansMono-Regular.otf")',
        },
        {
          fontFamily: 'Hind Madurai',
          src: 'url("/fonts/HindMadurai-Regular.ttf")',
        },
        {
          fontFamily: 'Hind Madurai Medium',
          src: 'url("/fonts/HindMadurai-Medium.ttf")',
        },
      ],
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
      '.MuiFilledInput-multiline': {
        padding: 0,
      },
      '.MuiSelect-select': {
        display: 'flex',
        alignItems: 'center',
      },
    },
  }),
  {
    name: 'GlobalStyles',
    index: 2,
  }
)(() => null)

export default GlobalCss
