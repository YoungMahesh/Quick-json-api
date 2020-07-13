import mongodb, { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URI, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
})

async function database(req, res, next) {
   if (!client.isConnected()) await client.connect()
   req.dbClient = client
   req.db = client.db('quick-json-api')
   return next()
}

export function convertToObjectId(id1) {
   return new mongodb.ObjectID(id1)
}

export default database