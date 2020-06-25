const db = require('./db')

module.exports = function({}){

    return {

        createAccount: function(accountUsername, accountEmail, userPassword, callback){

            const query = "INSERT INTO accounts (accountUsername, accountEmail, accountPassword) VALUES (?, ?, ?)"
            const values = [accountUsername, accountEmail, userPassword]
            db.query(query, values, function(errors, results){
                
                if(errors){
                    console.log("errorsDAL", errors)
                    callback(["databaseError"], null)
                }else{
                    console.log("resultDAL", results)
                    callback([], results.insertId)
                }
            })
        },

        getLoginInformation: function(username, callback){

            const query = "SELECT accountPassword, accountId FROM accounts WHERE accountUsername = ?"
            const value = [username]
            console.log("DAL");
            
            db.query(query, value, function(errors, userPassword){
                if(errors){
                    callback(["databaseError"], null)
                }else{
                    console.log("userPasswordDAL", userPassword);
                    callback([], userPassword[0])
                }
            })
        },

        getAccountId: function(username, callback){

            const query = "SELECT accountId FROM accounts WHERE accountUsername = ?"
            const value = [username]

            db.query(query, value, function(errors, accountId){
                console.log("accountIdSEQ", accountId[0].accountId);
                   
                if(errors){
                    callback(["databaseError", null])
                }else{
                    callback([], accountId[0].accountId)
                }
            })
        }
    }
}

