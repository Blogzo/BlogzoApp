
module.exports = function({accountRepository}){

    const bcrypt = require('bcrypt')

    return {

        getErrors: function(username, email, password1, password2){
            
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

        getLoginInformation: function(username, password, callback){

            accountRepository.getLoginInformation(username, function(errors, account){

                if(account){
                    if(bcrypt.compareSync(password, account.accountPassword)){
                        
                        callback([], account)
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

            const errors = this.getErrors(username, email, userPassword, userPassword2)
           
            if(errors.length > 0){
                callback(errors)
                return
            }
            
            const saltrounds = 10
            const hashedPassword = bcrypt.hashSync(userPassword, saltrounds)
            
            accountRepository.createAccount(username, email, hashedPassword, function(error, accountId){
               
                if(error.length > 0){
                    const databaseError = []
                    databaseError.push("databaseError")
                    callback(databaseError)
                    return
                }else{                    
                    callback(null, accountId) 
                }
            })
        }
    }
}

