import Head from 'next/head'
import Link from 'next/link'

const Home = () => {
   return (
      <>
         <Head>
            <title>Home</title>
         </Head>

         <div className="container">

            <Link href="/quick">
               <a className="block1">Get a Random API</a>
            </Link>


            <div className="block2-container center">

               <Link href='/paste'>
                  <a className="block2">Create API by Pasting a JSON Array</a>
               </Link>

               <Link href="/create">
                  <a className="block2">Create API by Writing JSON Array</a>
               </Link>

               <Link href="/edit">
                  <a className="block2">Edit your API</a>
               </Link>

               <Link href="/delete">
                  <a className="block2">Delete your API</a>
               </Link>

            </div>

         </div>
      </>
   )
}

export default Home