// 'use client' directive for React components in a client-side environment
'use client';

// Importing necessary modules from 'react' and '@mui/material'
import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';

// Defining the Manager component
const Manager = () => {
  // State variables to store orders, total orders count, and total cost
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  // useEffect hook to fetch orders when the component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  // Function to fetch all orders from the server
  async function fetchOrders() {
    try {
      // Making a fetch request to get all orders for the manager
      const ordersResponse = await fetch('/api/orders/manager');
      if (!ordersResponse.ok) {
        // If the response is not ok, log the error and throw an error
        console.error('Error fetching orders:', await ordersResponse.text());
        throw new Error('Error fetching orders');
      }
      // Parsing the JSON response
      const ordersData = await ordersResponse.json();
      // Updating the orders state with the fetched data
      setOrders(ordersData);

      // Calculating the total cost of all orders
      const total = ordersData.reduce((sum, order) => sum + parseFloat(order.totalSum), 0);
      // Updating the total cost and total orders state
      setTotalCost(total);
      setTotalOrders(ordersData.length);
    } catch (error) {
      // Catching and logging any errors that occur during fetching
      console.error('Error fetching orders:', error);
    }
  }

  // Function to format the order date
  const formatDate = (dateString) => {
    return dateString.split('T')[0];
  };

  return (
    <Container>
      <Typography variant="h4">Manager Dashboard</Typography>
      <Typography variant="h6">Total Orders: {totalOrders}</Typography>
      <Typography variant="h6">Total Cost: {totalCost.toFixed(2)} euro</Typography>
      {orders.length === 0 ? (
        // Displaying a message if no orders are found
        <Typography variant="h6">No orders found.</Typography>
      ) : (
        <Grid container spacing={3}>
          {/* Displaying each order in a grid layout */}
          {orders.map((order, index) => (
            <Grid item xs={12} key={index}>
              <Box sx={{ p: 2, border: '1px dashed grey', mb: 2 }}>
                <Typography variant="h6">
                  {/* Displaying the username and formatted order date */}
                  Ordered by {order.username} on {formatDate(order.createdAt)}
                </Typography>
                <Typography variant="h6">
                  {/* Displaying the total cost of the order */}
                  Total: {order.totalSum} euro
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

// Exporting the Manager component as the default export
export default Manager;
