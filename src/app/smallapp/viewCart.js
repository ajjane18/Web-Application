'use client';  // Indicates that this file is client-side code

import React, { useEffect, useState } from 'react';  // Import necessary React hooks
import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material';  // Import components from Material-UI

// Functional component for viewing the cart
const ViewCart = () => {
  const [cart, setCart] = useState({ items: [], total: 0 }); 

  // Function to fetch the cart data from the API
  const fetchCart = async () => {
    try {
      const response = await fetch('../api/getCart'); 
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setCart({
        items: data.items,  // Update state with cart items
        total: data.items.reduce((sum, item) => sum + parseFloat(item.prodP), 0)  // Calculate total price
      });
      console.log('Cart fetched successfully:', data);  
    } catch (error) {
      console.error('Error fetching cart:', error);  
    }
  };

  // Fetch cart data when the component mounts
  useEffect(() => {
    fetchCart();
  }, []);

  // Function to place an order
  async function placeOrder() {
    try {
      console.log("Placing order...");  
      const response = await fetch('../api/orders', { method: 'GET' }); 

      if (!response.ok) {
        console.error(`Error with status: ${response.status}`); 
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Order placed successfully:', data);

      await fetchCart();  // Update cart after placing the order
    } catch (error) {
      console.error('Error caught in placeOrder function:', error);
    }
  }

  return (
    <Container>
      <Typography variant="h4">Your Cart</Typography>
      <List>
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
    </Container>
  );
};

export default ViewCart;
