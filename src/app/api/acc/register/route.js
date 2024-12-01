// Importing the MongoClient from 'mongodb' to interact with the database
import { MongoClient } from 'mongodb';

// Defining a User object with methods for finding and inserting users
const User = {
  // Asynchronous method to find one user by username
  async findOne({ username }) {
    // Retrieving the database address from environment variables
    const url = process.env.DB_ADDRESS;
    // Creating a new MongoClient instance
    const client = new MongoClient(url);
    // Connecting to the MongoDB server
    await client.connect();
    // Selecting the 'app' database
    const db = client.db('app');
    // Finding one user in the 'login' collection that matches the given username
    const user = await db.collection('login').findOne({ username });
    // Closing the connection to the database
    await client.close();
    // Returning the found user
    return user;
  },
  // Asynchronous method to insert a new user into the database
  async insertOne({ username, pass }) {
    // Retrieving the database address from environment variables
    const url = process.env.DB_ADDRESS;
    // Creating a new MongoClient instance
    const client = new MongoClient(url);
    // Connecting to the MongoDB server
    await client.connect();
    // Selecting the 'app' database
    const db = client.db('app');
    // Inserting a new user into the 'login' collection with a default role of 'customer'
    const result = await db.collection('login').insertOne({ username, pass, acc_type: 'customer' });
    // Closing the connection to the database
    await client.close();
    // Returning the result of the insertion
    return result;
  }
};

// Exporting an asynchronous POST function to handle user registration
export async function POST(req) {
  try {
    // Parsing the request body to get the username and password
    const { username, pass } = await req.json();

    // Checking if the username already exists in the database
    const existingUser = await User.findOne({ username });

    // If the username is already taken, log the info and return a 409 response
    if (existingUser) {
      console.log('Username already taken:', username);
      return new Response(JSON.stringify({ status: 'exists' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Inserting the new user into the database
    await User.insertOne({ username, pass });
    console.log('User registered:', username);

    // Returning a success response with a message
    return new Response(JSON.stringify({ status: 'registered', message: 'User registered successfully' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    // Logging any errors that occur during the registration process
    console.log('Error occurred during registration:', error);
    return new Response('Internal Server Error', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}
