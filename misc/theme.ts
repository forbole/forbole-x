import { ThemeOptions } from '@material-ui/core'

const common = {
  typography: {
    fontFamily: '"Hind Madurai", sans-serif',
    h1: {
      fontSize: '2.25rem',
      letterSpacing: -1.5,
    },
    h2: {
      fontFamily: '"Aurulent Sans Mono", sans-serif',
      fontSize: '1.875rem',
      letterSpacing: -0.5,
    },
    h3: {
      fontFamily: '"Aurulent Sans Mono", sans-serif',
      fontSize: '1.75rem',
      letterSpacing: 0,
    },
    h4: {
      fontSize: '1.5rem',
      letterSpacing: 0.25,
    },
    h5: {
      fontFamily: '"Aurulent Sans Mono", sans-serif',
      fontSize: '1.25rem',
      letterSpacing: 0,
    },
    h6: {
      fontSize: '1.125rem',
      letterSpacing: 0.15,
    },
    subtitle1: {
      fontSize: '1rem',
      letterSpacing: 0.15,
    },
    subtitle2: {
      fontFamily: '"Hind Madurai Medium", sans-serif',
      fontSize: '0.875rem',
      letterSpacing: 0.1,
    },
    body1: {
      fontSize: '1rem',
      whiteSpace: 'pre-wrap',
    },
    body2: {
      fontSize: '0.875rem',
    },
    overline: {
      fontFamily: '"Hind Madurai Medium", sans-serif',
      fontSize: '0.875rem',
      letterSpacing: 1.25,
    },
    caption: {
      fontSize: '0.75rem',
      letterSpacing: 0.4,
    },
    button: {
      fontSize: '1rem',
      letterSpacing: 0,
      textTransform: 'none',
    },
  },
  shadows: [...Array(7).fill('none'), ...Array(18).fill('0px 3px 16px #00000029')],
}

const lightTheme = {
  ...common,
  palette: {
    primary: {
      main: '#FD565F',
    },
    secondary: {
      main: '#5C7BFF',
    },
    info: {
      main: '#1D86FF',
    },
    success: {
      main: '#1EC490',
    },
    warning: {
      main: '#E0A111',
      light: '#FCD32A',
    },
    error: {
      main: '#FD565F',
    },
    text: {
      primary: '#000000',
      secondary: '#646464',
    },
    background: {
      default: '#F2F2F2',
      paper: '#FFFFFF',
    },
    grey: {
      50: '#F7F7F7',
      100: '#F2F2F2',
      200: '#DDDDDD',
      300: '#8B8B8B', // icon
    },
    action: {
      hover: '#F7F7F7',
      selected: '#F7F7F7',
      table: '#F7F7F7',
    },
  },
} as ThemeOptions

const darkTheme = {
  ...common,
  palette: {
    primary: {
      main: '#FD565F',
    },
    secondary: {
      main: '#5C7BFF',
    },
    info: {
      main: '#1D86FF',
    },
    success: {
      main: '#1EC490',
    },
    warning: {
      main: '#E0A111',
    },
    error: {
      main: '#FD565F',
    },
    text: {
      primary: '#E6E6E6',
      secondary: '#9D9D9D',
    },
    background: {
      default: '#1D1E22',
      paper: '#25282D',
    },
    grey: {
      50: '#272A2F',
      100: '#34383E',
      200: '#3D4047',
      300: '#AFAFAF', // icon
    },
    action: {
      hover: '#1D1E22',
      selected: '#1D1E22',
      table: '#2B2F35',
    },
  },
} as ThemeOptions

export { lightTheme, darkTheme }
