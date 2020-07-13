export const checkValidity = (name) => {
   if (name.length < 3) return false
   const isValid = name.split('').every((el) => {
      if ((el.charCodeAt() >= 97 && el.charCodeAt() <= 122) ||   // a-z
         (el.charCodeAt() >= 65 && el.charCodeAt() <= 90) ||      // A-Z
         (el.charCodeAt() >= 48 && el.charCodeAt() <= 57) ||      // 0-9
         (el.charCodeAt() == 95) || (el.charCodeAt() == 45)      // _ , -
      ) {
         return true
      }
      return false
   })
   return isValid
}

