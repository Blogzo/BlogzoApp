const Sequelize = require('sequelize')
const { DATABASE_NAME, USERNAME, ROOT, PASSWORD, PORT, HOST, DIALECT } = require('./constants')

const sequelize = new Sequelize({
    database: DATABASE_NAME,
    root: ROOT,
    password: PASSWORD,
    host: HOST,
    port: PORT,
    dialect: DIALECT,
    username: USERNAME,

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
})

sequelize.authenticate().then(() => {
    console.log('Connection established successfully.')
}).catch( error => {
    console.log("Error establishing connection with sequelize:", error)
})

module.exports = sequelize