import { Divider, Box, Typography, useTheme, Grid, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import useStyles from './styles';
import useIconProps from '../../misc/useIconProps';
import DropDownIcon from '../../assets/images/icons/icon_arrow_down_input_box.svg';

const HelpTable: React.FC = () => {
  const { t } = useTranslation('common');
  const classes = useStyles();
  const themeStyle = useTheme();
  const iconProps = useIconProps();

  const helpContent = [
    {
      category: 'transfer and receive',

      display: true,
      title: 'how can i sent token?',
      detail: 'detail1',
    },
    {
      category: 'transfer and receive',
      display: false,
      title: 'how can i sent token?',
      detail:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an ',
    },
    {
      category: 'transfer and receive',
      display: false,
      title: 'how can i sent token?',
      detail:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an ',
    },
    {
      category: 'about staking',
      display: false,
      title: 'how can i sent token?',
      detail:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an ',
    },
    {
      category: 'about staking',
      display: false,
      title: 'how can i sent token?',
      detail:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an ',
    },
    {
      category: 'about staking',
      display: false,
      title: 'how can i sent token?',
      detail:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an ',
    },
    {
      category: 'wallet and security',

      display: true,
      title: 'how can i sent token?',
      detail: 'detail1',
    },
    {
      category: 'wallet and security',
      display: false,
      title: 'how can i sent token?',
      detail:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an ',
    },
    {
      category: 'wallet and security',
      display: false,
      title: 'how can i sent token?',
      detail:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an ',
    },
    {
      category: 'category 4',
      display: false,
      title: 'how can i sent token?',
      detail:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an ',
    },
    {
      category: 'category 4',
      display: false,
      title: 'how can i sent token?',
      detail:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an ',
    },
    {
      category: 'category 4',
      display: false,
      title: 'how can i sent token?',
      detail:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an ',
    },
  ];

  const categories = ['transfer and receive', 'about staking', 'wallet and security', 'category 4'];

  const [listedDetail, setListedDetail] = React.useState(helpContent);

  const onClick = (i: number) => {
    const updatedListDetail = listedDetail;
    updatedListDetail[i].display = !updatedListDetail[i].display;
    setListedDetail([...updatedListDetail]);
  };

  return (
    <>
      <Box className={classes.searchingBox} height={themeStyle.spacing(7)}>
        <Autocomplete
          options={helpContent}
          groupBy={option => option.category}
          getOptionLabel={option => option.title}
          openOnFocus
          fullWidth
          renderInput={({ InputProps, ...props }) => (
            <TextField
              {...props}
              variant="filled"
              label="Describe your issue"
              className={classes.textInput}
              InputProps={{
                ...InputProps,
                disableUnderline: true,
              }}
            />
          )}
        />
      </Box>
      <Typography color="textSecondary" variant="subtitle1">
        {t('contact us')}
        <a href="mailto:support@forbole.com" className={classes.mailTo}>
          support@forbole.com
        </a>
      </Typography>
      <Grid container spacing={8} className={classes.gridContainer}>
        <Grid item xs={6}>
          <Box my={2}>
            <Typography variant="h4">{t(categories[0])}</Typography>
          </Box>
          <Divider />
          {listedDetail.map((x, i) => {
            if (x.category === categories[0]) {
              return (
                <>
                  <Box my={2} onClick={() => onClick(i)}>
                    <Box mb={1} display="flex" alignItems="center" justifyContent="space-between">
                      <Typography gutterBottom>{t(x.title)}</Typography>
                      <DropDownIcon {...iconProps} className={classes.dropDownIcon} />
                    </Box>
                    {x.display ? <Typography>{t(x.detail)}</Typography> : null}
                  </Box>
                  <Divider />
                </>
              );
            }
            return null;
          })}
        </Grid>
        <Grid item xs={6}>
          <Box my={2}>
            <Typography variant="h4">{t(categories[1])}</Typography>
          </Box>
          <Divider />
          {listedDetail.map((x, i) => {
            if (x.category === categories[1]) {
              return (
                <>
                  <Box my={2} onClick={() => onClick(i)}>
                    <Box mb={1} display="flex" alignItems="center" justifyContent="space-between">
                      <Typography gutterBottom>{t(x.title)}</Typography>
                      <DropDownIcon {...iconProps} className={classes.dropDownIcon} />
                    </Box>
                    {x.display ? <Typography>{t(x.detail)}</Typography> : null}
                  </Box>
                  <Divider />
                </>
              );
            }
            return null;
          })}
        </Grid>
        <Grid item xs={6}>
          <Box my={2}>
            <Typography variant="h4">{t(categories[2])}</Typography>
          </Box>
          <Divider />
          {listedDetail.map((x, i) => {
            if (x.category === categories[2]) {
              return (
                <>
                  <Box my={2} onClick={() => onClick(i)}>
                    <Box mb={1} display="flex" alignItems="center" justifyContent="space-between">
                      <Typography gutterBottom>{t(x.title)}</Typography>
                      <DropDownIcon {...iconProps} className={classes.dropDownIcon} />
                    </Box>
                    {x.display ? <Typography>{t(x.detail)}</Typography> : null}
                  </Box>
                  <Divider />
                </>
              );
            }
            return null;
          })}
        </Grid>
        <Grid item xs={6}>
          <Box my={2}>
            <Typography variant="h4">{t(categories[3])}</Typography>
          </Box>
          <Divider />
          {listedDetail.map((x, i) => {
            if (x.category === categories[3]) {
              return (
                <>
                  <Box my={2} onClick={() => onClick(i)}>
                    <Box mb={1} display="flex" alignItems="center" justifyContent="space-between">
                      <Typography gutterBottom>{t(x.title)}</Typography>
                      <DropDownIcon {...iconProps} className={classes.dropDownIcon} />
                    </Box>
                    {x.display ? <Typography>{t(x.detail)}</Typography> : null}
                  </Box>
                  <Divider />
                </>
              );
            }
            return null;
          })}
        </Grid>
      </Grid>
    </>
  );
};

export default HelpTable;
