const accounts = require('./defineTables')

module.exports = function({}){

    return {

        getLoginInformation: function(Username, callback){
            
            accounts.Account.findAll({
                where: { accountUsername: Username }
            })
            .then(account => callback([], account[0].dataValues))
            .catch(errors => callback(["databaseError"], null))
        },

        createAccount: function(Username, Email, UserPassword, callback){
            console.log("Sequelize");
            
            accounts.Account.create({
                accountUsername: Username, accountEmail: Email, accountPassword: UserPassword
            })
            .then(createAccount => callback([], createAccount.dataValues.accountId))
            .catch(error => callback(["databaseError"], null))
        },

        getAccountId: function(id, callback){
            accounts.Account.findAll({
                where: {accountId : id}
            })
            .then(account => callback([], account[0].dataValues.accountId))
            .catch(error => callback(["databaseError"], null))
        }
    }
}