export const validation = (user) => {
    let errors = {};
    if(!user.username){
        errors.username = "username is required.";
    } else if(user.username.length < 3){
        errors.username = "username must be atleast three charaters.";
    }
     if(!user.email){
         errors.email = "Email is required.";
     } else if( !/\S+@\S+\.\S+/.test(user.email)) {
         errors.email = "Email is invalid.";
     }
     if(!user.password){
         errors.password = "Password is required.";
     } else if(user.password.length < 5){
         errors.password = "Password must be atleast five charaters.";
     }
     return errors;
}

