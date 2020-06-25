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

        getUserPassword: function(username, callback){

            const query = "SELECT accountPassword FROM accounts WHERE accountUsername = ?"
            const value = [username]
            console.log("DAL");
            
            db.query(query, value, function(errors, userPassword){
                if(errors){
                    callback(["databaseError"], null)
                }else{
                    console.log("userPasswordDAL", userPassword[0].accountPassword);
                    callback([], userPassword[0].accountPassword)
                }
            })
        },

        getAccountId: function(username, callback){

            const query = "SELECT accountId FROM accounts WHERE accountUsername = ?"
            const value = [username]

            db.query(query, value, function(errors, accountId){

                if(errors){
                    callback(["databaseError", null])
                }else{
                    callback([], accountId)
                }
            })
        }
    }
}

