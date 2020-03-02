const sequelize = require('./squelizedb')
const Sequelize = require('sequelize')

const Blogpost = sequelize.define('blogposts', {

    title: Sequelize.TEXT,
    content: Sequelize.TEXT,
    posted: Sequelize.TEXT,
    imageFile: Sequelize.TEXT
})
Blogpost.sync().then(() => {
    console.log("Blogposts table created!")
})

const Account = sequelize.define('accounts', {

    username: Sequelize.TEXT,
    email: Sequelize.TEXT,
    userPassword: Sequelize.TEXT
})
Account.sync().then(() => {
    console.log("Acounts table created!")
})

const toDo = sequelize.define('toDoList', {

    toDo: Sequelize.TEXT
})
toDo.sync().then(() => {
    console.log("toDoLists table created!")
})

Blogpost.belongsTo(Account)

module.exports = {

    Blogpost: Blogpost,
    Account: Account,
    toDo: toDo
}