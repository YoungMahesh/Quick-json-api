import Head from 'next/head'
import Link from 'next/link'

const Home = () => {
   return (
      <>
         <Head>
            <title>Home</title>
         </Head>

         <div className="container">
            <h3>
               <Link href='/paste'>
                  <a>Create API by pasting JSON array</a>
               </Link>
            </h3>
            <h3>
               <Link href="/create">
                  <a>Create API by writing JSON object array</a>
               </Link>
            </h3>
         </div>
      </>
   )
}

export default Home