import Head from 'next/head'
import { useState } from 'react'
import { handleAPICreation } from '../backend/manageAPIdata'
import DispalyMSG from '../components/3.displayApiKey'

export default function Home() {
	const [currentForm, setCurrentForm] = useState<string>('jsonArr')
	const [message1, setMessage1] = useState<string>('')

	// Get Obj Array
	const [objArrStr, setObjArrStr] = useState<string>('')
	const [objArr, setObjArr] = useState<Array<Object>>([])

	// Get API-Name
	const [apiName, setApiName] = useState<string>('')

	// Generate API-Key
	const [apiKey, setApiKey] = useState<string>('')

	const handleSubmit = async () => {
		try {
			setMessage1('')
			const objArr1 = await JSON.parse(objArrStr) // stringObj => normalObj
			// we need to parse jsonArr1 as it already get stringified because of HTML-textArea area to get "pure object"

			setObjArr(objArr1)
			setObjArrStr('') // clear textArea
			setCurrentForm('apiName')
		} catch (err) {
			setMessage1('Your JSON array structure is wrong')
		}
	}

	return (
		<main id='container'>
			<Head>
				<title>Paste JSON</title>
				<meta name='description' content='Host your JSON API for free' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			{/*        Part1 => Paste JSON array           */}
			<form style={currentForm === 'jsonArr' ? {} : { display: 'none' }}>
				<label>Paste Array_of_Objects: </label>
				<textarea
					rows={25}
					cols={50}
					value={objArrStr}
					onChange={(e) => setObjArrStr(e.target.value)}
				/>
				<input
					type='button'
					value='Submit'
					onClick={(e) => handleSubmit()}
				/>
			</form>

			{/*         Part2 => Get Name for "JSON-API"             */}
			<div style={currentForm === 'apiName' ? {} : { display: 'none' }}>
				<label>API-Name: </label>
				<input
					type='text'
					value={apiName}
					onChange={(e) => setApiName(e.target.value)}
				/>

				<input
					type='button'
					value='Submit'
					onClick={(e) =>
						handleAPICreation(
							objArr,
							apiName,
							setMessage1,
							setCurrentForm,
							setApiKey
						)
					}
				/>
			</div>

			{/*          Part3 => Display Key  */}
			<div style={currentForm === 'displayMsg' ? {} : { display: 'none' }}>
				<DispalyMSG apiName={apiName} apiKey={apiKey} />
			</div>

			<h3> {message1} </h3>
		</main>
	)
}
