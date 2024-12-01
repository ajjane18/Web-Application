// Importing necessary modules from 'mongodb' and a custom session code
import { MongoClient } from 'mongodb';
import { getCustomSession } from '../../sessionCode';

// Defining a User object with an asynchronous findOne method
const User = {
  async findOne({ username, pass }) {
    // Getting the database address from environment variables
    const url = process.env.DB_ADDRESS;
    // Creating a new MongoClient instance
    const client = new MongoClient(url);
    // Connecting to the MongoDB server
    await client.connect();
    // Selecting the 'app' database
    const db = client.db('app');
    // Finding one user in the 'login' collection that matches the given username and password
    const user = await db.collection('login').findOne({ username, pass });
    // Closing the connection to the database
    await client.close();
    // Returning the found user
    return user;
  }
};

// Exporting an asynchronous POST function to handle login requests
export async function POST(req) {
  try {
    // Parsing search parameters from the request URL
    const { searchParams } = new URL(req.url);
    const username = searchParams.get('username'); // Getting the 'username' parameter
    const pass = searchParams.get('pass'); // Getting the 'pass' parameter

    // Finding the user with the given username and password
    const user = await User.findOne({ username, pass });

    // If no user is found, log the info and return a 404 response
    if (!user) {
      console.log('User not found:', { username, pass });
      return new Response('User not found', {
        status: 404,
        headers: { 'Content-Type': 'text/plain' }
      });
    }

    // Creating a custom session for the user
    const session = await getCustomSession();
    session.username = username; // Setting the session username
    session.role = user.acc_type; // Setting the session role
    await session.save(); // Saving the session

    // Logging the success and returning the user role as JSON
    console.log('User found and session created:', { username, role: session.role });
    return new Response(JSON.stringify({ role: user.acc_type }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    // Logging any errors that occur during the login process
    console.log('Error occurred during login:', error);
    return new Response('Internal Server Error', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}
