import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import mongodbConnection from '../../backend/mongodb'
import corsMiddleware from '../../middleware/cors'

const handler = nextConnect<NextApiRequest, NextApiResponse>()
handler.use(mongodbConnection)
handler.use(corsMiddleware)

interface reqWithMongo extends NextApiRequest {
   db: any
}

interface jsonObj {
   _id: string
}

// RESPONSE =>    200(OK)     400(Problem)
handler.get(async (req: reqWithMongo, res) => {
   console.log("GET request: executed with query ", req.query)

   if (req.query.password) {
      console.log("GET Request for password check: executed")
      try {
         let doc = await req.db.collection("aaa111").findOne({ apiName: req.query.mongodb, password: req.query.password })
         if (doc === null) {
            console.log("GET request for password check: Password doesn't match")
            res.status(400).end()
         } else {
            console.log("GET request for password check: Fullfilled")
            res.status(200).json(doc.jsonArr)
         }
      } catch (err) {
         console.log("GET request for password check: Problem in server\n", err)
         res.status(400).end()
      }

   } else {
      console.log("GET request: executed")
      try {
         let doc = await req.db.collection("aaa111").findOne({ apiName: req.query.mongodb })
         if (doc === null) {
            console.log("GET request: API-Name is not in use.")
            res.status(400).end("API-Name not in use")
         } else {
            console.log("GET request: Fullfilled")
            res.status(200).json(doc.jsonArr)
         }
      } catch (err) {
         console.log("GET request: Problem in server \n", err)
         res.status(400).end("Problem with server")
      }
   }
})


// RESPONSE =>    210(Created, Updated)      500(problem)
handler.post(async (req: reqWithMongo, res) => {
   console.log("POST request: executed with query ", req.query)

   if (req.query.mission === "add") {
      console.log("POST request for New: executed")
      try {
         // dataObj => {apiName: xyz, password: xyz, jsonArr: [{}]}
         let dataObj = await JSON.parse(req.body)

         // no schema is specified, hence once parsed any {key: value} combination will be stored
         const doc = await req.db.collection("aaa111").insertOne(dataObj)
         console.log("POST request for New: Created\n", doc.ops)
         res.status(210).end()
      } catch (err) {
         console.log("POST request for New: Problem with Server \n", err)
         res.status(500).end()
      }

   } else if (req.query.mission === "update") {
      console.log("POST request for Update: executed")
      try {
         // obj1 => {apiName: xyz, password: xyz, arr1: [{}, {}, {}]}
         const obj1 = await JSON.parse(req.body)

         const doc = await req.db.collection("aaa111").findOneAndUpdate({ apiName: obj1.apiName, password: obj1.password }, { $set: { jsonArr: obj1.arr1 } })
         if (doc.value === null) {
            console.log("POST request for Update: Failed")
            res.status(500).end()
         } else {
            console.log("POST request for Update: Updated\n", doc.value)
            res.status(210).end()
         }
      } catch (err) {
         console.log("POST request for Update: Problem with Server \n", err)
         res.status(500).end()
      }

   } else {
      console.log("POST request executed without query")
      res.status(500).end()
   }
})


export default handler