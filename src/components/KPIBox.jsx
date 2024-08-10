import React from 'react';
import { Paper, Typography } from '@material-ui/core';

const KPIBox = ({ title, value }) => {
    console.log("kpi box")
  return (
    <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="h4">{value}</Typography>
    </Paper>
  );
};

export default KPIBox;