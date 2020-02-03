const mysql = require('mysql')
var db = mysql.createConnection ({
    host: '192.168.99.100',
    user: 'root',
    port: '3306',
    password: 'abc123',
    database: 'myDB'
})

exports.createAccount  = function(callback) {
    const query = "INSERT INTO accounts (id, username, email, userPassword) VALUES (?, ?, ?, ?)"
    const values = [id, username, email, userPassword]
    db.r
    
}


