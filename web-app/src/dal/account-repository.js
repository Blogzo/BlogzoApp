const db = require('./db')

exports.createAccount = function(username, email, userPassword, callback){

    const query = "INSERT INTO accounts (username, email, userPassword) VALUES (?, ?, ?)"
    const values = [username, email, userPassword]
    console.log("values:", values)
    db.query(query, values, function(error, results){
        console.log("results:", results)
        if(error){
            callback("DatabaseError", null)
        }else{
            callback(null, results.insertId)
        }
    })
}

exports.getAccount = function(username, userPassword, callback){

    const query = "SELECT * FROM accounts WHERE username = ? AND userPassword = ?"
    const values = [username, userPassword]

    db.query(query, values, function(error, account){

        if(error){
            callback("DatabaseError", null)
        }else{
            callback(null, account)
        }
    })
}

exports.getAllAccounts = function(callback){

    const query = "SELECT * FROM accounts ORDER BY username"
    db.query(query, function(error, accounts){

        if(error){
            callback("DatabaseError", null)
        }else{
            callback([], accounts)
        }
    })
}