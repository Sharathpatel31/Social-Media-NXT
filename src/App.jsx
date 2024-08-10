import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material/styles';
import Layout from './components/Layout';
import Home from './pages/Home';
import Users from './pages/UserListing';
import Posts from './pages/PostListing';
import Login from './pages/Login';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;