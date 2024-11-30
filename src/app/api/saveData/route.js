import { getCustomSession } from '../sessionCode';

export async function POST(req) {
  try {
    const { searchParams } = new URL(req.url);
    const role = searchParams.get('role');
    const username = searchParams.get('username');

    console.log("Role:", role);
    console.log("Username:", username);

    let session = await getCustomSession();
    session.role = role;
    session.username = username;

    await session.save();

    console.log('Session data saved:', { role: session.role, username: session.username });
    return new Response('Success', {
      status: 200,
      headers: { 'Content-Type': 'text/plain' }
    });
  } catch (error) {
    console.error('Error saving session data:', error);
    return new Response('Internal Server Error', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}
