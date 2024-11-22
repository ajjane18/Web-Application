export async function GET(req, res) {


    // Make a note we are on
  
    // the api. This goes to the console.
  
    console.log("in the acc/register api page")
  
    // get the values
  
    // that were sent across to us.
  
    const { searchParams } = new URL(req.url)
  
    const pname = searchParams.get('username')
  
  
    console.log(username);
  
  
   // =================================================
  
    const { MongoClient } = require('mongodb');
  
  
    const url = process.env.DB_ADDRESS
  
    const client = new MongoClient(url);
   
  
    const dbName = 'app'; // database name
  
    await client.connect();
  
    console.log('Connected successfully to server');
  
    const db = client.db(dbName);
  
    const collection = db.collection('login'); // collection name
  
    var myobj = { username: username, pass: pass};
  
    const insertResult = await collection.insertOne(myobj);
  
   //==========================================================
  
    // at the end of the process we need to send something back.
  
    return Response.json({ "data":"" + "inserted" + ""})
  
  }
  
  