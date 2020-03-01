const sequelize = require('./squelizedb')
const Sequelize = require('sequelize')

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

const toDo = sequelize.define('toDoList', {

    toDo: Sequelize.TEXT
})

Blogpost.belongsTo(Account)

module.exports = {

    Blogpost: Blogpost,
    Account: Account,
    toDo: toDo
}