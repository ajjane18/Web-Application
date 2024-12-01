// Importing the MongoClient from 'mongodb' to interact with the database
import { MongoClient } from 'mongodb';
// Importing a custom session management function
import { getCustomSession } from '../sessionCode.js';

// Exporting an asynchronous GET function to handle adding products to the shopping cart
export async function GET(req) {
  try {
    console.log("in the putInCart API page"); // Logging a message to indicate the function is running

    // Parsing the search parameters from the request URL
    const { searchParams } = new URL(req.url);
    const prodN = searchParams.get('prodN'); // Getting the 'prodN' parameter
    console.log(prodN); // Logging the product name

    // Retrieving the database address from environment variables
    const url = process.env.DB_ADDRESS;
    // Creating a new MongoClient instance
    const client = new MongoClient(url);

    const dbName = 'app'; // Database name
    // Connecting to the MongoDB server
    await client.connect();
    console.log('Connected successfully to server'); // Logging a success message
    // Selecting the 'app' database
    const db = client.db(dbName);

    // Fetching product details from the 'products' collection
    const productsCollection = db.collection('products');
    const product = await productsCollection.findOne({ prodN: prodN });

    // Retrieving the session and getting the username
    let session = await getCustomSession();
    const username = session.username || 'username'; // Defaulting to 'username' if session.username is not found
    if (product) {
      // If the product is found, insert it into the 'shopping_cart' collection
      const shoppingCartCollection = db.collection('shopping_cart');
      const myobj = {
        prodN: product.prodN, // Product name
        prodP: product.prodP, // Product price
        imageUrl: product.imageUrl, // Product image URL
        username: username  // Store the actual username from the session
      };
      // Inserting the product into the shopping cart
      const insertResult = await shoppingCartCollection.insertOne(myobj);
      console.log(insertResult); // Logging the result of the insertion
    } else {
      console.log("Product not found"); // Logging a message if the product is not found
    }

    // Closing the connection to the database
    await client.close();

    // Returning a response indicating that the product was inserted into the shopping cart
    return new Response(JSON.stringify({ data: "inserted" }), {
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
