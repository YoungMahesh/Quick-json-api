import Head from 'next/head'
import { useState } from "react"
import DetermineObjKeys from '../components/1.determine_obj_keys'
import CreateArrOfObjects from '../components/2.create_array_of_obj'
import JSONAPICreation from '../components/3.json_api_creation'


const Create = () => {
   // display one form at a time
   const [currentForm, setCurrentForm] = useState<string>("objKeys")

   // determine object keys
   const [keysSet, setKeysSet] = useState<Set<string>>(new Set())
   const [keysArr, setKeysArr] = useState<Array<string>>([])

   // crete object array
   const [objArr, setObjArr] = useState<Array<Object>>([])


   return (
      <>
         <Head>
            <title>Create JSON</title>
         </Head>

         <div className="container">

            {/* Form1 => Get JSON_Object_Schema from the User */}
            <DetermineObjKeys
               currentForm={currentForm}
               setCurrentForm={setCurrentForm}
               keysArr={keysArr}
               setKeysArr={setKeysArr}
               keysSet={keysSet}
               setKeysSet={setKeysSet}
            />

            {/* Form2 => Create "Array of Objects" */}
            <CreateArrOfObjects
               currentForm={currentForm}
               setCurrentForm={setCurrentForm}
               objArr={objArr}
               setObjArr={setObjArr}
               keysArr={keysArr}
               editForm={false}
            />


            {/* Form3 => Get Name for "JSON-API" */}
            <div style={currentForm === "apiName" ? {} : { display: "none" }}>
               <JSONAPICreation
                  objArr={objArr}
               />
            </div>

         </div>
      </>
   )
}

export default Create