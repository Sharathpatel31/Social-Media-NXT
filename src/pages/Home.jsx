import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
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
    <div>
      <h1>Dashboard</h1>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <KPIBox title="Total Users" value={dummyData.users.length} />
        </Grid>
        <Grid item xs={3}>
          <KPIBox title="Total Posts" value={posts.length} />
        </Grid>
        <Grid item xs={3}>
          <KPIBox title="Active Users (24h)" value={activeUsers.length} />
        </Grid>
        <Grid item xs={3}>
          <KPIBox title="Recent Posts (24h)" value={recentPosts.length} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;