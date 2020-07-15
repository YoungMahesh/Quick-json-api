import Head from 'next/head'
import { useState } from "react"
import JSONAPICreation from '../components/3.json_api_creation'

export default function Home() {
   const [currentForm, setCurrentForm] = useState<string>("jsonArr")

   const [objArrStr, updateObjArrStr] = useState<string>("")
   const [message1, setMessage1] = useState<string>("")

   const [objArr, setObjArr] = useState<Array<Object>>([])

   const handleSubmit = async () => {
      try {
         const objArr1 = await JSON.parse(objArrStr)  // stringObj => normalObj  
         // we need to parse jsonArr1 as it already get stringified because of HTML-textArea area to get "pure object"

         setObjArr(objArr1)
         setCurrentForm("apiName")
      } catch (err) {
         setMessage1("Your JSON array structure is wrong")
      }
   }

   return (
      <>
         <Head>
            <title>Paste JSON</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>

         <div className="container">

            <form style={currentForm === "jsonArr" ? {} : { display: "none" }}>
               <label>Paste JSON array: </label>
               <textarea
                  rows={25}
                  cols={50}
                  value={objArrStr}
                  onChange={e => updateObjArrStr(e.target.value)}
               />
               <input
                  type="button"
                  value="Submit"
                  onClick={e => handleSubmit()}
               />

               <h3> {message1} </h3>
            </form>

            <div style={currentForm === "apiName" ? {} : { display: "none" }}>
               <JSONAPICreation
                  objArr={objArr}
               />
            </div>

         </div>
      </>
   )
}
