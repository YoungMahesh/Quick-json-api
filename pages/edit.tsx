import { useState, useEffect } from "react"
import CreateArrOfObjects from "../components/2.create_array_of_obj"
import ApiNameAndPassword from "../components/3.apiName_and_password"
import { matchApiNameAndPassword, handleAPICreation } from '../backend/handleCreateApi'

const EditAPI = () => {

   // CurrentPage-Form and CurrentPage-Message
   const [currentForm, setCurrentForm] = useState<string>("editPage")
   const [message1, setMessage1] = useState<string>("")

   // check API-Name and Password
   const [apiName, setApiName] = useState<string>("")
   const [password, setPassword] = useState<string>("")

   // Edit Object-Array and Submit
   const [keysArr, setKeysArr] = useState<Array<string>>([])
   const [objArr, setObjArr] = useState<Array<Object>>([])


   useEffect(() => {
      if (objArr.length > 0) {
         setCurrentForm("objArr")
      }
   }, [objArr])


   return (
      <div className="container">

         {/*         Form1 =>  Check ApiName and Password      */}
         <div style={currentForm === "editPage" ? {} : { display: "none" }}>
            <ApiNameAndPassword
               apiName={apiName}
               setApiName={setApiName}
               password={password}
               setPassword={setPassword}
            />
            <input
               type="button"
               value="Submit"
               onClick={e => matchApiNameAndPassword(apiName, password, setMessage1, setKeysArr, setObjArr)}
            />
         </div>


         {/*         Form2  =>  Edit API               */}
         <div style={currentForm === "objArr" ? {} : { display: "none" }}>
            <CreateArrOfObjects
               setMessage1={setMessage1}
               objArr={objArr}
               setObjArr={setObjArr}
               setCurrentForm={setCurrentForm}
               keysArr={keysArr}
               editForm={true}
            />

            <input
               type="button"
               value="Submit"
               onClick={e => handleAPICreation(objArr, apiName, password, setMessage1, "edit-api")}
            />
         </div>


         <h3>{message1}</h3>
      </div>
   )
}

export default EditAPI