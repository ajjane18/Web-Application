import { MongoClient } from 'mongodb';
import validator from 'validator';
import bcrypt from 'bcryptjs';
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
  },
  async insertOne({ username, pass }) {
    const url = process.env.DB_ADDRESS;
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db('app');
    const hashedPass = bcrypt.hashSync(pass, 10);
    const result = await db.collection('login').insertOne({ username, pass: hashedPass, acc_type: 'customer' });
    await client.close();
    return result;
  }
};

export async function POST(req) {
  try {
    const { username, pass } = await req.json();

    if (!username || !pass) {
      return new Response(JSON.stringify({ status: 'error', message: 'Username and password are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const sanitizedUsername = validator.escape(validator.trim(username));
    const sanitizedPass = validator.escape(validator.trim(pass));

    if (!validator.isEmail(sanitizedUsername) || sanitizedPass.length < 6) {
      return new Response(JSON.stringify({ status: 'error', message: 'Invalid email or password format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const existingUser = await User.findOne({ username: sanitizedUsername });

    if (existingUser) {
      return new Response(JSON.stringify({ status: 'exists', message: 'Username already taken' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await User.insertOne({ username: sanitizedUsername, pass: sanitizedPass });

    const session = await getCustomSession();
    session.username = sanitizedUsername;
    session.role = 'customer';
    await session.save();

    return new Response(JSON.stringify({ status: 'registered', message: 'User registered successfully', redirect: '/' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response('Internal Server Error', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}
