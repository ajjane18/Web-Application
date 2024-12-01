// Importing the MongoClient from 'mongodb' to interact with the database
import { MongoClient } from 'mongodb';
// Importing a custom session management function
import { getCustomSession } from '../../sessionCode';

// Database address
const url = process.env.DB_ADDRESS;
// Creating a new MongoClient instance
const client = new MongoClient(url);

// Function to connect to the MongoDB database
async function connectToDb() {
  await client.connect();
  return client.db('app');
}

// Exporting an asynchronous GET function to handle fetching orders for the manager
export async function GET(req) {
  try {
    const db = await connectToDb();

    // Retrieve the current session
    const session = await getCustomSession();
    if (!session.username) {
      // If the user is not authenticated, return an Unauthorized response
      return new Response('Unauthorized', {
        status: 401,
        headers: { 'Content-Type': 'text/plain' }
      });
    }

    // Check if the user is a manager (you might want to include a role check here)
    if (session.role !== 'manager') {
      // If the user is not a manager, return a Forbidden response
      return new Response('Forbidden', {
        status: 403,
        headers: { 'Content-Type': 'text/plain' }
      });
    }

    // Fetch all orders from the 'orders' collection
    const orders = await db.collection('orders').find().toArray();
    await client.close();

    // Returning the fetched orders as a JSON response
    return new Response(JSON.stringify(orders), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    // Logging any errors that occur during the process
    console.log('Error occurred during fetching orders:', error);
    // Returning a response indicating an internal server error
    return new Response('Internal Server Error', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

// Exporting an asynchronous POST function to handle placing orders for the manager
export async function POST(req) {
  try {
    const db = await connectToDb();

    // Retrieve the current session
    const session = await getCustomSession();
    if (!session.username) {
      // If the user is not authenticated, return an Unauthorized response
      return new Response('Unauthorized', {
        status: 401,
        headers: { 'Content-Type': 'text/plain' }
      });
    }

    // Check if the user is a manager (you might want to include a role check here)
    if (session.role !== 'manager') {
      // If the user is not a manager, return a Forbidden response
      return new Response('Forbidden', {
        status: 403,
        headers: { 'Content-Type': 'text/plain' }
      });
    }

    // Fetch items from shopping cart
    const cartItems = await db.collection('shopping_cart').find({ username: session.username }).toArray();
    console.log('Cart items:', cartItems);

    // Calculate total sum
    const totalSum = cartItems.reduce((sum, item) => sum + parseFloat(item.prodP), 0).toFixed(2);

    // Create the order object
    const order = {
      username: session.username,
      items: cartItems,
      totalSum,
      createdAt: new Date(),
    };

    // Insert the order into the 'orders' collection and delete from 'shopping_cart'
    await db.collection('orders').insertOne(order);
    await db.collection('shopping_cart').deleteMany({ username: session.username });
    await client.close();

    // Returning a response indicating the order was placed successfully
    return new Response('Order placed successfully', {
      status: 201,
      headers: { 'Content-Type': 'text/plain' }
    });
  } catch (error) {
    // Logging any errors that occur during the process
    console.log('Error occurred during placing an order:', error);
    // Returning a response indicating an internal server error
    return new Response('Internal Server Error', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}
