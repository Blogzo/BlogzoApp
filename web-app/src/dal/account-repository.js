const db = require('./db')

module.exports = function({}){

    return {

        createAccount: function(username, email, userPassword, callback){

            const query = "INSERT INTO accounts (username, email, userPassword) VALUES (?, ?, ?)"
            const values = [username, email, userPassword]
            
            db.query(query, values, function(errors, results){
                
                if(errors){
                    callback(["databaseError"], null)
                }else{
                    callback([], results.insertId)
                }
            })
        },

        getUserPassword: function(username, callback){

            const query = "SELECT userPassword FROM accounts WHERE username = ?"
            const value = [username]

            db.query(query, value, function(errors, userPassword){

                if(errors){
                    callback(["databaseError"], null)
                }else{
                    callback([], userPassword)
                }
            })
        }
    }
}

