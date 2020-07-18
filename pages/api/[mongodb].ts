import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import mongodbConnection from '../../backend/mongodb'
import corsMiddleware from '../../middleware/cors'
import bcrypt from 'bcrypt'
const saltRounds = 7

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
      dataObj.password = await bcrypt.hash(dataObj.password, saltRounds)
      // no schema is specified, hence once parsed any {key: value} combination will be stored
      const doc = await req.db.collection(process.env.MONGODB_COLLECTION).insertOne(dataObj)
      console.log("POST request: Created\n", doc.ops)
      res.status(210).end()
   } catch (err) {
      console.log("POST request: Problem with Server \n", err)
      res.status(500).end()
   }
})


handler.patch(async (req: reqWithMongo, res) => {
   console.log("PATCH request: executed")

   try {
      // dataObj => {apiName: xyz, password: xyz, arr1: [{}, {}, {}]}
      const dataObj = await JSON.parse(req.body)
      const doc1 = await req.db.collection(process.env.MONGODB_COLLECTION).findOne({ apiName: dataObj.apiName })
      // doc1: {apiName: xyz, password: xyz, jsonArr:[{}, {}]}
      console.log("PATCH request: Document Found\n")    // already tested on first page of "edit.tsx"
      const isPassword = await bcrypt.compare(dataObj.password, doc1.password)
      if (!isPassword) {
         console.log("PATCH request: Password is wrong")
         return res.status(400).end()
      }

      const doc2 = await req.db.collection(process.env.MONGODB_COLLECTION).findOneAndUpdate({ apiName: dataObj.apiName }, { $set: { jsonArr: dataObj.arr1 } })
      // if found, doc2.value: {apiName: xyz, password: xyz, jsonArr:[{}, {}]}
      // if not found, doc2.value: null
      if (doc2.value !== null) {
         console.log("PATCH reqest: Document Updated")
         res.status(210).end()
      }
   } catch (err) {
      console.log("PATCH request : Problem with Server \n", err)
      res.status(500).end()
   }
})


handler.delete(async (req: reqWithMongo, res) => {
   console.log("DELETE request: executed")

   try {
      // dataObj = {apiName, xyz, password: xyz}
      const dataObj = JSON.parse(req.body)

      const doc1 = await req.db.collection(process.env.MONGODB_COLLECTION).findOne({ apiName: dataObj.apiName })
      // doc1 if found: {apiName: xyz, password: xyz, jsonArr: [{}, {}]}
      if (doc1 === null) {       // doc1 if notFound: null
         console.log("DELETE request: Document not found")
         return res.status(400).end()
      }

      const isPassword = await bcrypt.compare(dataObj.password, doc1.password)
      if (!isPassword) {
         console.log("DELETE request: Password is wrong")
         return res.status(400).end()
      }

      const doc2 = await req.db.collection(process.env.MONGODB_COLLECTION).findOneAndDelete({ apiName: dataObj.apiName })
      // if deleted, doc2.value: {apiName, password, jsonArr}
      // if notDeleted, if found definitely going to delete as there is only one parameter which is "apiName"
      if (doc2.value !== null) {
         console.log("DELETE request: Fullfilled")
         return res.status(200).end()
      }
   } catch (err) {
      console.log("DELETE request: Problem with Server\n", err)
      res.status(500).end()
   }
})


export default handler