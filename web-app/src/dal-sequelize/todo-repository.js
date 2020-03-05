const toDos = require('./defineTables')

module.exports = function({}){

    return {

        getAllToDos: function(callback){
            toDos.toDo.findAll().then(function(getAllToDos){
                console.log("allTodosSEQ:", getAllToDos)
                callback(getAllToDos, [])
            }).catch(function(errors){
                console.log(errors)
                callback(null, errors)
            })
        },

        createTodo: function(todo, callback){
            toDos.toDo.create({toDo: todo}).then(function(newTodo){
                console.log("newTodoSEQ:", newTodo)
                callback(newTodo, [])
            }).catch(function(errors){
                console.log(errors)
                callback(null, errors)
            })
        }

    }
}