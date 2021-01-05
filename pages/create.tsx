import Head from 'next/head'
import { useState } from 'react'
import DetermineObjKeys from '../components/1.determine_obj_keys'
import CreateArrOfObjects from '../components/2.create_array_of_obj'
import { handleAPICreation } from '../backend/manageAPIdata'
import DispalyMSG from '../components/3.displayApiKey'


import { Machine, assign } from 'xstate'
import { useMachine } from '@xstate/react'


interface DeterminKeysContext {
	keysArr0: Array<string>
}
interface DetermineKeysSchema {
	states: {
		active: {}
	}
}
type DetermineKeysEvent = { type: 'ARR_ADD'; currKey: string } | { type: 'ARR_REMOVE'; currKey: string }

const determinKeysMachine = Machine<DeterminKeysContext, DetermineKeysSchema, DetermineKeysEvent>({
	id: 'determine-keys',
	initial: 'active',
	context: {
		keysArr0: []
	},
	states: {
		active: {
			on: {
				ARR_ADD: {
					actions: assign({
						keysArr0: (ctx, ev) => {
							const keysArr1 = ctx.keysArr0
							if (!keysArr1.find(el => el === ev.currKey)) {
								keysArr1.push(ev.currKey)
							}
							return keysArr1
						},
					})
				},
				ARR_REMOVE: {
					actions: assign({
						keysArr0: (ctx, ev) => ctx.keysArr0.filter(el => el != ev.currKey)
					})
				}
			}
		}
	}
})

const Create = () => {
	// display one form at a time
	const [currentForm, setCurrentForm] = useState<string>('objKeys')
	const [message1, setMessage1] = useState<string>('')

	// determine object-keys using xstate
	const [keysArr3, sendKeysArr3] = useMachine(determinKeysMachine)

	// crete object array
	const [objArr, setObjArr] = useState<Array<Object>>([])
	const [apiName, setApiName] = useState<string>('')

	// Recieve API-Key
	const [apiKey, setApiKey] = useState<string>('')

	return (
		<>
			<Head>
				<title>Create API by Write</title>
				<meta name='description' content='Create a JSON API quickly' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main>
				{/* Form1 => Get JSON_Object_Schema from the User */}
				<div style={currentForm === 'objKeys' ? {} : { display: 'none' }}>
					<DetermineObjKeys
						setCurrentForm={setCurrentForm}
						keysArr3={keysArr3.context.keysArr0}
						sendKeysArr3={sendKeysArr3}
					/>
				</div>

				{/* Form2 => Create "Array of Objects" */}
				<div style={currentForm === 'objArr' ? {} : { display: 'none' }}>
					<CreateArrOfObjects
						setMessage1={setMessage1}
						setCurrentForm={setCurrentForm}
						objArr={objArr}
						setObjArr={setObjArr}
						keysArr={keysArr3.context.keysArr0}
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

				<h4>{message1}</h4>
			</main>
		</>
	)
}

export default Create
