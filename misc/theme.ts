import { ThemeOptions, Theme } from '@material-ui/core'
import { Palette } from '@material-ui/core/styles/createPalette'

interface CustomPalette extends Palette {
  tagColor: { [key: string]: string }
  statusColor: { [key: string]: string }
  translucent: string
  indicator: string
  pieChart: string[]
  pieChart2: string[]
  button: string
  menuBackground: string
  socialMediaIcon: { background: string; fill: string }
  iconBorder: string
  divider: string
  dataChangeButton: {
    clicked: {
      text: string
      background: string
      border: string
    }
    unClicked: {
      text: string
      background: string
      border: string
    }
  }
  condition: {
    zero: string
    one: string
    two: string
    three: string
  }
  dialogBackground: string
  reactJsonBackground: string
  buttonDisabled: string
  validator: string
  cardBackground: string
  bannerBackground: string
}

export interface CustomTheme extends Theme {
  palette: CustomPalette
}

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
      fontSize: '1.375rem',
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
    type: 'light',
    primary: {
      main: '#007FFF',
    },
    secondary: {
      main: '#ECB140',
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
      disabled: '#646464',
    },
    background: {
      default: '#F2F2F2',
      paper: '#FFFFFF',
    },
    grey: {
      50: '#F7F7F7',
      100: '#F2F2F2',
      200: '#DDDDDD',
      300: '#8B8B8B',
      400: '#777777',
    },
    action: {
      hover: '#F7F7F7',
      selected: '#F7F7F7',
    },
    tagColor: {
      delegate: '#1EC490',
      redelegate: '#FF961B',
      undelegate: '#FC6A8A',
      deposit: '#FF7549',
      withdrawReward: '#243059',
      multisend: '#9F46EC',
      createValidator: '#1EC490',
      fund: '#497BFF',
      verifyInvariant: '#2FA8CE',
      vote: '#FF7549',
      unjail: '#EB3AA4',
      submitProposal: '#FF7549',
      editValidator: '#1EC490',
      send: '#9F46EC',
      setRewardAddress: '#497BFF',
    },
    statusColor: {
      active: '#1EC490',
      unbonded: '#FD565F',
      unknown: '#E0A111',
    },
    translucent: 'rgba(255, 255, 255, 0.5)',
    indicator: '#5C7BFF',
    validator: '#007FFF',
    divider: '#E4E4E4',
    pieChart: ['#007FFF', '#6ED588', '#2DCBE0', '#74CDFF', '#DEC053', '#F4B65A'],
    pieChart2: ['#007FFF', '#6ED588', '#F4B65A', '#DB39F5', '#FF7448'],
    button: '#007FFF',
    menuBackground: '#F7F7F7',
    socialMediaIcon: {
      background: '#999999',
      fill: '#FFFFFF',
    },
    iconBorder: '#9D9D9D',
    dataChangeButton: {
      clicked: {
        text: '#007FFF',
        background: 'rgba(119, 186, 253, 0.5)',
        border: '#6DB0FE',
      },
      unClicked: {
        text: '#646464',
        border: '#646464',
      },
    },
    condition: {
      zero: '#E8E8E8',
      one: '#1EC490',
      two: '#FF961B',
      three: '#FC6A8A',
    },
    dialogBackground: '#FFFFFF',
    reactJsonBackground: '#F7F7F7',
    buttonDisabled: '#BFDFFF',
    cardBackground: '#F7F7F7',
    bannerBackground: '#1A2A3D',
  },
} as unknown as ThemeOptions

const darkTheme = {
  ...common,
  palette: {
    type: 'dark',
    primary: {
      main: '#007FFF',
    },
    secondary: {
      main: '#ECB140',
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
      disabled: '#9D9D9D',
    },
    background: {
      default: '#1D1E22',
      paper: '#25282D',
    },
    grey: {
      50: '#272A2F',
      100: '#34383E',
      200: '#3D4047',
      300: '#AFAFAF',
      400: '#777777',
    },
    action: {
      hover: '#1D1E22',
      selected: '#1D1E22',
    },
    tagColor: {
      delegate: '#1EC490',
      redelegate: '#FF961B',
      undelegate: '#FC6A8A',
      deposit: '#FF7549',
      withdrawReward: '#3961FE',
      multisend: '#9F46EC',
      createValidator: '#1EC490',
      fund: '#497BFF',
      verifyInvariant: '#2FA8CE',
      vote: '#FF7549',
      unjail: '#EB3AA4',
      submitProposal: '#FF7549',
      editValidator: '#1EC490',
      send: '#9F46EC',
      setRewardAddress: '#497BFF',
    },
    statusColor: {
      active: '#1EC490',
      unbonded: '#FD565F',
      unknown: '#E0A111',
    },
    translucent: 'rgba(0, 0, 0, 0.5)',
    indicator: '#E6E6E6',
    validator: '#379AFE',
    divider: '#34383E',
    pieChart: ['#007FFF', '#6ED588', '#2DCBE0', '#74CDFF', '#DEC053', '#F4B65A'],
    pieChart2: ['#007FFF', '#6ED588', '#F4B65A', '#DB39F5', '#FF7448'],
    button: '#FFFFFF',
    menuBackground: '#282f35',
    socialMediaIcon: {
      background: '#999999',
      fill: '#25282D',
    },
    iconBorder: '#9D9D9D',
    dataChangeButton: {
      clicked: {
        text: '#E6E6E6',
        background: '#3D4047',
        border: '#9D9D9D',
      },
    },
    dialogBackground: '#1D1E22',
    reactJsonBackground: '#25282D',
    buttonDisabled: '#273746',
    condition: {
      zero: '#E8E8E8',
      one: '#1EC490',
      two: '#FF961B',
      three: '#FC6A8A',
    },
    cardBackground: '#3D4047',
    bannerBackground: '#1A2A3D',
  },
} as unknown as ThemeOptions

export { lightTheme, darkTheme }
