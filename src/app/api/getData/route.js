// Importing a custom session management function
import { getCustomSession } from '../sessionCode.js';

// Exporting an asynchronous GET function to handle session information retrieval
export async function GET(req, res) {
  // Retrieving the current session
  let session = await getCustomSession();

  // Getting the user's role from the session
  let customersRole = session.role;
  // Logging the user's role to the console
  console.log(customersRole);

  // Getting the user's email from the session
  let email = session.email;
  // Logging the user's email to the console
  console.log(email);

  // Sending a 200 OK response with an empty JSON object
  res.status(200).json({});
}
