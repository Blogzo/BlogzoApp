const accounts = require('./defineTables')

module.exports = function({}){

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

        getUserPassword: function(username, password, callback){
            accounts.Account.findOne({
                where: {username = password}
            }).then(function(getUserPassword){
                console.log(getUserPassword)
                callback(getUserPassword)
            }).catch(function(errors){
                console.log(errors)
                callback(errors)
            })
        },

        getAccount: function(username, userPassword, callback){
            
        },

        createAccount: function(Username, Email, UserPassword, UserPassword2, callback){
            accounts.Account.create({username: Username, email: Email, userPassword: UserPassword, userPassword2: UserPassword2}).then(function(createAccount){
                console.log(createAccount)
                callback(createAccount)
            }).catch(function(errors){
                console.log(errors)
                callback(errors)
            })
        }

    }
}