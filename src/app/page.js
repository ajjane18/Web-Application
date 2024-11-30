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
import Home from '../app/smallapp/index';
import ViewCart from '../app/smallapp/viewCart';
import '../app/css/dash.css';

export default function MyApp() {
  const [showLogin, setShowLogin] = useState(false);
  const [showDash, setShowDash] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showFirstPage, setShowFirstPage] = useState(true);
  const [data, setData] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });

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

  useEffect(() => {
    fetchCart();
  }, []);

  function fetchCart() {
    fetch('../api/getCart')
      .then(response => response.json())
      .then(data => {
        setCart({
          items: data.items,
          total: data.items.reduce((sum, item) => sum + item.prodP, 0)
        });
      })
      .catch(error => {
        console.error('Error fetching cart:', error);
      });
  }

  function putInCart(prodN) {
    console.log("Putting in cart:", prodN);
    fetch(`../api/putInCart?prodN=${prodN}`)
      .then(response => response.json())
      .then(data => {
        console.log('Product added to cart:', data);
        fetchCart(); // Update cart after adding an item
      })
      .catch(error => {
        console.error('Error adding product to cart:', error);
      });
  }

  function runShowLogin() {
    setShowFirstPage(false);
    setShowLogin(true);
    setShowDash(false);
    setShowCart(false);
  }

  function runShowDash() {
    setShowFirstPage(false);
    setShowLogin(false);
    setShowDash(true);
    setShowCart(false);
  }

  function runShowFirst() {
    setShowFirstPage(true);
    setShowLogin(false);
    setShowDash(false);
    setShowCart(false);
  }

  function runShowCart() {
    setShowFirstPage(false);
    setShowLogin(false);
    setShowDash(false);
    setShowCart(true);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#810303' }}>
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
          <Button color="inherit" onClick={runShowLogin}>Account</Button>
          <Button color="inherit" onClick={runShowDash}>Store</Button>
          <Button color="inherit" onClick={runShowCart}>Cart</Button>
        </Toolbar>
      </AppBar>

      {showFirstPage &&
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
          <Home />
        </Box>
      }

      {showLogin &&
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
          <h2>Login</h2>
          <Login />
        </Box>
      }

      {showDash && (
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
          <h1 id='dash-h1'>Products</h1>
          {data.map((item, i) => (
            <div id = 'products' style={{ padding: '20px' }} key={i}>
              {/* Unique ID: {item._id}
              <br /> */}
              {item.prodN}
              <br />
              <img src={item.imageUrl} alt={item.prodN} style={{ width: '100px', height: '100px' }} />
              <br />
              {item.prodP} euro
              <br />
              <Button id = 'products-cart' onClick={() => putInCart(item.prodN)} variant="outlined">Add to cart</Button>
            </div>
          ))}
        </Box>
      )}

      {showCart &&
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
          <ViewCart />
        </Box>
      }
      <section className='Home-signup'>
        <h3 id = 'home-h3'>Not Signed In Yet?</h3>
        {/* Signup/Register link*/}
        <a id = 'home-Register' href = '../smallapp/register.js'>Register Here!</a>
        </section> 
         
        <footer className="footer">
          <div className = 'con-foot'>
          <p id = 'home-p'>Follow Krispy Kremes social media or more updates!</p>
          {/* Social Media Icons */}
          <div className="social-media">
            <a href='https://www.instagram.com/KrispyKreme/' className="Instagram">
              <img src='/images/soc/insta.png' alt='Instagram' />
            </a>
            <a href='https://x.com/krispykreme' className="Twitter">
              <img src='/images/soc/Twitter.png' alt='Twitter' />
            </a>
            <a href='https://www.tiktok.com/@krispykreme' className="Tiktok">
              <img src='/images/soc/tiktok.jpg' alt='Tiktok' />
            </a>
          </div>
          </div>
      </footer>

    </Box>
  );
}
