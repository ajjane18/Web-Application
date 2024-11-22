export async function GET(req, res) {
  
    const { searchParams } = new URL(req.url)
  
    const pname = searchParams.get('username')
  
    console.log(username);
  
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
  
    return Response.json({ "data":"" + "inserted" + ""})
  
  }
  
  