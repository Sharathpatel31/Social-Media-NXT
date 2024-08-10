import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/users">
          <ListItemIcon><PeopleIcon /></ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem button component={Link} to="/posts">
          <ListItemIcon><PhotoLibraryIcon /></ListItemIcon>
          <ListItemText primary="Posts" />
        </ListItem>
        <ListItem button component={Link} to="/login">
          <ListItemIcon><ExitToAppIcon /></ListItemIcon>
          <ListItemText primary="Login" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Navbar;