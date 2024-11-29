import { getCustomSession } from '../sessionCode';

export async function POST(req, res) {
  let session = await getCustomSession();

  const { role, username } = req.body;
  session.role = role;
  session.username = username;

  await session.save();

  console.log('data saved');
  res.status(200).json({});
}
