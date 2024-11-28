import { MongoClient } from 'mongodb';
import { getCustomSession } from '../sessionCode.js';

export async function GET(req) {
  try {
    console.log("in the putInCart API page");

    const { searchParams } = new URL(req.url);
    const prodN = searchParams.get('prodN');
    console.log(prodN);

    const url = process.env.DB_ADDRESS;
    const client = new MongoClient(url);

    const dbName = 'app';
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);

    // Fetch product details from products collection
    const productsCollection = db.collection('products');
    const product = await productsCollection.findOne({ prodN: prodN });

    // Retrieve the session and get the username
    let session = await getCustomSession();
    const username = session.email || 'defaultUser'; // Use email or any other session attribute for username

    if (product) {
      const shoppingCartCollection = db.collection('shopping_cart');
      const myobj = {
        prodN: product.prodN,
        prodP: product.prodP, 
        imageUrl: product.imageUrl,
        username: username
      };
      const insertResult = await shoppingCartCollection.insertOne(myobj);
      console.log(insertResult);
    } else {
      console.log("Product not found");
    }

    await client.close(); // Ensure the client is closed

    return new Response(JSON.stringify({ data: "inserted" }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Error occurred: ", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
