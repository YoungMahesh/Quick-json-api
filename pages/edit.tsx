import { useState, useEffect } from "react"
import { checkValidity } from '../middleware/valid_name'
import CreateArrOfObjects from "../components/2.create_array_of_obj"
import Router from "next/router"

const EditAPI = () => {
   const [currentForm, setCurrentForm] = useState<string>("editPage")

   const [apiName, setApiName] = useState<string>("")
   const [password, setPassword] = useState<string>("")
   const [message1, setMessage1] = useState<string>("")

   const [keysArr, setKeysArr] = useState<Array<string>>([])
   const [objArr, setObjArr] = useState<Array<Object>>([])

   const [message2, setMessage2] = useState<string>("")

   useEffect(() => {
      if (objArr.length > 0) {
         setCurrentForm("objArr")
      }
   }, [objArr])

   const handleSubmit = async () => {
      if (checkValidity(apiName, password)) {
         setMessage1("Loading...")
         const res1 = await fetch(`${process.env.BASE_URL}/api/${apiName}?password=${password}`)
         if (res1.status === 200) {
            setMessage1("loading...")
            const res2 = await fetch(`${process.env.BASE_URL}/api/${apiName}`)
            const arr1 = await res2.json()
            const keysArr1 = Object.keys(arr1[0])
            if (res2.status === 200) {
               setKeysArr(keysArr1)
               setObjArr(arr1)
            } else {
               setMessage1("problem with server")
            }
         } else {
            setMessage1("Password and API-Name doesn't match")
         }
      } else {
         setMessage1(`API-Name should be aleast 3 characters long and can only contain "[A-Z, a-z, 0-9, -, _]". 
         Password should be atleast 4 characters long.`)
      }
   }

   const clearData = () => {
      setApiName("")
      setPassword("")
      setMessage1("")
      setKeysArr([])
      setObjArr([])
      setMessage2("")
   }

   const handleAPIModification = async () => {
      const post1 = {
         apiName: apiName,
         password: password,
         arr1: objArr
      }
      try {
         setMessage2("Loading...")
         const res1 = await fetch(`${process.env.BASE_URL}/api/${apiName}?mission=update&password=${password}`, {
            method: "post",
            body: JSON.stringify(post1)
         })
         if (res1.status === 210) {
            clearData()
            Router.push(`/api/${apiName}`)
         } else {
            setMessage2("Problem in updation")
         }
      } catch (err) {
         setMessage2("Problem in updation")
      }
   }

   return (
      <div className="container">
         <div style={currentForm === "editPage" ? {} : { display: "none" }}>

            <form>
               <label>
                  API-Name:
               </label>
               <input
                  type="text"
                  value={apiName}
                  onChange={e => setApiName(e.target.value)}
               />
               <label>
                  Password:
               </label>
               <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
               />

               <input
                  type="button"
                  value="Submit"
                  onClick={handleSubmit}
               />
            </form>

            <p>{message1}</p>

         </div>

         <CreateArrOfObjects
            currentForm={currentForm}
            objArr={objArr}
            setObjArr={setObjArr}
            setCurrentForm={setCurrentForm}
            keysArr={keysArr}
            editForm={true}
         />

         <div style={currentForm === "editPage2" ? {} : { display: "none" }}>
            <input
               type="button"
               value="submit"
               onClick={handleAPIModification}
            />

            <p>{message2}</p>
         </div>
      </div>
   )
}

export default EditAPI