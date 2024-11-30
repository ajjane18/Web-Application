import { MongoClient } from 'mongodb';
import { getCustomSession } from '../../sessionCode';

const User = {
  async findOne({ username, pass }) {
    const url = process.env.DB_ADDRESS;
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db('app');
    const user = await db.collection('login').findOne({username, pass });
    await client.close();
    return user;
  }
};

export async function POST(req) {
  try {
    // Retrieve search parameters from the URL
    const { searchParams } = new URL(req.url);
    const username = searchParams.get('username');
    const pass = searchParams.get('pass');
    const acc_type = searchParams.get('acc_type');

    console.log("Username:", username);
    console.log("Password:", pass);
    console.log("acc_type:", acc_type);


    const user = await User.findOne({ username, pass, acc_type});

    if (!user) {
      console.log("User not found:", { username, pass, acc_type});
      return new Response('User not found', {
        status: 404,
        headers: { 'Content-Type': 'text/plain' }
      });
    }

    console.log("User found:", user);

    const session = await getCustomSession();
    session.username = username;
    session.role = user.acc_type;
    await session.save();

    console.log("Session data saved:", { role: session.role, username: session.username });
    return new Response('Success', {
      status: 200,
      headers: { 'Content-Type': 'text/plain' }
    });
  } catch (error) {
    console.error('Error occurred during login:', error);
    return new Response('Internal Server Error', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}
