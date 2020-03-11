import React, { useState } from 'react';
import { navigate } from 'gatsby';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import SubjectIcon from '@material-ui/icons/Subject';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CropFree from '@material-ui/icons/CropFree';
import useAuth from '../utils/useAuth';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(6) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(8) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
}));

const DrawerMenu = ({ openState }) => {
  const { loggedIn } = useAuth();
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      open={openState}
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: openState,
        [classes.drawerClose]: !openState,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: openState,
          [classes.drawerClose]: !openState,
        }),
      }}
    >
      <div className={classes.toolbar} />
      <List>
        {loggedIn &&
          <>
            <ListItem button onClick={event => { navigate(`/qr`) }}>
              <ListItemIcon><CropFree /></ListItemIcon>
              <ListItemText primary='QR Generator' />
            </ListItem>
            <ListItem button onClick={event => { navigate(`/manage`) }}>
              <ListItemIcon><SubjectIcon /></ListItemIcon>
              <ListItemText primary='Manage' />
            </ListItem>
          </>
        }
      </List>
    </Drawer>
  )
}

export default DrawerMenu;
