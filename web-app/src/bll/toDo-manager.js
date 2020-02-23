const toDoRepository = require('../dal/toDo-repository')

exports.getAllToDos = function(callback){

    toDoRepository.getAllToDos(function(errors, toDos){
        callback(errors, toDos)
    })
}

exports.createTodo = function(callback){
    callback(errors, newTodo)
}