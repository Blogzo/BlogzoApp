const { DATABASE_NAME, ROOT, PASSWORD, PORT, HOST, DIALECT } = require('./constants')

const sequelize = new Sequelize({
    database: DATABASE_NAME,
    root: ROOT,
    password: PASSWORD,
    host: HOST,
    port: PORT,
    dialext: DIALECT
})

module.exports = sequelize