'use client';

import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Login from '../app/smallapp/login';
// import Register from './smallapp/register';
import Home from '../app/smallapp/index';

export default function MyApp() {
  // State for controlling visibility of different sections
  const [showLogin, setShowLogin] = useState(false);
  const [showDash, setShowDash] = useState(false);
  const [showFirstPage, setShowFirstPage] = useState(true);
  const [data, setData] = useState([]);

  // Fetch products from the backend
  useEffect(() => {
    fetch('../api/getProducts')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  // Function for putting items into the shopping cart
  function putInCart(prodN) {
    console.log("Putting in cart:", prodN);
    fetch(`../api/putInCart?prodN=${prodN}`)
      .then(response => response.json())
      .then(data => {
        console.log('Product added to cart:', data); // Debugging log
      })
      .catch(error => {
        console.error('Error adding product to cart:', error); // Error handling
      });
  }

  function runShowLogin() {
    setShowFirstPage(false);
    setShowLogin(true);
    setShowDash(false);
  }

  function runShowDash() {
    setShowFirstPage(false);
    setShowLogin(false);
    setShowDash(true);
  }

  function runShowFirst() {
    setShowFirstPage(true);
    setShowLogin(false);
    setShowDash(false);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Krispy K App
          </Typography>
          <Button color="inherit" onClick={runShowFirst}>Home</Button>
          <Button color="inherit" onClick={runShowLogin}>Login</Button>
          <Button color="inherit" onClick={runShowDash}>Dashboard</Button>
        </Toolbar>
      </AppBar>

      {showFirstPage &&
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
          {/* Content for the first page */}
          <Home />
        </Box>
      }

      {showLogin &&
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
          {/* Content for the login page */}
          <h2>Login</h2>
          {/* Login form goes here */}
          <Login />
        </Box>
      }

      {showDash && (
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
          {data.map((item, i) => (
            <div style={{ padding: '20px' }} key={i}>
              Unique ID: {item._id}
              <br />
              {item.prodN} - {item.prodP}
              <br />
              <img src={item.ImgUrl} alt={item.prodN} style={{ width: '100px', height: '100px' }} />
              <br />
              <Button onClick={() => putInCart(item.prodN)} variant="outlined">Add to cart</Button>
            </div>
          ))}
        </Box>
      )}
    </Box>
  );
}
