'use client';

import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Box, Checkbox, FormControlLabel, Link } from '@mui/material';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [message, setMessage] = useState('');
  const [redirectUrl, setRedirectUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('../api/acc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, pass }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      await saveSessionData(data.role, username);

      if (data.role === 'manager') {
        setRedirectUrl('/smallapp/manager');
      } else {
        setRedirectUrl('/smallapp/customer');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setMessage(error.message || 'Login failed');
    }
  };

  const saveSessionData = async (role, username) => {
    await fetch('../api/saveData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role, username }),
    });
  };

  useEffect(() => {
    if (redirectUrl) {
      document.getElementById('redirectLink').click();
    }
  }, [redirectUrl]);

  return (
    <Container maxWidth="sm">
      <Box sx={{ height: '100vh' }}>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="pass"
            label="Password"
            type="password"
            id="pass"
            autoComplete="current-password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          {message && <p>{message}</p>}
          {redirectUrl && <Link id="redirectLink" href={redirectUrl} style={{ display: 'none' }}>Redirect</Link>}
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
