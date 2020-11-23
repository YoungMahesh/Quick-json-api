import { useState } from "react"

interface ListProps {
	setMessage1: Function
	setCurrentForm: Function
	objArr: Array<Object>
	setObjArr: Function
	keysArr: Array<string>
	editForm: boolean
}

const CreateArrOfObjects = ({ setMessage1, setCurrentForm, objArr, setObjArr, keysArr, editForm }: ListProps) => {

	let [currObj, setCurrObj] = useState<Object>({})
	const [currObjIdx, setCurrObjIdx] = useState<number>(-1)
	const [updateBtnDisabled, setUpdateBtnDisabled] = useState<boolean>(true)


	const handleObjCreation = (key1: string, value1: string) => {
		currObj = { ...currObj, [`${key1}`]: value1 }
	}


	const editValues = (idx: number) => {
		setCurrObjIdx(idx)
		setUpdateBtnDisabled(false)
		const values1 = Object.values(objArr[idx]) // not using "currObjIdx" directly, as this is async function and takes some time, hence "currObjIdx" is not available at the time of this execution
		setCurrObj({})                   // currObj is emptified
		const objKeys = document.getElementsByClassName("objKey") as HTMLCollectionOf<HTMLInputElement>
		for (let i = 0; i < objKeys.length; i++) {
			objKeys[i].value = values1[i]
			handleObjCreation(keysArr[i], values1[i])    // values in currObj updated
		}
		setCurrObj(currObj)
	}


	const removeValues = (idx: number) => {
		const newObjArr = objArr.filter(el => objArr.indexOf(el) !== idx)
		setObjArr(newObjArr)
	}

	const handleAddCurrObj = async (isNew: boolean) => {
		setUpdateBtnDisabled(true)
		if (isNew) {                // add currentObj to objArr
			setObjArr([...objArr, currObj])
		} else {                    // update currObj in objArr
			objArr[currObjIdx] = currObj
		}

		// clear the input fields 
		const objKeys = document.getElementsByClassName("objKey") as HTMLCollectionOf<HTMLInputElement>
		setCurrObj({})                         // clear curr obj
		for (let i = 0; i < objKeys.length; i++) {
			objKeys[i].value = ""
			handleObjCreation(keysArr[i], "")   // add objKeys without values
		}
		setCurrObj(currObj)
	}

	const sendToNextPage = () => {
		if (objArr.length > 0) {
			editForm ? setCurrentForm("getPassword") : setCurrentForm("apiName")
			setMessage1("")
		} else {
			setMessage1("Your object-array is empty")
		}
	}



	return (
		<>
			<div>
				{objArr.map((obj, idx) =>
					<div
						key={idx}
						style={{ display: "flex" }}
					>
						<pre>{JSON.stringify(obj, null, 2)}</pre>
						<input
							type="button"
							value="Edit"
							onClick={e => editValues(objArr.indexOf(obj))}
						/>
						<input
							type="button"
							value="remove"
							onClick={e => removeValues(objArr.indexOf(obj))}
						/>
					</div>
				)}
			</div>

			<form>
				{
					keysArr.map((el, idx) =>
						<label key={idx}>
							{`${el}: `}
							<input
								type="text"
								className="objKey"
								onChange={e => handleObjCreation(el, e.currentTarget.value)}
							/>
						</label>
					)
				}
				<input
					type="button"
					value="Update"
					disabled={updateBtnDisabled}
					onClick={e => handleAddCurrObj(false)}
				/>
				<input
					type="button"
					value="Add New"
					onClick={e => handleAddCurrObj(true)}
				/>
				<input
					type="button"
					value="Create JSON API"
					onClick={sendToNextPage}
				/>
			</form>

		</>
	)
}

export default CreateArrOfObjects