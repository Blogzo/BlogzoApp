const db = require('./db')

module.exports = function({}){

    return {

        createAccount: function(username, email, userPassword, callback){

            const query = "INSERT INTO accounts (username, email, userPassword) VALUES (?, ?, ?)"
            const values = [username, email, userPassword]
            console.log("values:", values)
            db.query(query, values, function(errors, results){
                if(errors){
                    callback(["DatabaseError"], null)
                }else{
                    callback([], results.insertId)
                }
            })
        },

        getAccount: function(username, userPassword, callback){

            const query = "SELECT * FROM accounts WHERE username = ? AND userPassword = ?"
            const values = [username, userPassword]
        
            db.query(query, values, function(errors, account){
        
                if(errors){
                    callback(["DatabaseError"], null)
                }else{
                    callback([], account)
                }
            })
        },


        getUserPassword: function(username, callback){

            const query = "SELECT userPassword FROM accounts WHERE username = ?"
            const value = [username]

            db.query(query, value, function(errors, userPassword){

                if(errors){
                    callback(["DatabaseError"], null)
                }else{
                    callback([], userPassword)
                }
            })
        },

        getAccountById: function(id){

            const query = "SELECT * FROM accounts WHERE id = ?"
            const value = [id]
            db.query(query, value, function(errors, account){
                if(errors){
                    callback(["DatabaseError"], null)
                }else{
                    callback([], account)
                }
            })
        }
    }
}

