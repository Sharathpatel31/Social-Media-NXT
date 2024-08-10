import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import KPIBox from '../components/KPIBox';
import { dummyData } from '../Data/dummyData';

const PostListing = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(5);
  const [posts, setPosts] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [openHideUnhide, setOpenHideUnhide] = useState(false);
  const [openAddPost, setOpenAddPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [newPost, setNewPost] = useState({ caption: '', mediaUrl: '' });

  useEffect(() => {
    setPosts(dummyData.getPosts());
  }, []);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleDelete = (post) => {
    setSelectedPost(post);
    setOpenDelete(true);
  };

  const confirmDelete = () => {
    setPosts(posts.filter(p => p.id !== selectedPost.id));
    setOpenDelete(false);
  };

  const handleHideUnhide = (post) => {
    setSelectedPost(post);
    setOpenHideUnhide(true);
  };

  const confirmHideUnhide = () => {
    setPosts(posts.map(p => p.id === selectedPost.id ? {...p, hidden: !p.hidden} : p));
    setOpenHideUnhide(false);
  };

  const handleAddPost = () => {
    setOpenAddPost(true);
  };

  const confirmAddPost = () => {
    const newPostWithId = {
      ...newPost,
      id: Math.max(...posts.map(p => p.id)) + 1,
      hidden: false,
      publishedAt: new Date()  
    };
    setPosts([...posts, newPostWithId]);
    setOpenAddPost(false);
    setNewPost({ caption: '', mediaUrl: '' });
  };

  const recentPosts = dummyData.getRecentPosts(posts);

  return (
    <div>
      <h1>Post Listing</h1>
      <Grid container spacing={3} style={{ marginBottom: '20px' }}>
        <Grid item xs={6}>
          <KPIBox title="Total Posts" value={posts.length} />
        </Grid>
        <Grid item xs={6}>
          <KPIBox title="Recent Posts (24h)" value={recentPosts.length} />
        </Grid>
      </Grid>
      <Fab color="primary" aria-label="add" style={{ marginBottom: '20px' }} onClick={handleAddPost}>
        <AddIcon />
      </Fab>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Post ID</TableCell>
              <TableCell>Caption</TableCell>
              <TableCell>Media URL</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.id}</TableCell>
                <TableCell>{post.caption}</TableCell>
                <TableCell>{post.mediaUrl}</TableCell>
                <TableCell>{post.hidden ? 'Hidden' : 'Visible'}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" style={{ marginRight: '10px' }} onClick={() => handleDelete(post)}>Delete</Button>
                  <Button variant="contained" onClick={() => handleHideUnhide(post)}>{post.hidden ? 'Unhide' : 'Hide'}</Button>
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
        <Button disabled={page >= Math.ceil(posts.length / rowsPerPage) - 1} onClick={() => handleChangePage(page + 1)}>
          Next
        </Button>
      </div>

      {/* Delete Dialog */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Hide/Unhide Dialog */}
      <Dialog open={openHideUnhide} onClose={() => setOpenHideUnhide(false)}>
        <DialogTitle>{selectedPost?.hidden ? 'Confirm Unhide' : 'Confirm Hide'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to {selectedPost?.hidden ? 'unhide' : 'hide'} this post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenHideUnhide(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmHideUnhide} color="primary" autoFocus>
            {selectedPost?.hidden ? 'Unhide' : 'Hide'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Post Dialog */}
      <Dialog open={openAddPost} onClose={() => setOpenAddPost(false)}>
        <DialogTitle>Add New Post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Caption"
            fullWidth
            value={newPost.caption}
            onChange={(e) => setNewPost({...newPost, caption: e.target.value})}
          />
          <TextField
            margin="dense"
            label="Media URL"
            fullWidth
            value={newPost.mediaUrl}
            onChange={(e) => setNewPost({...newPost, mediaUrl: e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddPost(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmAddPost} color="primary" autoFocus>
            Add Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PostListing;