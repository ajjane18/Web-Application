// Importing the MongoClient from 'mongodb' to interact with the database
import { MongoClient } from 'mongodb';

// Exporting an asynchronous GET function to handle requests for fetching products
export async function GET(req, res) {
    console.log("in the API page"); // Logging a message to indicate the function is running

    // Retrieving the database address from environment variables
    const url = process.env.DB_ADDRESS;
    // Creating a new MongoClient instance
    const client = new MongoClient(url);
    const dbName = 'app'; // Database name

    try {
        // Connecting to the MongoDB server
        await client.connect();
        console.log('Connected successfully to server'); // Logging a success message
        // Selecting the 'app' database
        const db = client.db(dbName);
        // Selecting the 'products' collection
        const collection = db.collection('products');
        // Finding all documents in the 'products' collection
        const findResult = await collection.find({}).toArray();
        console.log('Found documents =>', findResult); // Logging the found documents

        // Responding with the found documents as JSON
        return new Response(JSON.stringify(findResult), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        // Logging any errors that occur during the process
        console.error('Error connecting to MongoDB:', error);
        // Responding with an error message if fetching products fails
        return new Response(JSON.stringify({ error: 'Failed to fetch products' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } finally {
        // Closing the connection to the database
        await client.close();
    }
}
