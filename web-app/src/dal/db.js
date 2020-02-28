const mysql = require('mysql')

var connection = mysql.createConnection ({
    host: '192.168.99.100',
    user: 'root',
    port: '3306',
    password: 'abc123',
    database: 'myDB'
})


module.exports = connection



