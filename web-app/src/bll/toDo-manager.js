const toDoRepository = require('../dal/toDo-repository')


function getValidationErrors(name){

    const errors = []

    if(name.length == 0){
        errors.push("Need to write something!")
    }
    else if(name.length <= 5){
        errors.push("Name to short!")
    }
    else if(name.length >= 20){
        errors.push("Name to long!")
    }
    return errors
}


exports.getAllToDos = function(isLoggedIn, callback){
    if(isLoggedIn){
        toDoRepository.getAllToDos(function(errors, toDos){
            callback(errors, toDos)
        })
    }
}


exports.createTodo = function(newTodo, isLoggedIn, callback){
    
    const errors = getValidationErrors(newTodo)
    if(errors.length > 0){
        callback(errors)
        return
    }

    if(isLoggedIn){
        toDoRepository.createTodo(newTodo, function(errors, todo){
            callback(errors, todo)
        })
    }else{
        throw "Unauthorized!"
    }
}