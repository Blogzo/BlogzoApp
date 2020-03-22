const accounts = require('./defineTables')

module.exports = function({}){

    return {

        getUserPassword: function(Username, callback){
            
            accounts.Account.findOne({
                where: { username: Username }
            }).then(function(getUserPassword){
                callback(null, getUserPassword)
            }).catch(function(errors){
                callback(errors)
            })
        },

        createAccount: function(Username, Email, UserPassword, callback){
            
            accounts.Account.create({username: Username, email: Email, userPassword: UserPassword}).then(function(createAccount){
                callback(null, createAccount)
            }).catch(function(errors){
                callback(errors)
            })
        }

    }
}