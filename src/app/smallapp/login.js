'use client';

import React, { useState } from 'react';
import { TextField, Button, Container, Box, Checkbox, FormControlLabel, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography } from '@mui/material';
import validateLoginForm from '../smallapp/validateLoginForm'; // Import validation function

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate the form
    let errorMessage = validateLoginForm(event);
    setMessage(errorMessage);

    if (errorMessage.length > 0) {
      setOpen(true); // Open the dialog and show the error
      return;
    }

    try {
      const response = await fetch(`../api/acc/login?username=${username}&pass=${pass}`, {
        method: 'POST',
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.log('Response not OK:', errorMessage);
        throw new Error(errorMessage || 'Login failed');
      }

      const data = await response.json();
      onLogin(data.role); // Pass the role to the parent component

      console.log('Login successful:', data);
    } catch (error) {
      console.log('Error during login:', error);
      setMessage(error.message || 'Login failed');
      setOpen(true); // Open the dialog and show the error
    }
  };

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
          {message && (
            <Typography color="error" variant="body2">{message}</Typography>
          )}
        </Box>
      </Box>

      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Error</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default LoginForm;
