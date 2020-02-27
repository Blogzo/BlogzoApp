const db = require('./db')

exports.createAccount = function(username, email, userPassword, callback){

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
}

exports.getAccount = function(username, userPassword, callback){

    const query = "SELECT * FROM accounts WHERE username = ? AND userPassword = ?"
    const values = [username, userPassword]

    db.query(query, values, function(errors, account){

        if(errors){
            callback(["DatabaseError"], null)
        }else{
            callback([], account)
        }
    })
}

exports.getAccountById = function(id){

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


