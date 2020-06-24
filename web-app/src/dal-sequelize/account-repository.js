const accounts = require('./defineTables')

module.exports = function({}){

    return {

        getUserPassword: function(Username, callback){
            
            accounts.Account.findAll({
                where: { accountUsername: Username }
            })
            .then(accountPassword => callback([], accountPassword[0].dataValues))
            .catch(errors => callback(["databaseError"], null))
        },

        createAccount: function(Username, Email, UserPassword, callback){
            
            accounts.Account.create({
                accountUsername: Username, accountEmail: Email, accountPassword: UserPassword
            })
            .then(createAccount => callback(null, createAccount.dataValues))
            .catch(error => callback(["databaseError"], null))
        },

        getAccountId: function(id, callback){
            accounts.Account.findAll({
                where: {accountId : id}
            })
            .then(userId => callback(null, userId[0].dataValues.accountId))
            .catch(error => callback(["databaseError"], null))
        }
    }
}