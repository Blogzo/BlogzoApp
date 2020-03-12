const accounts = require('./defineTables')

module.exports = function({}){

    return {

        getUserPassword: function(Username, callback){
            accounts.Account.findOne({
                where: { username: Username }
            }).then(function(getUserPassword){
                console.log("userPasswordSEQ:", getUserPassword)
                callback([], getUserPassword)
            }).catch(function(errors){
                console.log("errorsInSEQ:", errors)
                callback(errors, [])
            })
        },

        createAccount: function(Username, Email, UserPassword, callback){
            accounts.Account.create({username: Username, email: Email, userPassword: UserPassword}).then(function(createAccount){
                console.log("accountInDAL:", createAccount)
                callback([], createAccount)
            }).catch(function(errors){
                console.log("errorsInSEQ:", errors)
                callback(errors, [])
            })
        }

    }
}