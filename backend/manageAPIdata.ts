import Router from 'next/router'


const determineVaildity = (name: string) => {
	if (name.length < 2 || name.length > 20) return false

	const isValid = name.split('').every((el) => {
		if ((el.charCodeAt(0) >= 97 && el.charCodeAt(0) <= 122) ||   // a-z
			(el.charCodeAt(0) >= 65 && el.charCodeAt(0) <= 90) ||      // A-Z
			(el.charCodeAt(0) >= 48 && el.charCodeAt(0) <= 57) ||      // 0-9
			(el.charCodeAt(0) == 95) || (el.charCodeAt(0) == 45)      // _ , -
		) {
			return true
		}
		return false
	})
	return isValid
}

export const checkValidity = (name: string, setMessage1: Function) => {
	if (!determineVaildity(name)) {
		setMessage1(`API-Name can only contain "[A-Z, a-z, 0-9, -, _]" and length should be between 2 and 20.`)
		return false
	}
	return true
}


export const handleAPICreation = async (objArr: Array<Object>, apiName: string, setMessage1: Function, setCurrentForm: Function, setApiKey: Function) => {

	// STEP1 => Check Name and Password Validity
	if (!checkValidity(apiName, setMessage1)) return
	setMessage1("Loading...")

	// STEP2 => Check if apiName is already present
	const res1 = await fetch(`/api/${apiName}`)
	if (res1.status === 200) {
		return setMessage1("This name is already in use, try another")
	}

	// STEP3 => Create API
	const dataObj = {
		apiName: apiName,
		jsonArr: objArr
	}
	try {
		const res2 = await fetch(`/api/${apiName}`, {
			method: "POST",
			body: JSON.stringify(dataObj)
		})

		if (res2.status !== 210) {
			return setMessage1("problem in creating API")
		}

		const data2 = await res2.json()
		setMessage1("")
		setApiKey(data2.key)
		setCurrentForm("displayMsg")
	} catch (err) {
		setMessage1("Your JSON array structure is wrong.")
	}
}


export const getObjArray = async (apiName: string, setMessage1: Function, setKeysArr: Function, setObjArr: Function) => {

	setMessage1("Loading...")
	const res1 = await fetch(`/api/${apiName}`)
	if (res1.status !== 200) {
		return setMessage1("API-Name not found.")
	}

	try {
		const arr1 = await res1.json()
		const keysArr1 = Object.keys(arr1[0])
		setMessage1("")
		setKeysArr(keysArr1)
		setObjArr(arr1)
	} catch (err) {
		setMessage1("The json-api to this apiName is not is json-array format")
	}
}


export const handleAPIModification = async (apiName: string, apiKey: string, objArr: Array<Object>, setMessage1: Function) => {

	setMessage1("Loading...")
	const dataObj = {
		apiName: apiName,
		apiKey: apiKey,
		arr1: objArr
	}
	const res1 = await fetch(`/api/${apiName}`, {
		method: "PATCH",
		body: JSON.stringify(dataObj)
	})
	if (res1.status !== 210) {
		return setMessage1("API-Key you provided is incorrect")
	}

	Router.push(`/api/${apiName}`)
}


export const handleAPIDeleteion = async (apiName: string, apiKey: string, setMessage1: Function, setCurrenForm: Function) => {

	setMessage1("Loading...")
	const dataObj = {
		apiName: apiName,
		apiKey: apiKey
	}
	const res1 = await fetch(`/api/${apiName}`, {
		method: "DELETE",
		body: JSON.stringify(dataObj)
	})
	if (res1.status !== 200) {
		return setMessage1("Your API-Name and API-Key combination is wrong. Try Again.")
	}

	setMessage1("")
	setCurrenForm("deleted")
}  
