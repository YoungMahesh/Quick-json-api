interface ListProps {
   apiName: string
   setApiName: Function
   password: string
   setPassword: Function
}

const ApiNameAndPassword = ({ apiName, password, setApiName, setPassword }: ListProps) => {

   // bring check validity to this page
   return (
      <>
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

         </form>

      </>
   )
}

export default ApiNameAndPassword