import Head from 'next/head'
import Link from 'next/link'

const Home = () => {
   return (
      <div className="container">

         <Head>
            <title>Quick JSON API</title>
         </Head>


         <Link href="/quick">
            <a className="block1">Get a Random API</a>
         </Link>


         <div className="block2-container center">

            <Link href='/paste'>
               <a className="block2">Create API by Paste</a>
            </Link>

            <Link href="/create">
               <a className="block2">Create API by Write</a>
            </Link>

            <Link href="/edit">
               <a className="block2">Edit your API</a>
            </Link>

            <Link href="/delete">
               <a className="block2">Delete your API</a>
            </Link>

         </div>

      </div>

   )
}

export default Home