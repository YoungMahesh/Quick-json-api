import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import mongodbConnection from '../../backend/mongodb'
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
      let doc = await req.db.collection("aaa111").findOne({ apiName: req.query.mongodb })
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
      const doc = await req.db.collection("aaa111").insertOne(dataObj)
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
      const doc = await req.db.collection("aaa111").findOneAndUpdate({ apiName: dataObj.apiName, password: dataObj.password }, { $set: { jsonArr: dataObj.arr1 } })
      if (doc.value === null) {
         console.log("PATCH request: Document not found")
         res.status(500).end()
      } else {
         console.log("PATCH request: Updated\n", doc.value)
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
      const dataObj = JSON.parse(req.body)
      const doc = await req.db.collection("aaa111").findOneAndDelete({ apiName: dataObj.apiName, password: dataObj.password })
      if (doc.value === null) {
         console.log("DELETE request: Document not found")
         res.status(400).end()
      } else {
         console.log("DELETE request: Fullfilled")
         res.status(200).end()
      }

   } catch (err) {
      console.log("DELETE request: Problem with Server\n", err)
      res.status(500).end()
   }
})


export default handler