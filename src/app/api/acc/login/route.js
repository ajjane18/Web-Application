import { MongoClient } from 'mongodb';
import emailValidator from 'email-validator';
import { getCustomSession } from '../../sessionCode';

const User = {
  async findOne({ username }) {
    const url = process.env.DB_ADDRESS;
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db('app');
    const user = await db.collection('login').findOne({ username });
    await client.close();
    return user;
  }
};

export async function POST(req) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get('username');
    const pass = searchParams.get('pass');

    if (!username || !pass) {
      return new Response('Username and password are required', {
        status: 400,
        headers: { 'Content-Type': 'text/plain' }
      });
    }

    // Validate and sanitize inputs
    const sanitizedUsername = username.trim();
    const sanitizedPass = pass.trim();

    if (!emailValidator.validate(sanitizedUsername)) {
      return new Response('Invalid email format', {
        status: 400,
        headers: { 'Content-Type': 'text/plain' }
      });
    }

    const user = await User.findOne({ username: sanitizedUsername });

    if (!user) {
      console.log('User not found:', sanitizedUsername);
      return new Response('User not found', {
        status: 404,
        headers: { 'Content-Type': 'text/plain' }
      });
    }

    // Skip password verification and directly create a session
    const session = await getCustomSession();
    session.username = sanitizedUsername;
    session.role = user.acc_type;
    await session.save();

    // Logging the success and returning the user role as JSON
    console.log('User found and session created:', { username: sanitizedUsername, role: session.role });
    return new Response(JSON.stringify({ role: user.acc_type }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.log('Error occurred during login:', error);
    return new Response('Internal Server Error', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}
