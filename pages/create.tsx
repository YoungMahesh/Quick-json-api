import Head from 'next/head'
import { useState } from 'react'
import DetermineObjKeys from '../components/1.determine_obj_keys'
import CreateArrOfObjects from '../components/2.create_array_of_obj'
import { handleAPICreation } from '../backend/manageAPIdata'
import DispalyMSG from '../components/3.displayApiKey'


import { Machine, assign } from 'xstate'
import { useMachine } from '@xstate/react'


interface DeterminKeysContext {
	keysSet0: Set<string>
	keysArr0: Array<string>
}
interface DetermineKeysSchema {
	states: {
		active: {}
	}
}
type DetermineKeysEvent = { type: 'SET_ADD'; currKey: string }

const determinKeysMachine = Machine<DeterminKeysContext, DetermineKeysSchema, DetermineKeysEvent>({
	id: 'determine-keys',
	initial: 'active',
	context: {
		keysSet0: new Set(''),
		keysArr0: []
	},
	states: {
		active: {
			on: {
				SET_ADD: {
					actions: assign({
						keysSet0: (ctx, ev) => ctx.keysSet0.add(ev.currKey), keysArr0: (ctx) => Array.from(ctx.keysSet0),
					})
				},
			}
		}
	}
})

const Create = () => {
	// display one form at a time
	const [currentForm, setCurrentForm] = useState<string>('objKeys')
	const [message1, setMessage1] = useState<string>('')

	// determine object-keys using xstate
	const [keysSet3, sendKeysSet3] = useMachine(determinKeysMachine)

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
						keysSet3={keysSet3.context.keysSet0}
						keysArr3={keysSet3.context.keysArr0}
						sendKeysSet3={sendKeysSet3}
					/>
				</div>

				{/* Form2 => Create "Array of Objects" */}
				<div style={currentForm === 'objArr' ? {} : { display: 'none' }}>
					<CreateArrOfObjects
						setMessage1={setMessage1}
						setCurrentForm={setCurrentForm}
						objArr={objArr}
						setObjArr={setObjArr}
						keysArr={keysSet3.context.keysArr0}
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
