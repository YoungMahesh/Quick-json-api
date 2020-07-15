import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from "next-connect"
import mongodbConnection, { convertToObjectId } from '../../middleware/mongodb'
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

handler.get(async (req: reqWithMongo, res) => {
   try {    // "res.statusMessage" does not work on vercel hosting
      let doc = await req.db.collection("aaa111").findOne({ apiName: req.query.mongodb })
      res.status(200).json(doc.jsonArr)
   } catch (err) {
      res.status(400).end("apiName not used")
   }
})

handler.post(async (req: reqWithMongo, res) => {
   try {
      let dataObj = await JSON.parse(req.body)  // {apiName: xyz, arr1: [{}]}
      dataObj.jsonArr = dataObj.jsonArr.map((el: jsonObj) => {
         if (el._id) el._id = convertToObjectId(el._id)
         return el
      }) // _id should "ObjectId" else it will cause problems during "findByIdAndDelete()"
      const doc = await req.db.collection("aaa111").insertOne(dataObj)
      console.log(doc.ops)
      res.status(210)
   } catch (err) {
      console.log(err)
      res.status(220)
   }
   res.end()
})


export default handler