// 'use client' directive for React components in a client-side environment
'use client';

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import validateForm from '../validateForm';

export default function RegisterForm({ onRegister }) {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate the form
    let errorMessage = validateForm(event);
    setErrorMessage(errorMessage);

    if (errorMessage.length > 0) {
      setOpen(true); // Open the dialog and show the error
    } else {
      const data = new FormData(event.currentTarget);
      let username = data.get('email');
      let pass = data.get('pass');

      // Call the function to run the register API
      runRegisterAPI(`/api/acc/register`, username, pass);
    }
  };

  async function runRegisterAPI(url, username, pass) {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, pass })
    });
    if (res.ok) {
      const data = await res.json();
      if (data.status === 'exists') {
        setErrorMessage('Username taken, please choose another.');
        setOpen(true);
      } else if (data.status === 'registered') {
        setSuccessMessage(data.message);
        const loginRes = await fetch(`/api/acc/login?username=${username}&pass=${pass}`, {
          method: 'POST'
        });
        if (loginRes.ok) {
          const loginData = await loginRes.json();
          if (loginData.status === 'success') {
            onRegister();
          } else {
            setErrorMessage('Registration successful, Please return to the previous page.');
            setOpen(true);
          }
        } else {
          console.log('Login failed:', await loginRes.text());
        }
      }
    } else {
      console.log('Registration failed:', await res.text());
    }
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ height: '100vh' }}>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
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
          />
          {errorMessage && (
            <Typography color="error" variant="body2">{errorMessage}</Typography>
          )}
          {successMessage && (
            <Typography color="success" variant="body2">{successMessage}</Typography>
          )}
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
            Register
          </Button>
        </Box>
      </Box>

      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Error</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {errorMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
