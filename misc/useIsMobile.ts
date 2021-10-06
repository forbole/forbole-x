import { useMediaQuery, useTheme } from '@material-ui/core'

const useIsMobile = (): boolean => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true })
  return isMobile
}

export default useIsMobile
