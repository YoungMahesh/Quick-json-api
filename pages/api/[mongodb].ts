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

interface jsonArr {
   _id: string
}

// const path1 = req.query.mongodb

handler.get(async (req: reqWithMongo, res) => {
   let doc = await req.db.collection(req.query.mongodb).find({}).toArray()
   res.json(doc)
})

handler.post(async (req: reqWithMongo, res) => {
   try {
      let dataObj = await JSON.parse(req.body)
      const apiName = dataObj.apiName
      let arr1 = dataObj.jsonArr
      arr1 = arr1.map((el: jsonArr) => {
         if (el._id) el._id = convertToObjectId(el._id)
         return el
      }) // _id should "ObjectId" else it will cause problems during "findByIdAndDelete()"
      const doc = await req.db.collection(apiName).insertMany(arr1)
      console.log(doc.ops)
      res.status(210)
   } catch (err) {
      console.log(err)
      res.status(220)
   }
   res.end()
})


export default handler