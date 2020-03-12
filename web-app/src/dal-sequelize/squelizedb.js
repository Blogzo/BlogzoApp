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

function connection(sqlizeObj, isConnected){
    if(!isConnected){
      setTimeout(function(){
        sqlizeObj.authenticate().then(()=>{
          sqlizeObj.sync()
          console.log('Connection has been established successfully.')
          isConnected = true
          return
        })
        .catch(error =>{
          connection(sqlizeObj,false)
          console.error('Unable to connect to the database:', error)
        })
      }, 1000) 
    }
}
   
connection(sequelize, false)

module.exports = sequelize