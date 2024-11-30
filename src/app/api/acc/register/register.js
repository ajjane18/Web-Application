import { MongoClient } from 'mongodb';

export async function POST(req) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get('username');
    const pass = searchParams.get('pass'); // Assuming pass is also a query parameter

    console.log("Username:", username);
    console.log("Password:", pass);

    const url = process.env.DB_ADDRESS;
    const client = new MongoClient(url);
    const dbName = 'app'; // Database name

    await client.connect();
    console.log('Connected successfully to server');

    const db = client.db(dbName);
    const collection = db.collection('login'); // Collection name

    const myobj = { username: username, pass: pass };
    const insertResult = await collection.insertOne(myobj);

    console.log("Insert result:", insertResult);
    console.log("Data inserted successfully:", myobj);
  } catch (error) {
    console.error('Error occurred:', error);
  } finally {
    await client.close();
    console.log('Database client closed successfully.');
  }
}
