// Importing a custom session management function
import { getCustomSession } from '../sessionCode';

// Exporting an asynchronous POST function to handle session updates
export async function POST(req) {
  try {
    // Parsing the search parameters from the request URL
    const { searchParams } = new URL(req.url);
    const role = searchParams.get('role'); // Getting the 'role' parameter
    const username = searchParams.get('username'); // Getting the 'username' parameter

    // Logging the role and username to the console
    console.log("Role:", role);
    console.log("Username:", username);

    // Retrieving the current session
    let session = await getCustomSession();
    // Updating the session with the role and username from the request
    session.role = role;
    session.username = username;

    // Saving the updated session
    await session.save();

    // Logging the saved session data to the console
    console.log('Session data saved:', { role: session.role, username: session.username });
    // Returning a success response
    return new Response('Success', {
      status: 200,
      headers: { 'Content-Type': 'text/plain' }
    });
  } catch (error) {
    // Logging any errors that occur during the process
    console.error('Error saving session data:', error);
    // Returning an internal server error response
    return new Response('Internal Server Error', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}
