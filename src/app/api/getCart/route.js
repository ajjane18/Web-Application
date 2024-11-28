import { MongoClient } from 'mongodb';

export async function GET() {
  console.log("Fetching cart contents");

  const url = process.env.DB_ADDRESS;
  const client = new MongoClient(url);

  const dbName = 'app';
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('shopping_cart');

  const cartItems = await collection.find({}).toArray();

  return new Response(JSON.stringify({ items: cartItems }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
