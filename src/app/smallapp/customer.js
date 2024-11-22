import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid } from '@mui/material'; 

const Customer = () => {
    const [products, setProducts] = useState([]); // State to store products
    const [weather, setWeather] = useState({}); // State to store weather data

    useEffect(() => {

        fetch('../api/getProducts')

        .then((res) => res.json())
  
        .then((data) => {
  
          setProducts(data)
  
        })

        fetch('../api/getWeather')

           .then((res) => res.json())

           .then((weather) => {

                setWeather(weather)

      })
    }, []);

    

    return (
        <Container>
            <Typography variant="h4">Products</Typography>
            <Typography variant="h6">Weather: {weather?.main?.temp}°C</Typography>
            <Grid container spacing={3}>
                <ProductList products={products} />
            </Grid>
        </Container>
    );
};

export default Customer;
