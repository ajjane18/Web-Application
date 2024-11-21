// src/app/api/getProducts/route.js
import { MongoClient } from 'mongodb';

export async function GET(req, res) {
    console.log("in the API page");

    const url = process.env.DB_ADDRESS
    const client = new MongoClient(url);
    const dbName = 'app'; // Database name

    try {
        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = db.collection('products'); // Collection name
        const findResult = await collection.find({}).toArray();
        console.log('Found documents =>', findResult);

        // Respond with the found documents
        return new Response(JSON.stringify(findResult), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch products' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } finally {
        await client.close();
    }
}
