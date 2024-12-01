// 'use client' directive for React components in a client-side environment
'use client';

// Importing necessary modules from 'react' and '@mui/material'
import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

// Importing custom components
import Login from '../app/smallapp/login';
import RegisterForm from '../app/smallapp/register/page';
import Home from '../app/smallapp/index';
import Customer from '../app/smallapp/customer/page';
import Manager from '../app/smallapp/manager/page';
import ViewCart from '../app/smallapp/viewCart';
import Footer from '../app/smallapp/footer';

// Importing CSS
import '../app/css/dash.css';

// Defining the MyApp component
export default function MyApp() {
  // State variables for managing the visibility of different sections and user status
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showDash, setShowDash] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showFirstPage, setShowFirstPage] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  const [currentUser, setCurrentUser] = useState(''); // State to store current user's username
  const [data, setData] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [weather, setWeather] = useState({ temp: 0 });

  // Fetching product data on component mount
  useEffect(() => {
    fetch('../api/getProducts')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log('Products fetched successfully:', data);
      })
      .catch((error) => {
        console.log('Error fetching products:', error);
      });
  }, []);

  // Fetching cart data on component mount
  useEffect(() => {
    fetchCart();
  }, []);

  // Function to fetch cart data from the server
  function fetchCart() {
    fetch('../api/getCart')
      .then((response) => response.json())
      .then((data) => {
        setCart({
          items: data.items,
          total: data.items.reduce((sum, item) => sum + item.prodP, 0)
        });
        console.log('Cart fetched successfully:', data);
      })
      .catch((error) => {
        console.log('Error fetching cart:', error);
      });
  }

  // Fetching weather data on component mount
  useEffect(() => {
    fetch('../api/getWeather')
      .then((res) => res.json())
      .then((weather) => {
        setWeather(weather);
        console.log('Weather fetched successfully:', weather);
      })
      .catch((error) => {
        console.log('Error fetching weather:', error);
      });
  }, []);

  // Function to add a product to the cart
  function putInCart(prodN) {
    console.log('Putting in cart:', prodN);
    fetch(`../api/putInCart?prodN=${prodN}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Product added to cart:', data);
        fetchCart(); // Update cart after adding an item
      })
      .catch((error) => {
        console.log('Error adding product to cart:', error);
      });
  }

  // Functions to manage the visibility of different sections
  function runShowLogin() {
    setShowFirstPage(false);
    setShowLogin(true);
    setShowDash(false);
    setShowCart(false);
    setShowRegister(false);
  }

  function runShowRegister() {
    setShowFirstPage(false);
    setShowLogin(false);
    setShowDash(false);
    setShowCart(false);
    setShowRegister(true);
  }

  function runShowDash() {
    setShowFirstPage(false);
    setShowLogin(false);
    setShowDash(true);
    setShowCart(false);
    setShowRegister(false);
  }

  function runShowCustomer() {
    setShowFirstPage(false);
    setShowLogin(false);
    setShowDash(true);
    setShowCart(false);
    setShowRegister(false);
  }

  function runShowManager() {
    setShowFirstPage(false);
    setShowLogin(false);
    setShowDash(true);
    setShowCart(false);
    setShowRegister(false);
  }

  function runShowFirst() {
    setShowFirstPage(true);
    setShowLogin(false);
    setShowDash(false);
    setShowCart(false);
    setShowRegister(false);
  }

  function runShowCart() {
    setShowFirstPage(false);
    setShowLogin(false);
    setShowDash(false);
    setShowCart(true);
    setShowRegister(false);
  }

  // Function to handle user logout
  function handleLogout() {
    fetch('../api/acc/logout', {
      method: 'POST'
    })
      .then(() => {
        setLoggedIn(false);
        setRole('');
        setCurrentUser('');
        console.log('User logged out successfully');
        runShowLogin();
      })
      .catch((error) => {
        console.log('Error during logout:', error);
      });
  }

  // Checking login status on component mount
  useEffect(() => {
    checkLoginStatus();
  }, []);

  // Function to check login status
  async function checkLoginStatus() {
    const response = await fetch('../api/checkSess');
    const data = await response.json();
    setLoggedIn(data.loggedIn);
    setRole(data.role);
    setCurrentUser(data.username); // Set the current user's username
  }

  // Function to handle user login
  function handleLogin(role) {
    setLoggedIn(true);
    setRole(role);
    setShowDash(true);
  }

  // Function to handle user registration
  function handleRegister() {
    // Redirect to the account page after successful registration
    location.href = '/app/page'; // Update this to match your actual path
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#810303' }}>
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Krispy K App
          </Typography>
          <Button color="inherit" onClick={runShowFirst}>
            Home
          </Button>
          <Button color="inherit" onClick={runShowLogin}>
            Account
          </Button>
          <Button color="inherit" onClick={runShowDash}>
            Store
          </Button>
          <Button color="inherit" onClick={runShowCart}>
            Cart
          </Button>
          {loggedIn && (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {showFirstPage && (
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
          <Home />
        </Box>
      )}

      {showLogin && !loggedIn && (
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
          <h2>Login</h2>
          <Login onLogin={handleLogin} />
        </Box>
      )}

      {showRegister && !loggedIn && (
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
          <h2>Register</h2>
          <RegisterForm onRegister={handleRegister} />
        </Box>
      )}

      {showDash && (
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
          <Typography variant="h4">Products</Typography>
          {role === 'customer' && <h2>Today's temperature: {JSON.stringify(weather.temp)}</h2>}
          <Box>
            {data.map((item, i) => (
              <div id="products" style={{ padding: '20px' }} key={i}>
                {item.prodN}
                <br />
                <img src={item.imageUrl} alt={item.prodN} style={{ width: '100px', height: '100px' }} />
                <br />
                {item.prodP} euro
                <br />
                {item.Des}
                <br />
                <Button id="products-cart" onClick={() => putInCart(item.prodN)} variant="outlined">
                  Add to cart
                </Button>
              </div>
            ))}
          </Box>
        </Box>
      )}

      {showLogin && loggedIn && role === 'customer' && (
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
          <Customer />
        </Box>
      )}

      {showLogin && loggedIn && role === 'manager' && (
                <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
                <Manager />
              </Box>
            )}
      
            {showCart && currentUser && (
              <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
                <ViewCart username={currentUser} />
              </Box>
            )}
      
            <Footer />
          </Box>
        );
      }
      