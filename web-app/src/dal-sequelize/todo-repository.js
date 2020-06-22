const toDos = require('./defineTables')

module.exports = function({}){

    return {

        getAllToDosForAccount: function(UserId, callback){
            
            toDos.toDo.findAll({
                where: {userId: UserId}
            }).then(function(getAllToDos){
                callback([], getAllToDos)
            }).catch(function(errors){
                callback(errors, [])
            })
        },

        createTodo: function(UserId, todo, callback){
            
            toDos.toDo.create({toDo: todo, userId: UserId}).then(function(newTodo){
                callback(null, newTodo)
            }).catch(function(errors){
                callback(errors, [])
            })
        },

        getToDoId: function(todoId, callback){
            
            toDos.toDo.findByPk(todoId).then(function(todo){
                callback([], todo)
            }).catch(function(errors){
                callback(errors, [])
            })
        },

        deleteTodo: function(todoID, callback){
            
            toDos.toDo.destroy({
                where: { todoId: todoID }
            }).then(function(deletedToDo){
                callback([], deletedToDo)
            }).catch(function(errors){
                callback(errors, [])
            })
        },

        updateTodo: function(todoID, newTodo, callback){
            
            toDos.toDo.update({toDo: newTodo}, {where: {todoId: todoID}}).then(function(updateTodo){
                callback([], updateTodo)
            }).catch(function(errors){
                callback(errors, [])
            })
        }
    }
}