// 'use client' directive for React components in a client-side environment
'use client';

// Importing necessary modules from 'react' and '@mui/material'
import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';

// Defining the Customer component
const Customer = () => {
  // State variables to manage orders and username
  const [orders, setOrders] = useState([]);
  const [username, setUsername] = useState('');

  // useEffect hook to fetch user orders when the component mounts
  useEffect(() => {
    fetchUserOrders();
  }, []);

  // Function to fetch user orders from the server
  async function fetchUserOrders() {
    try {
      // Fetching session data to get the current user
      const sessionResponse = await fetch('../api/checkSess');
      const sessionData = await sessionResponse.json();
      const currentUser = sessionData.username;
      setUsername(currentUser);
      console.log('Current user:', currentUser);

      if (currentUser) {
        // Fetching all orders for the current user
        const ordersResponse = await fetch(`../api/orders/customer?username=${currentUser}`);
        if (!ordersResponse.ok) {
          // If the response is not ok, log the error and throw an error
          console.error('Error fetching orders:', await ordersResponse.text());
          throw new Error('Error fetching orders');
        }
        // Parsing the JSON response
        const ordersData = await ordersResponse.json();
        // Updating the orders state with the fetched data
        setOrders(ordersData);
        console.log('User orders:', ordersData);
      }
    } catch (error) {
      // Catching and logging any errors that occur during fetching
      console.error('Error fetching user orders:', error);
    }
  }

  // Function to format the order date
  const formatDate = (dateString) => {
    return dateString.split('T')[0];
  };

  return (
    <Container>
      <Typography variant="h4">My Orders</Typography>
      {orders.length === 0 ? (
        // Displaying a message if no orders are found
        <Typography variant="h6">You have ordered nothing.</Typography>
      ) : (
        <Grid container spacing={3}>
          {/* Displaying each order in a grid layout */}
          {orders.map((order, index) => (
            <Grid item xs={12} key={index}>
              <Box sx={{ p: 2, border: '1px dashed grey', mb: 2 }}>
                <Typography variant="h6">
                  {/* Displaying the date the order was placed */}
                  Your order has been placed on {formatDate(order.createdAt)}
                </Typography>
                <Typography variant="h6">
                  {/* Displaying the total cost of the order */}
                  Your total: {order.items.reduce((total, item) => total + parseFloat(item.prodP), 0)} euro
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {/* Displaying each item in the order */}
                  {order.items.map((item, i) => (
                    <Typography key={i}>
                      {item.prodN} - {item.prodP} euro
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

// Exporting the Customer component as the default export
export default Customer;
