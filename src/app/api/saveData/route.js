import { getCustomSession } from '../sessionCode.js'


export async function GET(req, res) {


  let session = await getCustomSession()

  session.role = 'customer'

  session.email = 'mymail@mail.com'

  await session.save()

  console.log('data saved');

  return Response.json({})

}

