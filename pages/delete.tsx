import { useState } from "react"
import { handleAPIDeleteion } from "../backend/manageAPIdata"

const DeleteAPI = () => {
   const [currentForm, setCurrentForm] = useState<string>("deletePage")
   const [message1, setMessage1] = useState<string>("")

   const [apiName, setApiName] = useState<string>("")
   const [password, setPassword] = useState<string>("")


   return (
      <div className="container">
         <div style={currentForm === "deletePage" ? {} : { display: "none" }}>
            <label>API-Name: </label>
            <input
               type="text"
               value={apiName}
               onChange={e => setApiName(e.target.value)}
            />

            <label>Password: </label>
            <input
               type="password"
               value={password}
               onChange={e => setPassword(e.target.value)}
            />

            <input
               type="button"
               value="Submit"
               onClick={e => handleAPIDeleteion(apiName, password, setMessage1, setCurrentForm)}
            />
         </div>

         <div style={currentForm === "deleted" ? {} : { display: "none" }}>
            <h1>{`API with name: "${apiName}", succesfully deleted.`}</h1>
         </div>

         <h3>{message1}</h3>
      </div>
   )
}

export default DeleteAPI