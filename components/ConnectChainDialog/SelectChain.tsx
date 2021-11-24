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
} from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import connectableChains from '../../misc/connectableChains'
import useStyles from './styles'

interface SelectChainProps {
  onConfirm(chain: string): void
}

const SelectChain: React.FC<SelectChainProps> = ({ onConfirm }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()

  const [selectedChain, setSelectedChain] = React.useState('')

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        onConfirm(selectedChain)
      }}
    >
      <DialogContent className={classes.dialogContent}>
        <Typography gutterBottom>{t('select chain description')}</Typography>
        <List className={classes.list}>
          {Object.keys(connectableChains).map((c, i) => (
            <React.Fragment key={c}>
              {i === 0 ? null : <Divider />}
              <ListItem button onClick={() => setSelectedChain(c)}>
                <ListItemIcon>
                  <Checkbox color="primary" checked={selectedChain === c} />
                </ListItemIcon>
                <ListItemAvatar>
                  <Avatar src={connectableChains[c].image} />
                </ListItemAvatar>
                <ListItemText primary={connectableChains[c].name} />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Box flex={1} display="flex" flexDirection="column" mb={3}>
          <Button
            className={classes.button}
            disabled={!selectedChain}
            color="primary"
            variant="contained"
            type="submit"
          >
            {t('next')}
          </Button>
        </Box>
      </DialogActions>
    </form>
  )
}

export default SelectChain
