import { makeStyles } from '@material-ui/core/styles'
import { CustomTheme } from '../../misc/theme'

const useStyles = makeStyles(
  (theme: CustomTheme) => ({
    itemButton: {
      flex: '1',
      justifyContent: 'flex-start',
    },
    addAccountButton: {
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.background.paper,
      flex: 1,
      display: 'flex',
      padding: theme.spacing(2, 2.5),
    },
    dialogButton: {
      flex: 1,
      margin: theme.spacing(4, 2),
      color: 'white',
    },
    copyButton: {
      flex: 1,
      margin: theme.spacing(-1, 2),
      color: 'white',
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
    socialMediaButton: {
      width: theme.spacing(5),
      height: theme.spacing(7),
      background: 'white',
    },
    passwordRequirement: {
      marginTop: theme.spacing(1),
    },
    stageDescription: {
      marginBottom: theme.spacing(4),
    },
    smallAvatar: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    cryptoMenuItemAvatar: {
      minWidth: theme.spacing(4),
    },
    icon: {
      color: theme.palette.grey[300],
    },
    networkText: {
      marginLeft: theme.spacing(1),
    },
    table: {

    },
    tableLabel: {

    },
    tableCell: {
      borderBottom: 'none',
    },
    tableRow: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    checkbox: {
      padding: 0,
      marginLeft: theme.spacing(-1.5),
    },
  }),
  {
    name: 'HookGlobalStyles',
    index: 2,
  }
)

export default useStyles
