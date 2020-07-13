import mongodbMiddleware from '../../middleware/mongodb'
import nextConnect from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import { checkValidity } from '../../middleware/valid_name'

const handler = nextConnect()
handler.use(mongodbMiddleware)

interface reqWithMong extends NextApiRequest {
   db: any
}

handler.post(async (req: reqWithMong, res: NextApiResponse) => {

   // STEP1 => parse name
   const { apiName } = await JSON.parse(req.body)

   // STEP2 => check name validity
   if (!(checkValidity(apiName))) {
      res.status(220).end()
      return
   }

   // STEP3 => check name availablility
   try {
      const res1 = await req.db.collection("api-names").findOne({ name: apiName })
      console.log("response from post request: ", res1)
      if (res1 === null) {     // value not found
         const res2 = await req.db.collection("api-names").insertOne({ name: apiName })
         console.log(res2.ops)
         res.status(210).end()
      } else {
         console.log("sorry value is already present")
         res.status(230).end()
      }
   } catch (err) {
      console.log("Check_name POST problem: ", err)
      res.status(510).end()
   }
})

export default handler