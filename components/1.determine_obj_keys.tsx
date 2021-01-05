// imported inside ->  'pages/create.tsx'

import { useState } from "react"

interface propsList {
	setCurrentForm: Function
	keysSet3: Set<string>
	keysArr3: Array<string>
	sendKeysSet3: Function
}


const DetermineObjKeys = ({ setCurrentForm, keysSet3, keysArr3, sendKeysSet3 }: propsList) => {

	const [currentKey, setCurrentKey] = useState("")

	const handleKeyInput = () => {
		sendKeysSet3('SET_ADD', { currKey: currentKey })
		setCurrentKey("")
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
				keysArr3.map(el => <p key={el}>{el}</p>)
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