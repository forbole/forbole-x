import React from 'react';
import {
  Box,
  Tabs,
  Tab,
  Divider,
  Avatar,
  Typography,
  useTheme,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Paper,
} from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import useStyles from './styles';
import { useGeneralContext } from '../../contexts/GeneralContext';
import MoreIcon from '../../assets/images/icons/icon_more.svg';
import useIconProps from '../../misc/useIconProps';
import EditAddressDialog from './EditAddressDialog';
import DeleteAddressDialog from './DeleteAddressDialog';
import AddAddressDialog from '../AddAddressDialog';
import cryptocurrencies from '../../misc/cryptocurrencies';

export type FavAddress = {
  address: string;
  crypto: string;
  moniker: string;
  note?: string;
  img?: string;
};

const AddressBook: React.FC = () => {
  const { favAddresses } = useGeneralContext();
  const classes = useStyles();
  const { t } = useTranslation('common');
  const iconProps = useIconProps();
  const [currentTab, setCurrentTab] = React.useState(0);
  const theme = useTheme();
  const [anchor, setAnchor] = React.useState<Element>();
  const router = useRouter();
  const [editAddressOpen, setEditAddressOpen] = React.useState(false);
  const [deleteAddressOpen, setDeleteAddressOpen] = React.useState(false);
  const [addAddressOpen, setAddAddressOpen] = React.useState(false);

  const onClose = React.useCallback(() => setAnchor(undefined), [setAnchor]);
  const tabList = [{ label: 'All', address: favAddresses }];

  const cryptocurrenciesType = Object.keys(cryptocurrencies);
  const tabs = React.useMemo(() => {
    cryptocurrenciesType.forEach(x => {
      tabList.push({ label: x, address: favAddresses.filter(v => v.crypto === x) });
    });
    return tabList;
  }, [favAddresses, cryptocurrencies]);

  const [currentAddress, setCurrentAddress] = React.useState<FavAddress>({
    address: '',
    crypto: '',
    moniker: '',
  });

  return (
    <>
      <Tabs
        value={currentTab}
        classes={{ indicator: classes.tabIndicator, root: classes.tab }}
        onChange={(e, v) => setCurrentTab(v)}>
        {tabs.map(tab => (
          <Tab key={tab.label} label={`${tab.label} (${tab.address.length})`} />
        ))}
      </Tabs>
      <Box pt={3} />
      <Paper>
        {tabs[currentTab].address.map((a, i) => (
          <React.Fragment key={a.address}>
            <Box
              display="flex"
              alignItems="flex-start"
              justifyContent="space-between"
              className={classes.row}
              px={2}>
              <Box
                display="flex"
                onClick={() => {
                  router.push(`/address-book/${a.address}`);
                }}
                flex={1}
                my={3}>
                <Avatar src={a.img ? a.img : cryptocurrencies[a.crypto]?.image} alt={a.address} />
                <Box ml={2}>
                  <Typography>{a.moniker}</Typography>
                  <Box display="flex">
                    <Typography variant="body2">{a.crypto}:</Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      style={{ marginLeft: theme.spacing(1) }}>
                      {a.address}
                    </Typography>
                  </Box>
                  {a.note ? (
                    <Box display="flex">
                      <Typography variant="body2">{t('note')}:</Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        style={{ marginLeft: theme.spacing(1) }}>
                        {a.note}
                      </Typography>
                    </Box>
                  ) : null}
                </Box>
              </Box>
              <IconButton
                onClick={e => {
                  setCurrentAddress(a);
                  setAnchor(e.currentTarget);
                }}
                style={{ marginTop: theme.spacing(2) }}>
                <MoreIcon {...iconProps} />
              </IconButton>
            </Box>
            {i < tabs[currentTab].address.length - 1 ? <Divider /> : null}
          </React.Fragment>
        ))}
      </Paper>
      <Menu
        anchorEl={anchor}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        keepMounted
        open={!!anchor}
        onClose={onClose}>
        <MenuItem
          className={classes.menuItem}
          button
          onClick={() => {
            setEditAddressOpen(true);
            onClose();
          }}>
          {t('edit address')}
        </MenuItem>
        <Divider style={{ margin: theme.spacing(1) }} />
        <MenuItem
          className={classes.menuItem}
          button
          onClick={() => {
            setDeleteAddressOpen(true);
            onClose();
          }}>
          {t('delete address')}
        </MenuItem>
      </Menu>
      <EditAddressDialog
        open={editAddressOpen}
        onClose={() => setEditAddressOpen(false)}
        currentAddress={currentAddress}
      />
      <DeleteAddressDialog
        open={deleteAddressOpen}
        onClose={() => setDeleteAddressOpen(false)}
        accountAddress={currentAddress.address}
      />
      <AddAddressDialog open={addAddressOpen} onClose={() => setAddAddressOpen(false)} />
      {tabs[currentTab].address.length === 0 ? (
        <Box
          display="flex"
          height="60vh"
          flexDirection="column"
          justifyContent="center"
          alignItems="center">
          <Typography gutterBottom>{t('you have not added any address')}</Typography>
          <Button color="primary" variant="contained" onClick={() => setAddAddressOpen(true)}>
            {t('add address')}
          </Button>
        </Box>
      ) : null}
    </>
  );
};

export default AddressBook;
