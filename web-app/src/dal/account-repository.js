const db = require('./db')

module.exports = function({}){

    return {

        createAccount: function(username, email, userPassword, callback){

            const query = "INSERT INTO accounts (accountUsername, accountEmail, accountPassword) VALUES (?, ?, ?)"
            const values = [username, email, userPassword]
            console.log("jag är här");
            db.query(query, values, function(errors, results){
                
                if(errors){
                    console.log(errors);
                    callback(["databaseError"], null)
                }else{
                    callback([], results.insertId)
                }
            })
        },

        getUserPassword: function(username, callback){

            const query = "SELECT accountPassword FROM accounts WHERE accountUsername = ?"
            const value = [username]
            
            db.query(query, value, function(errors, userPassword){
                if(errors){
                    callback(["databaseError"], null)
                }else{
                    callback([], userPassword)
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

