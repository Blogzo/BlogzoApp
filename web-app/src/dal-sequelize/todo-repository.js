const toDos = require('./defineTables')

module.exports = function({}){

    return {

        getAllToDos: function(callback){
            toDos.toDo.findAll().then(function(getAllToDos){
                console.log(getAllToDos)
                callback(getAllToDos)
            }).catch(function(errors){
                console.log(errors)
                callback(errors)
            })
        },

        createTodo: function(Todo, callback){
            toDos.toDo.create({todo: Todo}).then(function(createTodo){
                console.log(createTodo)
                callback(createTodo)
            }).catch(function(errors){
                console.log(errors)
                callback(errors)
            })
        }

    }
}