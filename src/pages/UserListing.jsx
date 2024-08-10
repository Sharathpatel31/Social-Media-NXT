import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';
import KPIBox from '../components/KPIBox';
import { dummyData } from '../Data/dummyData';

const UserListing = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(5);
  const [users, setUsers] = useState(dummyData.users);
  const [openEdit, setOpenEdit] = useState(false);
  const [openBan, setOpenBan] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedUser, setEditedUser] = useState({});

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditedUser(user);
    setOpenEdit(true);
  };

  const confirmEdit = () => {
    setUsers(users.map(u => u.id === selectedUser.id ? editedUser : u));
    setOpenEdit(false);
  };

  const handleBan = (user) => {
    setSelectedUser(user);
    setOpenBan(true);
  };

  const confirmBan = () => {
    setUsers(users.map(u => u.id === selectedUser.id ? {...u, banned: true} : u));
    setOpenBan(false);
  };

  return (
    <div>
      <h1>User Listing</h1>
      <Grid container spacing={3} style={{ marginBottom: '20px' }}>
        <Grid item xs={6}>
          <KPIBox title="Total Users" value={users.length} />
        </Grid>
        <Grid item xs={6}>
          <KPIBox title="Active Users (24h)" value={dummyData.getActiveUsers().length} />
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.banned ? 'Banned' : 'Active'}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" style={{ marginRight: '10px' }} onClick={() => handleEdit(user)}>Edit</Button>
                  <Button variant="contained" color="secondary" onClick={() => handleBan(user)} disabled={user.banned}>Ban</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ marginTop: '20px' }}>
        <Button disabled={page === 0} onClick={() => handleChangePage(page - 1)}>
          Previous
        </Button>
        <Button disabled={page >= Math.ceil(users.length / rowsPerPage) - 1} onClick={() => handleChangePage(page + 1)}>
          Next
        </Button>
      </div>

      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Username"
            fullWidth
            value={editedUser.username || ''}
            onChange={(e) => setEditedUser({...editedUser, username: e.target.value})}
          />
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            value={editedUser.name || ''}
            onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            value={editedUser.email || ''}
            onChange={(e) => setEditedUser({...editedUser, email: e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openBan} onClose={() => setOpenBan(false)}>
        <DialogTitle>Confirm Ban</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to ban this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenBan(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmBan} color="secondary" autoFocus>
            Ban
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserListing;