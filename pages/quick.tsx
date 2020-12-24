import Head from 'next/head'
import Link from 'next/link'

const Quick = () => {
	const listOfAPIs = ['vehicles', 'accounts', 'shoppings', 'tasks']

	return (
		<>
			<Head>
				<title>Get a Random API</title>
				<meta name='description' content='Get a demo JSON API' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main>
				{listOfAPIs.map((apiName, idx) => (
					<div key={idx}>
						<Link href={`/api/${apiName}`}>
							<a className='block'>{apiName}</a>
						</Link>
					</div>
				))}
			</main>
		</>
	)
}

export default Quick
