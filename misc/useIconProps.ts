import { useTheme } from '@material-ui/core';

const useIconProps = (size?: number, color?: string) => {
  const theme = useTheme();
  return {
    width: theme.spacing(size || 2),
    height: theme.spacing(size || 2),
    fill: color || theme.palette.grey[300],
  };
};

export default useIconProps;
