import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material';

const ViewCart = () => {
  const [cart, setCart] = useState({ items: [], total: 0 });

  useEffect(() => {
    async function fetchCart() {
      const response = await fetch('/api/getCart');
      const data = await response.json();
      setCart({
        items: data.items,
        total: data.items.reduce((sum, item) => sum + item.prodP, 0)
      });
    }

    fetchCart();
  }, []);

  return (
    <Container>
      <Typography variant="h4">Your Cart</Typography>
      <List>
        {cart.items.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item.pname} secondary={`Price: ${item.price}`} />
          </ListItem>
        ))}
      </List>
      <Typography variant="h6">Total: {cart.total} euro</Typography>
      <Button variant="contained" color="primary" href="/checkout">Checkout</Button>
    </Container>
  );
};

export default ViewCart;
