import React from 'react';
import { Box, Typography, Breadcrumbs, Link as MLink } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/Layout';

const SettingArticle: React.FC = () => {
  const { t } = useTranslation('common');

  const router = useRouter();
  const aboutTitle = String(router.query.article).replace(/-/g, ' ');

  return (
    <Layout
      passwordRequired
      HeaderLeftComponent={
        <Breadcrumbs>
          <Link href="/settings" passHref>
            <MLink color="textPrimary">{t('settings')}</MLink>
          </Link>
          <Typography color="textPrimary">{t(`${aboutTitle}`)}</Typography>
        </Breadcrumbs>
      }
    >
      <Box display="flex" alignItems="center" mb={4}>
        <Typography variant="h1">{t(`${aboutTitle}`)}</Typography>
      </Box>
      <Typography>{t(`${aboutTitle} detail`)}</Typography>
    </Layout>
  );
};

export default SettingArticle;
