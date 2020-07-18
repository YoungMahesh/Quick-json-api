import Router from 'next/router'


const determineVaildity = (name: string, password: string) => {
   if (name.length < 4 || name.length > 10 || password.length < 4 || password.length > 10) return false

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

export const checkValidity = (name: string, password: string, setMessage1: Function) => {
   if (!determineVaildity(name, password)) {
      setMessage1(`API-Name can only contain "[A-Z, a-z, 0-9, -, _]". 
      Length of API-Name and Password should be between 4 and 10.`)
      return false
   }
   return true
}


export const handleAPICreation = async (objArr: Array<Object>, apiName: string, password: string, setMessage1: Function) => {

   // STEP1 => Check Name and Password Validity
   if (!checkValidity(apiName, password, setMessage1)) return
   setMessage1("Loading...")

   // STEP2 => Check if apiName is already present
   const res1 = await fetch(`${process.env.BASE_URL}/api/${apiName}`)
   if (res1.status !== 400) {
      return setMessage1("This name is already in use, try another")
   }

   // STEP3 => Create API
   const dataObj = {
      apiName: apiName,
      password: password,
      jsonArr: objArr
   }
   try {
      const res2 = await fetch(`${process.env.BASE_URL}/api/${apiName}`, {
         method: "POST",
         body: JSON.stringify(dataObj)
      })

      if (res2.status !== 210) {
         return setMessage1("problem in creating API")
      }
   } catch (err) {
      setMessage1("Your JSON array structure is wrong.")
   }

   Router.push(`/api/${apiName}`)
}


export const getObjArray = async (apiName: string, setMessage1: Function, setKeysArr: Function, setObjArr: Function) => {

   setMessage1("Loading...")
   const res1 = await fetch(`${process.env.BASE_URL}/api/${apiName}`)
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


export const handleAPIModification = async (apiName: string, password: string, objArr: Array<Object>, setMessage1: Function) => {

   setMessage1("Loading...")
   const dataObj = {
      apiName: apiName,
      password: password,
      arr1: objArr
   }
   const res1 = await fetch(`${process.env.BASE_URL}/api/${apiName}`, {
      method: "PATCH",
      body: JSON.stringify(dataObj)
   })
   if (res1.status !== 210) {
      return setMessage1("Password you typed is incorrect")
   }

   Router.push(`/api/${apiName}`)
}


export const handleAPIDeleteion = async (apiName: string, password: string, setMessage1: Function, setCurrenForm: Function) => {

   setMessage1("Loading...")
   const dataObj = {
      apiName: apiName,
      password: password
   }
   const res1 = await fetch(`${process.env.BASE_URL}/api/${apiName}`, {
      method: "DELETE",
      body: JSON.stringify(dataObj)
   })
   if (res1.status !== 200) {
      return setMessage1("Your APIName and Password combination is wrong. Try Again.")
   }

   setMessage1("")
   setCurrenForm("deleted")
}  