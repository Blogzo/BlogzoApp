
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

            accountRepository.getUserPassword(username, function(userPassword, errors){
                console.log("userpasswordBLL:", userPassword)
                console.log("errorsInBLL:", errors)
                if(userPassword.length != ""){
                    if(bcrypt.compareSync(password, userPassword.dataValues.userPassword)){
                        console.log("password match")
                        callback(userPassword, errors)
                    }else{
                        console.log("password dont match")
                        const errors = []
                        errors.push("Wrong password!")
                        callback(0, errors)
                        return
                    }
                }else{
                    const errors = []
                    errors.push("Username do not exists!")
                    callback(0, errors)
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
                callback(0, errors)
                return
            }
            const saltrounds = 10
            const hashedPassword = bcrypt.hashSync(userPassword, saltrounds)
            accountRepository.createAccount(username, email, hashedPassword, function(account, errors){
                console.log("errorsInBLL:", errors)
                if(errors.errors[0].message.includes("username must be unique")){
                    const uniqueUsernameError = []
                    uniqueUsernameError.push("Username already exists!")
                    callback(0, uniqueUsernameError)
                    return
                }
                if(errors.errors[0].message.includes("email must be unique")){
                    const uniqueEmailError = []
                    uniqueEmailError.push("Email already exists!")
                    callback(0, uniqueEmailError)
                    return
                }else{
                    callback(account, errors)
                }
            })
        }
    }
}

