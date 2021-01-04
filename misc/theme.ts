const common = {
  typography: {
    fontFamily: '"SF Pro Text", sans-serif',
    h1: {
      fontSize: '1.75rem',
      lineHeight: 2,
    },
    h2: {
      fontSize: '1.25rem',
      lineHeight: 2,
    },
    h3: {
      fontSize: '1.125rem',
      lineHeight: 1,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1,
    },
  },
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
      main: '#E3953A',
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
      '300': '#8B8B8B', // icon
    },
    action: {
      hover: '#F7F7F7',
      selected: '#F7F7F7',
    },
  },
}

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
      main: '#E3953A',
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
      '300': '#AFAFAF', // icon
    },
    action: {
      hover: '#1D1E22',
      selected: '#1D1E22',
    },
  },
}

export { lightTheme, darkTheme }
