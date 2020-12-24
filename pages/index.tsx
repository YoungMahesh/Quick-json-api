import Head from 'next/head'
import Link from 'next/link'

const Home = () => {
	return (
		<div id='container'>
			<Head>
				<title>Quick JSON API</title>
				<meta
					name='description'
					content='Create, Edit, Delete JSON API, Get a demo JSON API'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<header>
				<h3>Quick-JSON-API</h3>
				<h4>| <a href='https://github.com/YoungMahesh/Quick-json-api' target='_blank' >View Source</a></h4>
			</header>

			<main>
				<Link href='/quick'>
					<a className='block'>Get a Random API Quickly</a>
				</Link>
				<Link href='/paste'>
					<a className='block'>Create API by Paste</a>
				</Link>

				<Link href='/create'>
					<a className='block'>Create API by Write</a>
				</Link>

				<Link href='/edit'>
					<a className='block'>Edit your API</a>
				</Link>

				<Link href='/delete'>
					<a className='block'>Delete your API</a>
				</Link>
			</main>

			<footer>
				<h4>Note: APIs created here, are going to be preserved atleast upto 31st March 2021.</h4>
			</footer>
		</div>
	)
}

export default Home
