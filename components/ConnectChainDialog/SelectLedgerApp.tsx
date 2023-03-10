import {
  Button,
  DialogActions,
  DialogContent,
  Divider,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemAvatar,
  ListItemText,
  Checkbox,
  Avatar,
} from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import connectableChains from '../../misc/connectableChains';
import useStyles from './styles';

interface SelectLedgerAppProps {
  ledgerAppNames: string[];
  onConfirm(app: string): void;
}

const SelectLedgerApp: React.FC<SelectLedgerAppProps> = ({ ledgerAppNames, onConfirm }) => {
  const { t } = useTranslation('common');
  const classes = useStyles();

  const [selectedApp, setSelectedApp] = React.useState('');

  return (
    <form
      noValidate
      onSubmit={e => {
        e.preventDefault();
        onConfirm(selectedApp);
      }}>
      <DialogContent className={classes.dialogContent}>
        <Typography gutterBottom>{t('select ledger app description')}</Typography>
        <List className={classes.list}>
          {ledgerAppNames.map((c, i) => (
            <React.Fragment key={c}>
              {i === 0 ? null : <Divider />}
              <ListItem button onClick={() => setSelectedApp(c)}>
                <ListItemIcon>
                  <Checkbox color="primary" checked={selectedApp === c} />
                </ListItemIcon>
                <ListItemAvatar>
                  <Avatar src={connectableChains[c].image} />
                </ListItemAvatar>
                <ListItemText primary={connectableChains[c].ledgerAppDisplayName} />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Box flex={1} display="flex" flexDirection="column" mb={3}>
          <Button
            className={classes.button}
            disabled={!selectedApp}
            color="primary"
            variant="contained"
            type="submit">
            {t('next')}
          </Button>
        </Box>
      </DialogActions>
    </form>
  );
};

export default SelectLedgerApp;
