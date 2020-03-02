const Sequelize = require('sequelize')
const { DATABASE_NAME, ROOT, PASSWORD, PORT, HOST, DIALECT } = require('./constants')

const sequelize = new Sequelize({
    database: DATABASE_NAME,
    root: ROOT,
    password: PASSWORD,
    host: HOST,
    port: PORT,
    dialext: DIALECT
})

sequelize.authenticate().then(() => {
    console.log('Connection established successfully.')
}).catch( error => {
    console.log("Error establishing connection with sequelize:", error)
}).finally(() => {
    sequelize.close()
})

module.exports = sequelize