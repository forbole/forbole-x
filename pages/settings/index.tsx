import React from 'react';
import { Box, Typography } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import Layout from '../../components/Layout';
import SettingTable from '../../components/SettingTable';
import useIsChromeExt from '../../misc/useIsChromeExt';

const Setting: React.FC = () => {
  const { t } = useTranslation('common');
  const { isChromeExt } = useIsChromeExt();

  return (
    <Layout
      ChromeExtTitleComponent={
        <Box mt={1}>
          <Typography variant="h4">{t('settings')}</Typography>
        </Box>
      }>
      {isChromeExt ? null : (
        <Box display="flex" alignItems="center" mb={2}>
          <Typography variant="h1">{t('settings')}</Typography>
        </Box>
      )}
      <SettingTable />
    </Layout>
  );
};

export default Setting;
