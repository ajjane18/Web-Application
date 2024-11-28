import { MongoClient } from 'mongodb';
import { getCustomSession } from '../sessionCode.js';

// Handler for GET requests to place an order
export async function GET(req, res) {
  try {
    const url = process.env.DB_ADDRESS;  // Database address from environment variables
    if (!url) throw new Error('Database address not found in environment variables');
    console.log('Connecting to database at:', url);

    const client = new MongoClient(url);
    const dbName = 'app';
    await client.connect();  // Connect to the database
    console.log('Successfully connected to the database');
    const db = client.db(dbName);

    // Retrieve the session and get the username
    let session = await getCustomSession();
    console.log('Session details:', session);
    if (!session) throw new Error('Failed to retrieve session');

    const username = session.email || 'defaultUser';
    console.log('Username:', username);

    const shoppingCartCollection = db.collection('shopping_cart');
    const ordersCollection = db.collection('orders');

    // Get items from the shopping cart
    const cartItems = await shoppingCartCollection.find({ username: username }).toArray();
    console.log('Cart items retrieved:', cartItems);

    if (cartItems.length > 0) {
      // Calculate total price and prepare order details
      const totalPrice = cartItems.reduce((sum, item) => sum + parseFloat(item.prodP), 0);
      const productDetails = cartItems.map(item => ({
        prodN: item.prodN,
        prodP: item.prodP,
        imageUrl: item.imageUrl,
        objectId: item._id
      }));

      // Create order object with purchase date
      const order = {
        items: productDetails,
        totalPrice: totalPrice,
        username: username,
        purchaseDate: new Date(),  // Store the purchase date
      };

      // Insert the order into the orders collection
      const insertResult = await ordersCollection.insertOne(order);
      console.log('Order insertion result:', insertResult);

      // Clear the user's shopping cart
      const deleteResult = await shoppingCartCollection.deleteMany({ username: username });
      console.log('Cart items deletion result:', deleteResult);

      await client.close();
      return res.status.json({ data: "Order placed successfully" });
    } else {
      await client.close();
      return res.status.json({ error: "Shopping cart is empty" });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status.json({ error: "Internal Server Error", details: error.stack });
  }
}
