// Importing a custom session management function
import { getCustomSession } from '../../sessionCode';

// Exporting an asynchronous POST function to handle logout requests
export async function POST(req) {
  try {
    // Retrieving the current session
    const session = await getCustomSession();
    // Destroying the session to log the user out
    session.destroy();

    // Logging the success and returning a success response
    console.log('Session destroyed');
    return new Response('Logged out successfully', {
      status: 200,
      headers: { 'Content-Type': 'text/plain' }
    });
  } catch (error) {
    // Logging any errors that occur during the logout process
    console.log('Error occurred during logout:', error);
    return new Response('Internal Server Error', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}
