const loginvalidation=(values)=>{
    let errors={}
    if(!values.email){
        errors.email="Email id is required"
    }
    // else if (values.email.indexOf("@") <= 0) {
    //     errors.email = "Invalid @ position";
    //   } else if (
    //     values.email.charAt(values.email.length - 4) != "." &&
    //     values.email.charAt(values.email.length - 3) != "."
    //   ) {
    //     errors.email = "Invalid . position";
    //   } else {
    //     errors.email = "";
    //   }
    if(!values.pwd){
        errors.pwd="Password is required"
    }    
    return errors;
}

export default loginvalidation;