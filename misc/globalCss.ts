import { withStyles } from '@material-ui/core'
import { CustomTheme } from './theme'

const GlobalCss = withStyles(
  (theme: CustomTheme) => ({
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
      '.MuiDialog-paper': {
        backgroundColor: theme.palette.dialogBackground,
      },
      '.MuiDialogTitle-root': {
        marginTop: theme.spacing(3),
        textAlign: 'center',
      },
      '.MuiDialogTitle-root .MuiTypography-h6': {
        ...theme.typography.h4,
      },
      '.MuiDialogContentText-root': {
        textAlign: 'center',
        whiteSpace: 'pre-wrap',
        marginBottom: theme.spacing(5),
      },
      '.MuiFilledInput-root': {
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.grey[50],
      },
      '.MuiFilledInput-root.Mui-error': {
        border: `1px solid ${theme.palette.error.main}`,
      },
      '.MuiFilledInput-root.Mui-focused': {
        backgroundColor: theme.palette.grey[50],
      },
      '.MuiFilledInput-root:hover': {
        backgroundColor: theme.palette.grey[50],
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
      '.MuiAutocomplete-popper': {
        boxShadow: theme.shadows[7],
      },
      '.MuiButton-root.MuiButton-containedPrimary': {
        '&:disabled': {
          backgroundColor: theme.palette.buttonDisabled,
          color: 'white',
        },
      },
      'a:-webkit-any-link': {
        '&:hover': {
          color: 'initial',
        },
      },
    },
  }),
  {
    name: 'GlobalStyles',
    index: 2,
  }
)(() => null)

export default GlobalCss
