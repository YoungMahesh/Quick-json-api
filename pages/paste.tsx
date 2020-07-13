import Head from 'next/head'
import { useState } from "react"
import Router from 'next/router'


export default function Home() {
   const [currentForm, setCurrentForm] = useState<string>("apiName")
   const [apiName1, setApiName1] = useState<string>("")
   const [jsonArr1, updateJsonArr1] = useState<string>("")
   const [message1, setMessage1] = useState<string>("")


   const checkName = async () => {

      setMessage1("Loading...")
      const post1 = {         // data should be sent in the form of object
         apiName: apiName1
      }

      const res1 = await fetch(`${process.env.BASE_URL}/api/check_name`, {
         method: "post",
         body: JSON.stringify(post1)
      })

      if (res1.status === 210) {
         setMessage1("")
         setCurrentForm("jsonArr")
      } else if (res1.status === 220) {
         setMessage1(`Name should have more than 3 characters which can only contain "[A-Z, a-z, 0-9, -, _]"`)
      } else if (res1.status === 230) {
         setMessage1("This name is already in use, try another")
      }
   }


   const handleSubmit = async () => {
      try {
         const post2 = {
            apiName: apiName1,
            jsonArr: await JSON.parse(jsonArr1) // stringObj => normalObj  
            // we need to parse jsonArr1 as it already get stringified because of HTML-textArea area to get "pure object"
         }
         setMessage1("Loading...")
         const res2 = await fetch(`${process.env.BASE_URL}/api/${apiName1}`, {
            method: "post",
            body: JSON.stringify(post2)      // only stringified data can be send to the backend
         })

         if (res2.status === 210) {
            Router.push(`/api/${apiName1}`)
         } else {
            setMessage1("Your JSON array structure is wrong")
         }
      } catch  {
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
            <form style={currentForm === "apiName" ? {} : { display: "none" }}>
               <label> Provide API Name: </label>
               <input
                  type="input"
                  value={apiName1}
                  onChange={e => setApiName1(e.target.value)}
               />

               <input
                  type="button"
                  value="Check Name"
                  onClick={checkName}
               />
            </form>


            <form style={currentForm === "jsonArr" ? {} : { display: "none" }}
            >
               <label>Paste JSON array: </label>
               <textarea
                  rows={25}
                  cols={50}
                  value={jsonArr1}
                  onChange={e => updateJsonArr1(e.target.value)}
               />
               <input
                  type="button"
                  value="Submit"
                  onClick={e => handleSubmit()}
               />
            </form>

            <h3>
               {message1}
            </h3>

         </div>

         <style jsx>{`
            .container {
               text-align: center;
            }
            h3 {
               font-family: monospace;
            }
            input, label {
               display: column;
               vertical-align: top;
            }
         `}</style>
      </>
   )
}
