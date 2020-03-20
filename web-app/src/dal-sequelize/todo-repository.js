const toDos = require('./defineTables')

module.exports = function({}){

    return {

        getAllToDos: function(callback){
            toDos.toDo.findAll().then(function(getAllToDos){
                console.log("allTodosSEQ:", getAllToDos)
                callback([], getAllToDos)
            }).catch(function(errors){
                console.log(errors)
                callback(errors, [])
            })
        },

        getToDoById: function(todoId, callback){
            toDos.toDo.findByPk(todoId).then(function(toDo){
                console.log("toDoSEQ", toDo)
                callback([], toDo)
            }).catch(function(errors){
                console.log(errors)
                callback(errors, [])
            })
        },

        createTodo: function(todo, callback){
            toDos.toDo.create({toDo: todo}).then(function(newTodo){
                console.log("newTodoSEQ:", newTodo)
                callback([], newTodo)
            }).catch(function(errors){
                console.log(errors)
                callback(errors, [])
            })
        },

        deleteTodo: function(callback){
            toDos.toDo.destroy({
                where: {},
                truncate: true
            }).then(function(deletedToDo){
                console.log("deleteToDoSEQ:", deletedToDo)
                callback([], deletedToDo)
            }).catch(function(errors){
                console.log(errors)
                callback(errors, [])
            })
        },
        updateTodo: function(todo, callback){
            toDos.toDo.update({toDo: todo}).then(function(updateTodo){
                console.log("updateToDoSEQ:", updateTodo)
                callback([], updateTodo)
            }).catch(function(errors){
                console.log(errors)
                callback(errors, [])
            })
        }
    }
}