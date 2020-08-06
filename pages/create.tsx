import Head from 'next/head'
import { useState } from 'react'
import DetermineObjKeys from '../components/1.determine_obj_keys'
import CreateArrOfObjects from '../components/2.create_array_of_obj'
import { handleAPICreation } from '../backend/manageAPIdata'
import DispalyMSG from '../components/3.displayApiKey'

const Create = () => {
	// display one form at a time
	const [currentForm, setCurrentForm] = useState<string>('objKeys')
	const [message1, setMessage1] = useState<string>('')

	// determine object keys
	const [keysSet, setKeysSet] = useState<Set<string>>(new Set())
	const [keysArr, setKeysArr] = useState<Array<string>>([])

	// crete object array
	const [objArr, setObjArr] = useState<Array<Object>>([])
	const [apiName, setApiName] = useState<string>('')

	// Recieve API-Key
	const [apiKey, setApiKey] = useState<string>('')

	return (
		<main id='container'>
			<Head>
				<title>Create JSON</title>
				<meta name='description' content='Create a JSON API quickly' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			{/* Form1 => Get JSON_Object_Schema from the User */}
			<div style={currentForm === 'objKeys' ? {} : { display: 'none' }}>
				<DetermineObjKeys
					setCurrentForm={setCurrentForm}
					keysArr={keysArr}
					setKeysArr={setKeysArr}
					keysSet={keysSet}
					setKeysSet={setKeysSet}
				/>
			</div>

			{/* Form2 => Create "Array of Objects" */}
			<div style={currentForm === 'objArr' ? {} : { display: 'none' }}>
				<CreateArrOfObjects
					setMessage1={setMessage1}
					setCurrentForm={setCurrentForm}
					objArr={objArr}
					setObjArr={setObjArr}
					keysArr={keysArr}
					editForm={false}
				/>
			</div>

			{/* Form3 => Get Name for "JSON-API" */}
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

			<div style={currentForm === 'displayMsg' ? {} : { display: 'none' }}>
				<DispalyMSG apiName={apiName} apiKey={apiKey} />
			</div>

			<h3>{message1}</h3>
		</main>
	)
}

export default Create
