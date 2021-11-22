import { makeStyles } from '@material-ui/core/styles'
import { CustomTheme } from '../../misc/theme'

export const useStyles = makeStyles(
  (theme: CustomTheme) => ({
    button: {
      flex: 1,
      marginTop: theme.spacing(2),
    },
    dialogContent: {
      overflowY: 'initial',
    },
    stageContent: {
      maxWidth: 464,
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
    },
    mainCard: {
      minHeight: `calc(100vh - ${
        document.getElementById('navBar').offsetHeight
      }px  - ${theme.spacing(3)}px - 32px)`,
    },
  }),
  {
    name: 'HookGlobalStyles',
    index: 2,
  }
)

export default useStyles
