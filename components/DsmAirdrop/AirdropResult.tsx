import { Box, Button, Typography } from '@material-ui/core';
import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import useStyles from './styles';
import AirdropSuccess from '../../assets/images/airdrop_success.svg';
import AirdropFailed from '../../assets/images/airdrop_failed.svg';

interface AirdropResultProps {
  success: boolean;
  onCompleted: () => void;
  airdropResponse: string;
}

const AirdropResult: React.FC<AirdropResultProps> = ({ success, onCompleted, airdropResponse }) => {
  const classes = useStyles();
  const { t } = useTranslation('common');

  return (
    <Box display="flex" justifyContent="center">
      <Box
        className={classes.stageContent}
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box width="100%" display="flex" justifyContent="center" mt={1.5}>
          {success ? <AirdropSuccess /> : <AirdropFailed />}
        </Box>
        <Typography variant="h4">
          {t(`airdrop result title ${success ? 'success' : 'failed'}`)}
        </Typography>
        <Typography className={classes.airdropMessage}>{airdropResponse}</Typography>
        <Button
          className={classes.button}
          color="primary"
          variant="contained"
          fullWidth
          onClick={() => {
            onCompleted();
          }}
        >
          {t(`airdrop result button ${success ? 'success' : 'failed'}`)}
        </Button>
      </Box>
    </Box>
  );
};

export default AirdropResult;
