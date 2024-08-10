import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import KPIBox from '../components/KPIBox';
import { dummyData } from '../Data/dummyData';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(dummyData.getPosts());

    const intervalId = setInterval(() => {
      setPosts(dummyData.getPosts());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const activeUsers = dummyData.getActiveUsers();
  const recentPosts = dummyData.getRecentPosts(posts);

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <KPIBox title="Total Users" value={dummyData.users.length} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPIBox title="Total Posts" value={posts.length} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPIBox title="Active Users (24h)" value={activeUsers.length} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPIBox title="Recent Posts (24h)" value={recentPosts.length} />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;