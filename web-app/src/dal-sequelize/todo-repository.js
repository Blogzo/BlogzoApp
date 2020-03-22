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

        createTodo: function(todo, callback){
            
            toDos.toDo.create({toDo: todo}).then(function(newTodo){
                console.log("newTodoSEQ:", newTodo)
                callback([], newTodo)
            }).catch(function(errors){
                console.log("errorsSEQ", errors)
                callback(errors, [])
            })
        },

        getToDoId: function(todoId, callback){
            
            toDos.toDo.findByPk(todoId).then(function(todo){
                console.log("todoListsSEQ:", todo)
                callback([], todo)
            }).catch(function(errors){
                console.log(errors)
                callback(errors, [])
            })
        },

        deleteTodo: function(todoID, callback){
            
            toDos.toDo.destroy({
                where: { todoId: todoID }
            }).then(function(deletedToDo){
                console.log("deleteToDoSEQ:", deletedToDo)
                callback([], deletedToDo)
            }).catch(function(errors){
                console.log(errors)
                callback(errors, [])
            })
        },

        updateTodo: function(todoID, newTodo, callback){
            
            toDos.toDo.update({toDo: newTodo}, {where: {todoId: todoID}}).then(function(updateTodo){
                console.log("updateToDoSEQ:", updateTodo)
                callback([], updateTodo)
            }).catch(function(errors){
                console.log(errors)
                callback(errors, [])
            })
        }
    }
}