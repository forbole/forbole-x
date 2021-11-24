import { makeStyles } from '@material-ui/core/styles'
import { CustomTheme } from '../../misc/theme'

const useStyles = makeStyles(
  (theme: CustomTheme) => ({
    searchBarStyle: {
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          // borderRadius: "20px",
          borderColor: 'rgba(237, 108, 83, 1)',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'rgba(237, 108, 83, 1)',
          borderWidth: '2px',
        },
      },
    },
  }),
  {
    name: 'HookGlobalStyles',
    index: 2,
  }
)

export default useStyles
