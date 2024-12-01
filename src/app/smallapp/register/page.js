// 'use client' directive for React components in a client-side environment
'use client';

// Importing necessary modules from 'react' and '@mui/material'
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// Defining the RegisterForm component
export default function RegisterForm({ onRegister }) {
  // State variables to manage error and success messages
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let username = data.get('email');
    let pass = data.get('pass');

    // Call the function to run the register API
    runRegisterAPI(`/api/acc/register`, username, pass);
  };

  // Asynchronous function to call the registration API
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
        // Set an error message if the username is already taken
        setErrorMessage('Username taken, please choose another.');
      } else if (data.status === 'registered') {
        // Set a success message if the registration is successful
        setSuccessMessage(data.message);
        // Auto-login after registration
        const loginRes = await fetch(`/api/acc/login?username=${username}&pass=${pass}`, {
          method: 'POST'
        });
        if (loginRes.ok) {
          const loginData = await loginRes.json();
          if (loginData.status === 'success') {
            // Trigger the registration success action in the parent component
            onRegister();
          } else {
            setErrorMessage('Registration successful, Please return to the previous page.');
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
    </Container>
  );
}
