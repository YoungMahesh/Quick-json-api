import Head from 'next/head'
import Link from "next/link"

const Quick = () => {

   const listOfAPIs = ['vehicles', 'accounts', 'shoppings', 'tasks']

   return (
      <div className="container">

         <Head>
            <title>Random API</title>
         </Head>

         <div className="block2-container">
            {
               listOfAPIs.map((apiName, idx) =>
                  <div key={idx}>
                     <Link href={`/api/${apiName}`}>
                        <a className="block2">{apiName}</a>
                     </Link>
                  </div>
               )
            }
         </div>
      </div>
   )
}

export default Quick