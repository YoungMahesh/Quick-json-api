import Head from 'next/head'
import { useState } from "react"
import DetermineObjKeys from '../components/1.determine_obj_keys'
import CreateArrOfObjects from '../components/2.create_array_of_obj'
import ApiNameAndPassword from '../components/3.apiName_and_password'
import { handleAPICreation } from '../backend/manageAPIdata'


const Create = () => {
   // display one form at a time
   const [currentForm, setCurrentForm] = useState<string>("objKeys")
   const [message1, setMessage1] = useState<string>("")

   // determine object keys
   const [keysSet, setKeysSet] = useState<Set<string>>(new Set())
   const [keysArr, setKeysArr] = useState<Array<string>>([])

   // crete object array
   const [objArr, setObjArr] = useState<Array<Object>>([])
   const [apiName, setApiName] = useState<string>("")
   const [password, setPassword] = useState<string>("")


   return (
      <>
         <Head>
            <title>Create JSON</title>
         </Head>

         <div className="container">

            {/* Form1 => Get JSON_Object_Schema from the User */}
            <div style={currentForm === "objKeys" ? {} : { display: "none" }}>
               <DetermineObjKeys
                  setCurrentForm={setCurrentForm}
                  keysArr={keysArr}
                  setKeysArr={setKeysArr}
                  keysSet={keysSet}
                  setKeysSet={setKeysSet}
               />
            </div>

            {/* Form2 => Create "Array of Objects" */}
            <div style={currentForm === "objArr" ? {} : { display: "none" }}>
               <CreateArrOfObjects
                  setMessage1={setMessage1}
                  setCurrentForm={setCurrentForm}
                  objArr={objArr}
                  setObjArr={setObjArr}
                  keysArr={keysArr}
                  editForm={false}
               />
            </div>


            {/* Form3 => Get Name for "JSON-API" */}
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

            <h3>{message1}</h3>
         </div>
      </>
   )
}

export default Create