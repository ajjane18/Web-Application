import { MongoClient } from 'mongodb';

export async function GET(req) {
  console.log("in the putInCart API page");

  const { searchParams } = new URL(req.url);
  const prodN = searchParams.get('prodN');
  const prodP = parseFloat(searchParams.get('prodP')); // Parse price as float
  console.log(prodN);
  console.log(prodP);

  const url = process.env.DB_ADDRESS;
  const client = new MongoClient(url);

  const dbName = 'app';
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('shopping_cart');

  const myobj = { prodN: prodN, prodP: prodP, username: '' }; // Include prodP in the document
  const insertResult = await collection.insertOne(myobj);

  await client.close(); // Ensure the client is closed

  return new Response(JSON.stringify({ data: "inserted" }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
