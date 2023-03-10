import { Box, Button, DialogActions, DialogContent, Typography } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import SuccessLight from '../../assets/images/tx_success_light.svg';
import SuccessDark from '../../assets/images/tx_success_dark.svg';
import useStyles from './styles';
import { useGeneralContext } from '../../contexts/GeneralContext';

interface SuccessProps {
  onClose(): void;
  content: string;
  hideButton?: boolean;
}

const Success: React.FC<SuccessProps> = ({ onClose, content, hideButton }) => {
  const { t } = useTranslation('common');
  const classes = useStyles();
  const { theme } = useGeneralContext();

  return (
    <>
      <DialogContent className={classes.dialogContent}>
        <Box display="flex" alignItems="center" flexDirection="column">
          <Box my={2}>{theme === 'dark' ? <SuccessDark /> : <SuccessLight />}</Box>
          <Typography variant="h4" gutterBottom>
            {t('success')}
          </Typography>
          <Typography>{t(content)}</Typography>
        </Box>
      </DialogContent>

      {hideButton ? null : (
        <DialogActions>
          <Box display="flex" justifyContent="center" flex={1} my={2}>
            <Button
              variant="contained"
              className={classes.button}
              color="primary"
              onClick={onClose}
            >
              {t('close')}
            </Button>
          </Box>
        </DialogActions>
      )}
    </>
  );
};

export default Success;
