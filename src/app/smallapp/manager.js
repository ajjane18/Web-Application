'use client';

import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const Manager = () => {
    const [orders, setOrders] = useState([]); // State to store orders

    useEffect(() => {
        // Fetch orders from the API
        fetch('../api/orders')
            .then(response => response.json())
            .then(data => setOrders(data))
            .catch(error => console.error('Error fetching orders:', error));
    }, []);

    return (
        <Container>
            <Typography variant="h4">Manager Dashboard</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Order ID</TableCell>
                        <TableCell>Products</TableCell>
                        <TableCell>Total</TableCell>
                        <TableCell>Customer</TableCell>
                        <TableCell>Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map(order => (
                        <TableRow key={order.id}>
                            <TableCell>{order.id}</TableCell>
                            <TableCell>{order.items.map(item => item.name).join(', ')}</TableCell>
                            <TableCell>{order.totalPrice}</TableCell>
                            <TableCell>{order.username}</TableCell>
                            <TableCell>{order.puchaseDate}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
};

export default Manager;
