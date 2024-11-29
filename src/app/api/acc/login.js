import { MongoClient } from 'mongodb';
import { getCustomSession } from '../sessionCode';

const User = {
  async findOne({ username, pass }) {
    const url = process.env.DB_ADDRESS;
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db('app');
    const user = await db.collection('login').findOne({ username: username, pass: pass });
    await client.close();
    return user;
  }
};

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    const { username, pass } = req.body;
    const user = await User.findOne({ username, pass });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Set session data
    const session = await getCustomSession();
    session.username = username;
    session.role = user.acc_type;
    await session.save();

    res.status(200).json({ role: user.acc_type });
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ message: 'Internal Server Error', details: error.message });
  }
}
