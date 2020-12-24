import Head from 'next/head'
import { useState, useEffect } from 'react'
import CreateArrOfObjects from '../components/2.create_array_of_obj'
import { getObjArray, handleAPIModification } from '../backend/manageAPIdata'

const EditAPI = () => {
	// CurrentPage-Form and CurrentPage-Message
	const [currentForm, setCurrentForm] = useState<string>('editPage')
	const [message1, setMessage1] = useState<string>('')

	// Get objArr using apiName
	const [apiName, setApiName] = useState<string>('')

	// Edit Object-Array and Submit
	const [keysArr, setKeysArr] = useState<Array<string>>([])
	const [objArr, setObjArr] = useState<Array<Object>>([])

	// check apiKey before updation
	const [apiKey, setApiKey] = useState<string>('')

	useEffect(() => {
		if (objArr.length > 0) {
			setCurrentForm('objArr')
		}
	}, [objArr])

	return (
		<>
			<Head>
				<title>Edit API</title>
				<meta name='description' content='Edit JSON API' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main>
				{/*         Form1 =>  Get ApiName     */}
				<div style={currentForm === 'editPage' ? {} : { display: 'none' }}>
					<label>Provide API-Name:</label>
					<input
						type='text'
						value={apiName}
						onChange={(e) => setApiName(e.target.value)}
					/>

					<input
						type='button'
						value='Submit'
						onClick={(e) =>
							getObjArray(apiName, setMessage1, setKeysArr, setObjArr)
						}
					/>
				</div>

				{/*         Form2  =>  Edit API               */}
				<div style={currentForm === 'objArr' ? {} : { display: 'none' }}>
					<CreateArrOfObjects
						setMessage1={setMessage1}
						objArr={objArr}
						setObjArr={setObjArr}
						setCurrentForm={setCurrentForm}
						keysArr={keysArr}
						editForm={true}
					/>
				</div>

				{/*         Form3  =>   Add Password */}
				<div style={currentForm === 'getPassword' ? {} : { display: 'none' }}>
					<label>Provide apiKey of this API:</label>
					<input
						type='text'
						value={apiKey}
						onChange={(e) => setApiKey(e.target.value)}
					/>

					<input
						type='button'
						value='Submit'
						onClick={(e) =>
							handleAPIModification(apiName, apiKey, objArr, setMessage1)
						}
					/>
				</div>

				<h4>{message1}</h4>
			</main>
		</>
	)
}

export default EditAPI
