import { makeStyles } from '@material-ui/core/styles'
import { CustomTheme } from '../../misc/theme'

export const useStyles = makeStyles(
  (theme: CustomTheme) => ({
    button: {
      flex: 1,
      marginTop: theme.spacing(2),
    },
    secondaryButton: {
      flex: 1,
      marginTop: theme.spacing(2),
      border: `1px solid ${theme.palette.grey[400]}`,
    },
    dialogContent: {
      overflowY: 'initial',
    },
    stageContent: {
      maxWidth: theme.spacing(58),
      padding: theme.spacing(2),
    },
    stepsCard: {
      borderRadius: theme.spacing(1),
      marginTop: theme.spacing(2),
    },
    step: {
      padding: theme.spacing(2),
    },
    title: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(5),
    },
    mainCard: {
      minHeight: `calc(100vh - ${theme.spacing(18)}px)`,
    },
    searchBarStyle: {
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: theme.palette.action.selected,
          borderRadius: theme.spacing(0.5, 0, 0, 0.5),
        },
        '&.Mui-focused fieldset': {
          borderColor: theme.palette.text.primary,
          borderWidth: '2px',
        },
      },
    },
    claimableAmount: {
      margin: `${theme.spacing(7.6)}px 0 ${theme.spacing(20.3)}px 0`,
    },
    airdropMessage: {
      margin: `${theme.spacing(2)}px 0 ${theme.spacing(10)}px 0`,
    },
  }),
  {
    name: 'HookGlobalStyles',
    index: 2,
  }
)

export default useStyles
