import Head from 'next/head'
import { useState } from "react"
import ApiNameAndPassword from '../components/3.apiName_and_password'
import { handleAPICreation } from '../backend/manageAPIdata'


export default function Home() {
   const [currentForm, setCurrentForm] = useState<string>("jsonArr")
   const [message1, setMessage1] = useState<string>("")

   const [objArrStr, setObjArrStr] = useState<string>("")

   const [objArr, setObjArr] = useState<Array<Object>>([])
   const [apiName, setApiName] = useState<string>("")
   const [password, setPassword] = useState<string>("")

   const handleSubmit = async () => {
      try {
         setMessage1("")
         const objArr1 = await JSON.parse(objArrStr)  // stringObj => normalObj  
         // we need to parse jsonArr1 as it already get stringified because of HTML-textArea area to get "pure object"

         setObjArr(objArr1)
         setObjArrStr("")           // clear textArea
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

            {/*        Form1 => Paste JSON array           */}
            <form style={currentForm === "jsonArr" ? {} : { display: "none" }}>
               <label>Paste JSON array: </label>
               <textarea
                  rows={25}
                  cols={50}
                  value={objArrStr}
                  onChange={e => setObjArrStr(e.target.value)}
               />
               <input
                  type="button"
                  value="Submit"
                  onClick={e => handleSubmit()}
               />
            </form>


            {/*         Form2 => Get Name for "JSON-API"             */}
            <div style={currentForm === "apiName" ? {} : { display: "none" }}>
               <ApiNameAndPassword
                  apiName={apiName}
                  setApiName={setApiName}
                  password={password}
                  setPassword={setPassword}
               />

               <input
                  type="button"
                  value="Submit"
                  onClick={e => handleAPICreation(objArr, apiName, password, setMessage1)}
               />
            </div>

            <h3> {message1} </h3>
         </div>
      </>
   )
}
