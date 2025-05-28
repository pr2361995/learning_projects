export function isEmail(value) {
  return value.includes('@');
}

export function isNotEmpty(value) {
  return value.trim() !== '';
}

export function hasMinLength(value, minLength) {
  return value.length >= minLength;
}

export function isEqualToOtherValue(value, otherValue) {
  return value === otherValue;
}

export function handleSubmit(prevState,formData){
  const email = formData.get("email"),
    password = formData.get("password"),
    confirmpassword = formData.get("confirm-password"),
    firstname = formData.get("first-name"),
    lastname = formData.get("last-name"),
    role = formData.get("role"),
    acquisition = formData.getAll("acquisition"),
    terms = formData.get("terms"),
    errors = []
  
  if(!isEmail(email))
    errors.push("Invalid email address")
  if(!isNotEmpty(password) || !hasMinLength(password,6))
    errors.push("You must provide a password  with at least six characters.")
  if(!isEqualToOtherValue(password,confirmpassword))
    errors.push("Password do not match")
  if(!isNotEmpty(firstname) || !isNotEmpty(lastname))
    errors.push("Please provide both your firstname and lastname.")
  if(!isNotEmpty(role))
    errors.push('Please select a role.')
  if(!terms)
    errors.push("You must agree to terms and conditions.")
  if(acquisition.length === 0)
    errors.push("Please select at least one acquisition channel.")

  if(errors.length > 0 )
    return ({errors,data:{email,password,confirmpassword,firstname,lastname,role,acquisition,terms}})
  
  return {errors:null};
}