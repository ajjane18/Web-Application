// Importing the getIronSession function from the 'iron-session' package
import { getIronSession } from 'iron-session';
// Importing the cookies function from 'next/headers' to access cookies
import { cookies } from 'next/headers';

// Exporting an asynchronous function to get a custom session
export async function getCustomSession() {
  // Logging a message to indicate the function is running
  console.log("loading session stuff");

  // Defining the password for the session
  let pw = "VIi8pH38vD8ZLgEZclSa7an3olx4pkh6pvBj9fGZf";

  // Creating a session using the getIronSession function with cookies and session configuration
  const session = await getIronSession(await cookies(), { password: pw, cookieName: "app" });

  // Returning the created session
  return session;
}
