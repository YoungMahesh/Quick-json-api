import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import mongodbConnection, { convertToObjectId } from '../../backend/mongodb'
import corsMiddleware from '../../middleware/cors'


interface reqWithMongo extends NextApiRequest {
   db: any
}

const handler = nextConnect<NextApiRequest, NextApiResponse>()
handler.use(mongodbConnection)
handler.use(corsMiddleware)


// RESPONSE =>    200(OK)     400(Problem)
handler.get(async (req: reqWithMongo, res) => {
   console.log("GET request: executed with query ", req.query)

   try {
      let doc = await req.db.collection(process.env.MONGODB_COLLECTION).findOne({ apiName: req.query.mongodb })
      if (doc === null) {
         console.log("GET request: Document no found.")
         res.status(400).end("API-Name not in use")
      } else {
         console.log("GET request: Fullfilled")
         res.status(200).json(doc.jsonArr)
      }
   } catch (err) {
      console.log("GET request: Problem in server \n", err)
      res.status(400).end("Problem with server")
   }
})


// RESPONSE =>    210(Created, Updated)      500(problem)
handler.post(async (req: reqWithMongo, res) => {
   console.log("POST request: executed with query ", req.query)

   try {
      // dataObj => {apiName: xyz, password: xyz, jsonArr: [{}]}
      let dataObj = await JSON.parse(req.body)
      // no schema is specified, hence once parsed any {key: value} combination will be stored
      const doc = await req.db.collection(process.env.MONGODB_COLLECTION).insertOne(dataObj)
      console.log("POST request: Created\n", doc.ops)
      res.status(210).json({ "key": doc.ops[0]._id })
   } catch (err) {
      console.log("POST request: Problem with Server \n", err)
      res.status(500).end()
   }
})

// res => 210(updated)
handler.patch(async (req: reqWithMongo, res) => {
   console.log("PATCH request: executed")

   try {
      // dataObj => {apiName: xyz, password: xyz, arr1: [{}, {}, {}]}
      const dataObj = await JSON.parse(req.body)

      const key1 = convertToObjectId(dataObj.apiKey)
      const doc1 = await req.db.collection(process.env.MONGODB_COLLECTION).findOneAndUpdate({ apiName: dataObj.apiName, _id: key1 }, { $set: { jsonArr: dataObj.arr1 } }, { returnOriginal: false })
      // if found, doc2.value: {apiName: xyz, password: xyz, jsonArr:[{}, {}]}
      // if not found, doc2.value: null
      if (doc1.value === null) {
         console.log("PATCH request: Document not found")
         res.status(400).end()
      }

      console.log("PATCH reqest: Document Updated\n", doc1.value)
      res.status(210).end()

   } catch (err) {
      console.log("PATCH request : Problem with Server \n", err)
      res.status(500).end()
   }
})

// res => 200(deleted)
handler.delete(async (req: reqWithMongo, res) => {
   console.log("DELETE request: executed")

   try {
      // dataObj = {apiName, xyz, password: xyz}
      const dataObj = JSON.parse(req.body)

      const key1 = convertToObjectId(dataObj.apiKey)
      const doc2 = await req.db.collection(process.env.MONGODB_COLLECTION).findOneAndDelete({ apiName: dataObj.apiName, _id: key1 })
      // if deleted, doc2.value: {apiName, _id, jsonArr}
      // if notDeleted, doc2.value = null
      if (doc2.value === null) {
         console.log("DELETE request: Document not found\n", doc2)
         return res.status(400).end()
      }
      console.log("DELETE request: Fullfilled\n", doc2.value)
      res.status(200).end()
   } catch (err) {
      console.log("DELETE request: Problem with Server\n", err)
      res.status(500).end()
   }
})


export default handler