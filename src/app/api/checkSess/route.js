// Importing a custom session management function
import { getCustomSession } from '../sessionCode';

// Exporting an asynchronous GET function to handle session check requests
export async function GET(req) {
  try {
    // Retrieving the current session
    const session = await getCustomSession();

    // Checking if the session has a username (indicating a logged-in user)
    if (session.username) {
      // Logging the user's login status and role
      console.log('User is logged in:', { username: session.username, role: session.role });
      // Returning a response indicating the user is logged in, with their username and role
      return new Response(JSON.stringify({ loggedIn: true, username: session.username, role: session.role }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      // Logging that no user is currently logged in
      console.log('No user is logged in');
      // Returning a response indicating no user is logged in
      return new Response(JSON.stringify({ loggedIn: false }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    // Logging any errors that occur during the session check process
    console.log('Error occurred during session check:', error);
    // Returning a response indicating an internal server error
    return new Response('Internal Server Error', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}
