import { MongoClient } from 'mongodb';

export async function GET(req, res) {
  console.log("in the putInCart api page");

  const { searchParams } = new URL(req.url);
  const pname = searchParams.get('pname');
  console.log(pname);

  const url = process.env.DB_ADDRESS;
  const client = new MongoClient(url);

  const dbName = 'app';
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('shopping_cart');

  var myobj = { pname: pname, username: 'defaultUser' };
  const insertResult = await collection.insertOne(myobj);

  return new Response(JSON.stringify({ data: "inserted" }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
