'use client';

import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Box, Checkbox, FormControlLabel, Link } from '@mui/material';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [acc_type, setacc_type] = useState('');
  const [message, setMessage] = useState('');
  const [redirectUrl, setRedirectUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('Form submitted:', { username, pass, acc_type });

    try {
      const response = await fetch(`../api/acc/login?username=${username}&pass=${pass}&acc_type=${acc_type}`, {
        method: 'POST',
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.log('Response not OK:', errorMessage);
        throw new Error(errorMessage || 'Login failed');
      }

      const data = await response.text();
      console.log('Login successful:', data);

      await saveSessionData('role-placeholder', username);
      
      if (data.role === 'manager') {
        setRedirectUrl('/smallapp/manager');
      }
      if (data.role === 'customer'){
        setRedirectUrl('/smallapp/customer');
      }

    } catch (error) {
      console.error('Error during login:', error);
      setMessage(error.message || 'Login failed');
    }
  };

  const saveSessionData = async (role, username) => {
    const searchParams = new URLSearchParams({ role, username });
    await fetch(`../api/saveData?${searchParams}`, {
      method: 'POST',
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
