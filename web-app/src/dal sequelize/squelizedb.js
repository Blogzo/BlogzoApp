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
console.log("sequelize:", sequelize)

const Blogpost = sequelize.define('blogposts', {

    title: Sequelize.TEXT,
    content: Sequelize.TEXT,
    posted: Sequelize.TEXT,
    imageFile: Sequelize.TEXT
})

const Account = sequelize.define('accounts', {

    username: Sequelize.TEXT,
    email: Sequelize.TEXT,
    userPassword: Sequelize.TEXT
})

const ToDo = sequelize.define('todoList', {

    todo: Sequelize.TEXT
})

Blogpost.belongsTo(Account)

module.exports = sequelize