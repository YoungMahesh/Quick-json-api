// imported inside ->  'pages/create.tsx'

import { useState } from "react"

interface propsList {
	setCurrentForm: Function
	keysArr3: Array<string>
	sendKeysArr3: Function
}


const DetermineObjKeys = ({ setCurrentForm, keysArr3, sendKeysArr3 }: propsList) => {

	const [currentKey, setCurrentKey] = useState("")

	const handleKeyInput = () => {
		sendKeysArr3('ARR_ADD', { currKey: currentKey })
		setCurrentKey("")
	}

	const handleKeyRemove = (key: string) => {
		sendKeysArr3('ARR_REMOVE', { currKey: key })
	}

	const handleSubmitForm1 = () => {
		if (keysArr3.length) {
			setCurrentForm("objArr")
		}
	}


	return (
		<div className="container">
			<h2 className="green-medium">Determine Key-Fields for Each Object</h2>
			{
				keysArr3.map(el => (
					<div key={keysArr3.indexOf(el)} style={{ display: 'flex', justifyContent: 'space-around' }}>
						<p>{el}</p>
						<button onClick={() => handleKeyRemove(el)}
						>remove</button>
					</div>
				))
			}
			<form>
				<label>
					Key:
         </label>
				<input
					type="text"
					value={currentKey}
					onChange={e => setCurrentKey(e.target.value)}
				/>
				<input
					type="button"
					value="Add Key"
					onClick={handleKeyInput}
				/>
				<input
					type="button"
					value="Submit All Keys"
					onClick={handleSubmitForm1}
				/>
			</form>
		</div>
	)
}

export default DetermineObjKeys