import React, { useState,  } from 'react';
import { TextField, Button, Paper } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const link = useNavigate();
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    link('/')
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper style={{ padding: '20px', width: '300px' }}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
            Login
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default Login;