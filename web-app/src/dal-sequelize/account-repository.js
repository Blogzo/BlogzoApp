const accounts = require('./defineTables')

module.exports = function({}){

    return {

        getUserPassword: function(Username, callback){
            
            accounts.Account.findOne({
                where: { username: Username }
            }).then(function(getUserPassword){
                callback([], getUserPassword)
            }).catch(function(errors){
                callback(["databaseError"], null)
            })
        },

        createAccount: function(Username, Email, UserPassword, callback){
            
            accounts.Account.create({username: Username, email: Email, userPassword: UserPassword}).then(function(createAccount){
                callback([], createAccount)
            }).catch(function(errors){
                callback(["databaseError"], null)
            })
        }
    }
}