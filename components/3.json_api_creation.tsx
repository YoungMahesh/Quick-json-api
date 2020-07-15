import { useState } from "react"
import Router from 'next/router'
import { checkValidity } from '../middleware/valid_name'

interface ListProps {
   objArr: Array<Object>
}

const JSONAPICreation = ({ objArr }: ListProps) => {

   const [apiName, setApiName] = useState<string>("")
   const [message1, setMessage1] = useState<string>("")


   const handleCreateAPI = async () => {
      if (checkValidity(apiName)) {
         setMessage1("")

         setMessage1("Loading...")
         const res1 = await fetch(`${process.env.BASE_URL}/api/${apiName}`)

         if (res1.status === 400) {
            const post2 = {
               apiName: apiName,
               jsonArr: objArr
            }
            const res2 = await fetch(`${process.env.BASE_URL}/api/${apiName}`, {
               method: "post",
               body: JSON.stringify(post2)
            })
            if (res2.status === 210) {
               Router.push(`/api/${apiName}`)
            } else {
               setMessage1("problem in creating API")
            }
         } else if (res1.status === 200) {
            setMessage1("This name is already in use, try another")
         } else {
            setMessage1("Problem in JSON-API")
         }
      } else {
         setMessage1(`Name should have more than 3 characters which can only contain "[A-Z, a-z, 0-9, -, _]"`)
      }
   }

   return (
      <div>
         <label>
            API-Name:
         </label>
         <input
            type="text"
            value={apiName}
            onChange={e => setApiName(e.target.value)}
         />

         <input
            type="button"
            value="Submit"
            onClick={handleCreateAPI}
         />

         <p>{message1}</p>
      </div>
   )
}

export default JSONAPICreation