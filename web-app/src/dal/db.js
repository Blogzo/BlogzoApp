const mysql = require('mysql')

var connection = mysql.createConnection ({
    host: 'database',
    user: 'root',
    port: '3306',
    password: 'abc123',
    //socketPath: '/var/run/mysqld/mysqld.sock',
    database: 'myDB'
})


module.exports = connection



