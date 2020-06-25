
module.exports = function({accountRepository}){

    const bcrypt = require('bcrypt')

    return {

        getValidationErrors: function(username, email, password1, password2){
            
            const errors = []
            var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

            if(username.length < 5){
                errors.push("Username to short!")
            }
            if(!re.test(String(email).toLowerCase())){
                errors.push("Not a valid Email!")
            }
            if(username.length > 20){
                errors.push("Username to long!")
            }
            if(password1 != password2){
                errors.push("Password do not match!")
            }
            return errors
        },

        checkUserPassword: function(username, password, callback){

            accountRepository.getUserPassword(username, function(errors, accountPassword){
                console.log("userPasswordBLL", accountPassword);
                if(accountPassword){
                    if(bcrypt.compareSync(password, accountPassword)){
                        
                        callback(null, accountPassword)
                    }else{
                        const errors = []
                        errors.push("Wrong password")
                        callback(errors)
                        return
                    }
                }else{
                    const errors = []
                    errors.push("Username do not exists")
                    callback(errors)
                }
            })
        },

        createAccount: function(username, email, userPassword, userPassword2, callback){

            const errors = this.getValidationErrors(username, email, userPassword, userPassword2)
           
            if(errors.length > 0){
                callback(errors)
                return
            }
            
            const saltrounds = 10
            const hashedPassword = bcrypt.hashSync(userPassword, saltrounds)
            
            accountRepository.createAccount(username, email, hashedPassword, function(error, accountId){
                console.log("BLLAccount", accountId);
                console.log("errorBLL", error);
                
                if(error.length > 0){
                    console.log(error, "error>BLL");
                    const databaseError = []
                    databaseError.push("databaseError")
                    callback(databaseError)
                    return
                    
                }else{
                    console.log(accountId,"BLL");
                    
                    callback(null, accountId) 
                }
            })
        }
    }
}

