import { useState } from "react"

interface propsList {
   currentForm: string
   setCurrentForm: Function
   keysArr: Array<string>
   setKeysArr: Function
   keysSet: Set<string>
   setKeysSet: Function
}

const DetermineObjKeys = ({ currentForm, setCurrentForm, keysArr, setKeysArr, keysSet, setKeysSet }: propsList) => {

   const [currentKey, setCurrentKey] = useState("")

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


   return (
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
   )
}

export default DetermineObjKeys