const mysql = require('mysql')

var connection = mysql.createConnection ({
    host: 'database',
    user: 'root',
    port: '3306',
    password: 'abc123',
    database: 'myDB'
})


module.exports = connection



