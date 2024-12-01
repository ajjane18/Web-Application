// Importing the MongoClient from 'mongodb' to interact with the database
import { MongoClient } from 'mongodb';
// Importing a custom session management function
import { getCustomSession } from '../sessionCode.js';

// Exporting an asynchronous GET function to handle requests for fetching shopping cart items
export async function GET(req) {
  try {
    // Retrieving the database address from environment variables
    const url = process.env.DB_ADDRESS;
    // Creating a new MongoClient instance
    const client = new MongoClient(url);

    const dbName = 'app';
    // Connecting to the MongoDB server
    await client.connect();
    // Selecting the 'app' database
    const db = client.db(dbName);

    // Retrieve the session and get the username
    let session = await getCustomSession();
    const username = session.username || 'username'; // Defaulting to 'username' if session.username is not found

    // Fetch the items added by the current user from the 'shopping_cart' collection
    const shoppingCartCollection = db.collection('shopping_cart');
    const items = await shoppingCartCollection.find({ username: username }).toArray();

    // Closing the connection to the database
    await client.close();

    // Returning the fetched items as a JSON response
    return new Response(JSON.stringify({ items }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    // Logging any errors that occur during the process
    console.error("Error occurred: ", error);
    // Returning a response indicating an internal server error
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
