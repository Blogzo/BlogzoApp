const sequelize = require('./squelizedb')
const Sequelize = require('sequelize')

const Blogpost = sequelize.define('blogposts', {
    
    blogId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: Sequelize.TEXT,
    content: Sequelize.TEXT,
    posted: Sequelize.TEXT,
    imageFile: Sequelize.TEXT
}, {
    timestamps: false
})

Blogpost.sync().then(() => {
    
    console.log("Blogposts table created!")
})

const Account = sequelize.define('accounts', {
    
    personId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
    },
    email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
    },
    userPassword: Sequelize.TEXT
}, {
    timestamps: false
})

Account.sync().then(() => {
    
    console.log("Accounts table created!")
})

const toDo = sequelize.define('toDoLists', {
    
    todoId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    toDo: Sequelize.TEXT
}, {
    timestamps: false
})

toDo.sync().then(() => {
    
    console.log("toDoLists table created!")
})

Blogpost.belongsTo(Account, {foreignKey: "userId", foreignKeyConstraint: true})

module.exports = {

    Blogpost: Blogpost,
    Account: Account,
    toDo: toDo
}