import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const drawerWidth = 240;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
}));

const Toolbar = styled(Box)(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const Navbar = () => {
  return (
    <StyledDrawer
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
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
    </StyledDrawer>
  );
};

export default Navbar;