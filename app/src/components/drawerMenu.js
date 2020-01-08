import React, { useState } from 'react';
import { navigate } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CropFree from '@material-ui/icons/CropFree';
import useAuth from '../utils/useAuth';

const useStyles = makeStyles(theme => ({
  list: {
    width: '200px'
  }
}));

const DrawerMenu = ({ toggleHandler, openState }) => {
  const { loggedIn } = useAuth();
  const classes = useStyles();

  return (
    <Drawer
      anchor="left"
      open={openState}
      onClose={toggleHandler(false)}
    >
      <div
        className={classes.list}
        role="presentation"
        onClick={toggleHandler(false)}
        onKeyDown={toggleHandler(false)}
      >
        <List>
          {loggedIn &&
            <ListItem button onClick={event => { navigate(`/qr`) }}>
              <CropFree />
              <ListItemText primary='QR Generator' />
            </ListItem>
          }
        </List>
      </div>
    </Drawer>
  )
}

export default DrawerMenu;
