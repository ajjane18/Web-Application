import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Checkbox, FormControlLabel } from '@mui/material';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirectUrl, setRedirectUrl] = useState('');

  const handleSubmit = (event) => {
    console.log("Handling submit");
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let username = data.get('username');
    let pass = data.get('pass');
    console.log("Sent username: " + username);
    console.log("Sent password: " + pass);

    runDBCallAsync(`/api/login?username=${username}&pass=${pass}`);
  };

  async function runDBCallAsync(url) {
    const res = await fetch(url);
    const data = await res.json();
    if(data.role != null) {
      console.log("Login is valid!");
      await saveSessionData(data.role, username);
      if (data.role === 'manager') {
        setRedirectUrl('../smallapp/manager');
      } else {
        setRedirectUrl('../smallapp/customer');
      }
    } else {
      console.log("Not valid");
      alert('Login failed. Please check your credentials and try again.');
    }
  }

  async function saveSessionData(role, username) {
    await axios.post('../api/saveData', { role, username });
  }

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
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
