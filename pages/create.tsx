import Head from 'next/head'
import { useState, useEffect } from "react"
import { checkValidity } from '../middleware/valid_name'
import Router from "next/router"

// Need to showcase array of objects while building

const Create = () => {
   const [currentKey, setCurrentKey] = useState<string>("")
   const [keysSet, setKeysSet] = useState<Set<string>>(new Set())
   const [keysArr, setKeysArr] = useState<Array<string>>([])
   console.log(keysArr)
   const [showForm1, setShowForm1] = useState<boolean>(true)

   const [showForm2, setShowForm2] = useState<boolean>(false)
   const [currObj, setCurrObj] = useState<Record<string, string>>({})
   const [objArr1, setObjArr1] = useState<Array<Object>>([])

   const [showForm3, setShowForm3] = useState<boolean>(false)
   const [apiName, updateAPIName] = useState<string>("")
   const [apiNameNotValidMsg, setapiNameNotValidMsg] = useState<boolean>(false)
   const [apiNameNotAvailableMsg, setapiNameNotAvailableMsg] = useState<boolean>(false)
   const [showLoading1, setShowLoading1] = useState<boolean>(false)

   useEffect(() => {
      console.log(currObj)
      console.log(objArr1)
   }, [currObj, objArr1])

   const handleKeyInput = () => {
      if (!(currentKey.length === 0 || keysSet.has(currentKey))) {
         setKeysSet(keysSet.add(currentKey))
         setKeysArr([...keysArr, currentKey])
         setCurrentKey("")
      }
   }

   const handleSubmitForm1 = () => {
      if (keysArr.length) {
         setShowForm1(false)
         setShowForm2(true)
      }
   }


   const handleObjCreation = (key1: string, value1: string) => {
      setCurrObj({ ...currObj, [`${key1}`]: value1 })
   }

   const handleAddCurrObj = async () => {
      setObjArr1([...objArr1, currObj])
   }

   const handleGetAPIName = () => {
      setShowForm2(false)
      setShowForm3(true)
   }

   const handleCreateAPI = async () => {
      if (checkValidity(apiName)) {
         setapiNameNotValidMsg(false)
         const post1 = {
            apiName: apiName
         }
         setShowLoading1(true)
         const res1 = await fetch(`${process.env.BASE_URL}/api/check_name`, {
            method: "post",
            body: JSON.stringify(post1)
         })
         setShowLoading1(false)
         if (res1.status === 210) {
            createJSONAPI()
         } else {
            setapiNameNotAvailableMsg(true)
         }
      } else {
         setapiNameNotValidMsg(true)
      }
   }

   const createJSONAPI = async () => {
      setShowLoading1(true)
      const post2 = {
         apiName: apiName,
         jsonArr: objArr1
      }
      setShowLoading1(true)
      const res2 = await fetch(`${process.env.BASE_URL}/api/${apiName}`, {
         method: "post",
         body: JSON.stringify(post2)
      })
      setShowLoading1(false)
      if (res2.status === 210) {
         Router.push(`/api/${apiName}`)
      } else {
         console.log(res2.status)
      }
   }

   return (
      <>
         <Head>
            <title>Create JSON</title>
         </Head>

         <div className="container">

            {/* Form1 => Get JSON_Object_Schema from the User */}
            <div style={showForm1 ? {} : { display: "none" }}>
               <h2>Determine API Keys</h2>
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
            <div style={showForm2 ? {} : { display: "none" }}>
               <form>
                  {
                     keysArr.map(el =>
                        <label key={el}>
                           {`${el}: `}
                           <input
                              type="text"
                              onChange={e => handleObjCreation(el, e.target.value)}
                           />
                        </label>
                     )
                  }
               </form>
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
            </div>


            {/* Form3 => Get Name for "JSON-API" */}
            <div style={showForm3 ? {} : { display: "none" }}>
               <form>
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

               <p style={apiNameNotValidMsg ? {} : { display: "none" }}>
                  Name should have more than 3 characters which can only contain "[A-Z, a-z, 0-9, -, _]"
            </p>

               <p style={apiNameNotAvailableMsg ? {} : { display: "none" }}>
                  This name is already in use, try another
            </p>

               <h4 style={showLoading1 ? {} : { display: "none" }}>
                  Loading...
            </h4>
            </div>
         </div>
      </>
   )
}

export default Create