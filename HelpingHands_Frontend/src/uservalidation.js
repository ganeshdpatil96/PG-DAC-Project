const uservalidation = (values) => {
  let errors = {};
 // var pattern = new RegExp(/^[0-9\b]+$/);
  if (!values.name) {
    errors.name = "Name is required";
  } else if (!isNaN(values.name)) {
    errors.name = "only characters are allowed";
  }

  if (!values.city) {
    errors.city = "City is required";
  } else if (!isNaN(values.city)) {
    errors.city = "only characters are allowed";
  }
  if (!values.email) {
    errors.email = "Email is required!";
  } else if (values.email.indexOf("@") <= 0) {
    errors.email = "Invalid @ position";
  } else if (
    values.email.charAt(values.email.length - 4) !== "." &&
    values.email.charAt(values.email.length - 3) !== "."
  ) {
    errors.email = "Invalid . position";
  } 
  if (!values.phone) {
    errors.phone = "Phone no is required";
  } else if (values.phone.length !== 10) {
    errors.phone = "Only 10 digits are allowed";
  } 
  if (!values.pwd) {
    errors.pwd = "Password is required";
  } else if (values.pwd.length < 4) {
    errors.pwd = "Password must be more than 4 characters";
  } else if (values.pwd.length > 10) {
    errors.pwd = "Password cannot exceed more than 10 characters";
  }
  if (!values.cpwd) {
    errors.cpwd = "Confirm password is required";
  }

  if (values.pwd && values.cpwd && values.pwd !== values.cpwd) {
    errors.cpwd = "Password not match";
  } else {
  }

  return errors;
};

export default uservalidation;
