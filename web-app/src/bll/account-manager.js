
module.exports = function({accountRepository}){

    const bcrypt = require('bcrypt')

    return {

        getValidationErrors: function(username, password1, password2){
            
            const errors = []

            if(username.length < 5){
                errors.push("Username to short!")
            }
            if(username.length > 20){
                errors.push("Username to long!")
            }
            if(password1 != password2){
                errors.push("Password do not match!")
            }
            return errors
        },

        getAccountById: function(personId){

            accountRepository.getAccountById(personId, function(errors, account){
                callback(errors, account)
            })
        },

        getUserPassword: function(username, password, callback){

            accountRepository.getUserPassword(username, function(errors, userPassword){
                
                if(userPassword.length != ""){
                    if(bcrypt.compareSync(password, userPassword[0].userPassword)){
                        console.log("password match")
                        callback(errors, userPassword)
                    }else{
                        console.log("password dont match")
                        const errors = []
                        errors.push("Wrong password!")
                        callback(errors)
                        return
                    }
                }else{
                    const errors = []
                    errors.push("Username do not exists!")
                    callback(errors)
                }
            })
        },

        getAccount: function(username, userPassword, callback){

            accountRepository.getAccount(username, userPassword, function(errors, account){
                callback(errors, account)
            })
        },

        createAccount: function(username, email, userPassword, userPassword2, callback){

            const errors = this.getValidationErrors(username, userPassword, userPassword2)
            if(errors.length > 0){
                callback(errors)
                return
            }
            const saltrounds = 10
            const hashedPassword = bcrypt.hashSync(userPassword, saltrounds)
            accountRepository.createAccount(username, email, hashedPassword, function(errors, account){
                callback(errors, account)
            })
        }
    }
}

