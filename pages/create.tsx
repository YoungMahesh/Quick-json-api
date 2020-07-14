import Head from 'next/head'
import { useState, useEffect } from "react"
import { checkValidity } from '../middleware/valid_name'
import Router from "next/router"


const Create = () => {
   // display one form at a time
   const [currentForm, setCurrentForm] = useState<string>("objKeys")

   // determine object keys
   const [currentKey, setCurrentKey] = useState<string>("")
   const [keysSet, setKeysSet] = useState<Set<string>>(new Set())
   const [keysArr, setKeysArr] = useState<Array<string>>([])

   // crete object array
   const [currObj, setCurrObj] = useState<Record<string, string>>({})
   const [objArr1, setObjArr1] = useState<Array<Object>>([])

   // create json-api
   const [apiName, updateAPIName] = useState<string>("")
   const [message1, setMessage1] = useState<string>("")

   // useEffect(() => {       // check results in console.log
   //    console.log(currObj)
   //    console.log(objArr1)
   // }, [currObj, objArr1])

   const handleKeyInput = () => {
      if (!(currentKey.length === 0 || keysSet.has(currentKey))) {
         setKeysSet(keysSet.add(currentKey))
         setKeysArr([...keysArr, currentKey])
         setCurrentKey("")
      }
   }

   const handleSubmitForm1 = () => {
      if (keysArr.length) {
         setCurrentForm("objArr")
      }
   }

   const handleObjCreation = (key1: string, value1: string) => {
      setCurrObj({ ...currObj, [`${key1}`]: value1 })
   }

   const handleAddCurrObj = async () => {
      setObjArr1([...objArr1, currObj])   // add currentObj to objArr

      // clear the input fields 
      const objKeys = document.getElementsByClassName("objKey") as HTMLCollectionOf<HTMLInputElement>
      for (let i = 0; i < objKeys.length; i++) objKeys[i].value = ""
   }

   const handleGetAPIName = () => {
      if (objArr1.length > 0) {
         setCurrentForm("apiName")
         setMessage1("")
      } else {
         setMessage1("Your object-array is empty")
      }
   }

   const handleCreateAPI = async () => {
      if (checkValidity(apiName)) {
         setMessage1("")

         setMessage1("Loading...")
         const res1 = await fetch(`${process.env.BASE_URL}/api/${apiName}`)

         if (res1.status === 400) {
            const post2 = {
               apiName: apiName,
               jsonArr: objArr1
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
      <>
         <Head>
            <title>Create JSON</title>
         </Head>

         <div className="container">

            {/* Form1 => Get JSON_Object_Schema from the User */}
            <div style={currentForm === "objKeys" ? {} : { display: "none" }}>
               <h2>Determine Key-Fields for Each Object</h2>
               {
                  keysArr.map(el => <p key={el}>{el}</p>)
               }
               <form>
                  <label>
                     Key:
               </label>
                  <input
                     type="text"
                     value={currentKey}
                     onChange={e => setCurrentKey(e.target.value)}
                  />
                  <input
                     type="button"
                     value="Add Key"
                     onClick={handleKeyInput}
                  />
                  <input
                     type="button"
                     value="Submit All Keys"
                     onClick={handleSubmitForm1}
                  />
               </form>
            </div>

            {/* Form2 => Create "Array of Objects" */}
            <div style={currentForm === "objArr" ? {} : { display: "none" }}>
               <div>
                  <pre>{JSON.stringify(objArr1, null, 4)}</pre>
               </div>

               <form>
                  {
                     keysArr.map(el =>
                        <label key={el}>
                           {`${el}: `}
                           <input
                              type="text"
                              className="objKey"
                              onChange={e => handleObjCreation(el, e.target.value)}
                           />
                        </label>
                     )
                  }
                  <input
                     type="button"
                     value="Submit this data"
                     onClick={handleAddCurrObj}
                  />
                  <input
                     type="button"
                     value="Create JSON API"
                     onClick={handleGetAPIName}
                  />
               </form>
            </div>


            {/* Form3 => Get Name for "JSON-API" */}
            <form style={currentForm === "apiName" ? {} : { display: "none" }}>
               <label>
                  API-Name:
               </label>
               <input
                  type="text"
                  value={apiName}
                  onChange={e => updateAPIName(e.target.value)}
               />
               <input
                  type="button"
                  value="Submit"
                  onClick={handleCreateAPI}
               />
            </form>

            <p>{message1}</p>
         </div>
      </>
   )
}

export default Create