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
})

const Account = sequelize.define('accounts', {
    
    accountId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    accountUsername: {
        type: Sequelize.STRING(50),
        allowNull: false,
        
    },
    accountEmail: {
        type: Sequelize.STRING(50),
        allowNull: false,
        
    },
    accountPassword: Sequelize.TEXT
}, {
    timestamps: false
})

Account.sync().then(() => {
})

const toDo = sequelize.define('todoItems', {
    
    todoId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    todo:{type: Sequelize.TEXT
    }
}, {
    timestamps: false
})

toDo.sync().then(() => {
})

Blogpost.belongsTo(Account, {foreignKey: "accountId", foreignKeyConstraint: true})
toDo.belongsTo(Account, {foreignKey: "accountId", foreignKeyConstraint: true})

module.exports = {

    Blogpost: Blogpost,
    Account: Account,
    toDo: toDo
}