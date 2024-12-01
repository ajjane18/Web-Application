// 'use client' directive for React components in a client-side environment
'use client';

// Importing necessary modules from 'react' and '@mui/material'
import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Box, Checkbox, FormControlLabel, Link } from '@mui/material';

// Defining the LoginForm component
const LoginForm = ({ onLogin }) => {
  // State variables to manage username, password, and error message
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [message, setMessage] = useState('');

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Sending a POST request to the login API with the username and password
      const response = await fetch(`../api/acc/login?username=${username}&pass=${pass}`, {
        method: 'POST',
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.log('Response not OK:', errorMessage);
        throw new Error(errorMessage || 'Login failed');
      }

      // Parsing the JSON response
      const data = await response.json();
      onLogin(data.role); // Pass the role to the parent component

      console.log('Login successful:', data);
    } catch (error) {
      // Handle errors during login
      console.log('Error during login:', error);
      setMessage(error.message || 'Login failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ height: '100vh' }}>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {/* Text field for entering username */}
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
          {/* Text field for entering password */}
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
          {/* Checkbox for remembering the user */}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          {/* Button to submit the form */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          {/* Display an error message if login fails */}
          {message && <p>{message}</p>}
        </Box>
      </Box>
    </Container>
  );
};

// Exporting the LoginForm component as the default export
export default LoginForm;
