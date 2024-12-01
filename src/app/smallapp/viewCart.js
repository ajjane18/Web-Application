// 'use client' directive for React components in a client-side environment
'use client';

// Importing necessary modules from 'react' and '@mui/material'
import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material';

// Defining the ViewCart component
const ViewCart = () => {
  // State variables to manage cart items, total cost, and order success status
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Function to fetch cart data from the server
  const fetchCart = async () => {
    try {
      // Making a fetch request to get the cart items for the current user
      const response = await fetch('/api/getCart');
      if (!response.ok) {
        // If the response is not ok, log the error
        console.log(`Error: ${response.status}`);
      }
      // Parsing the JSON response
      const data = await response.json();
      // Updating the cart state with the fetched data and calculating the total cost
      setCart({
        items: data.items,
        total: data.items.reduce((sum, item) => sum + parseFloat(item.prodP), 0)
      });
      console.log('Cart fetched successfully:', data);
    } catch (error) {
      // Catching and logging any errors that occur during fetching
      console.log('Error fetching cart:', error);
    }
  };

  // useEffect hook to fetch cart data when the component mounts
  useEffect(() => {
    fetchCart();
  }, []);

  // Function to place an order
  async function placeOrder() {
    try {
      console.log("Placing order...");
      console.log('Order items:', cart.items);

      // Calculating the total cost of the cart items
      const totalSum = parseFloat(cart.total.toFixed(2));
      
      // Making a fetch request to place an order with the current cart items
      const response = await fetch('/api/customerOrders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ items: cart.items, totalSum })
      });

      if (!response.ok) {
        // If the response is not ok, log the error and throw an error
        const errorText = await response.text();
        console.log(`Error with status: ${response.status}, Message: ${errorText}`);
        throw new Error(`Error: ${response.status}, Message: ${errorText}`);
      }

      // Logging the success message
      const text = await response.text();
      console.log('Order placed successfully:', text);

      // Clearing the cart and setting the order success status
      setCart({ items: [], total: 0 });
      setOrderSuccess(true);
    } catch (error) {
      // Catching and logging any errors that occur during placing the order
      console.log('Error caught in placeOrder function:', error);
    }
  }

  return (
    <Container>
      <Typography variant="h4">Your Cart</Typography>
      {cart.items.length === 0 ? (
        // Displaying a message if the cart is empty
        <Typography variant="h6">
          {orderSuccess ? 'Order was successful!' : 'You have nothing in your cart right now.'}
        </Typography>
      ) : (
        <>
          <List id='item-cart'>
            {/* Displaying each item in the cart */}
            {cart.items.map((item, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={item.prodN}
                  secondary={`Price: ${item.prodP || ''} euro`}
                />
                {item.imageUrl && (
                  <img src={item.imageUrl} alt={item.prodN} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                )}
              </ListItem>
            ))}
          </List>
          <Typography variant="h6">Total: {cart.total.toFixed(2)} euro</Typography>
          <Button onClick={placeOrder} variant="outlined">Checkout</Button>
        </>
      )}
    </Container>
  );
};

// Exporting the ViewCart component as the default export
export default ViewCart;
