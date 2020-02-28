
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
                    console.log("password:", password)
                    console.log("hashedpassword:", userPassword[0].userPassword)
                    if(bcrypt.compareSync(password, userPassword[0].userPassword)){
                        console.log("password match")
                        callback(errors, userPassword)
                    }else{
                        console.log("password dont match")
                        userPassword = ""
                        callback(errors, userPassword)
                    }
                }else{
                    userPassword = ""
                    callback(errors, userPassword)
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
            console.log("passwordBeforeHash:", userPassword)
            const hashedPassword = bcrypt.hashSync(userPassword, saltrounds)
            console.log("hashedPassword:", hashedPassword)
            accountRepository.createAccount(username, email, hashedPassword, function(errors, account){
                callback(errors, account)
            })
        }
    }
}

