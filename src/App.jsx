import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import UserListing from './pages/UserListing';
import PostListing from './pages/PostListing';
import Login from './pages/Login';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));

function App() {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.root}>
        <Navbar />
        <main className={classes.content}>
          <Routes>
           <Route exact path="/" element={<Home/>} />
           <Route path="/users" element={<UserListing/>} />
           <Route path="/posts" element={<PostListing/>} />
           <Route path="/login" element={<Login/>} />
         </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
