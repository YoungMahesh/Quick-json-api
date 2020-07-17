import Router from 'next/router'


const determineVaildity = (name: string, password: string) => {
   name = name.trim()
   // bcrypt password
   if (name.length < 3 || password.length < 4) return false
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
      setMessage1(`API-Name should be aleast 3 characters long and can only contain "[A-Z, a-z, 0-9, -, _]". 
      Password should be atleast 4 characters long.`)
      return false
   }
   return true
}



export const handleAPICreation = async (objArr: Array<Object>, apiName: string, password: string, setMessage1: Function, useFor: string) => {

   // STEP1 => Check Name and Password Validity
   if (!checkValidity(apiName, password, setMessage1)) return
   setMessage1("Loading...")

   if (useFor === "create-new-api") {

      // STEP2 => Check if apiName is already present
      const res1 = await fetch(`${process.env.BASE_URL}/api/${apiName}`)
      if (res1.status !== 400) {
         return setMessage1("This name is already in use, try another")
      }

      // STEP3 => Create API
      const post2 = {
         apiName: apiName,
         password: password,
         jsonArr: objArr
      }

      try {
         const res2 = await fetch(`${process.env.BASE_URL}/api/${apiName}?mission=add`, {
            method: "post",
            body: JSON.stringify(post2)
         })

         if (res2.status !== 210) {
            return setMessage1("problem in creating API")
         }
      } catch (err) {
         setMessage1("Your JSON array structure is wrong.")
      }

   } else if (useFor === "edit-api") {

      // STEP2 => Update API
      const post1 = {
         apiName: apiName,
         password: password,
         arr1: objArr
      }
      const res1 = await fetch(`${process.env.BASE_URL}/api/${apiName}?mission=update&password=${password}`, {
         method: "post",
         body: JSON.stringify(post1)
      })
      if (res1.status !== 210) {
         return setMessage1("Problem in updation")
      }


   } else {
      setMessage1("backend problem")
   }

   Router.push(`/api/${apiName}`)
}

export const matchApiNameAndPassword = async (apiName: string, password: string, setMessage1: Function, setKeysArr: Function, setObjArr: Function) => {

   if (!checkValidity(apiName, password, setMessage1)) return
   setMessage1("Loading...")

   const res1 = await fetch(`${process.env.BASE_URL}/api/${apiName}?password=${password}`)
   if (res1.status !== 200) {
      return setMessage1("Password and API-Name doesn't match")
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