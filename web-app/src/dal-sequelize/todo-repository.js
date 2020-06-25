const toDos = require('./defineTables')

module.exports = function({}){

    return {

        getAllToDosForAccount: function(UserId, callback){
            
            toDos.toDo.findAll({
                raw: true,
                where: {accountId: UserId}
            })
            .then(getAllToDos => callback([], getAllToDos))
            .catch(error => callback(["databaseError"], null)) 
        },

        createTodo: function(UserId, todo, callback){
            
            toDos.toDo.create({toDo: todo, accountId: UserId})
            .then(newTodo => callback(null, newTodo))
            .catch(errors => callback(["databaseError"], null))
        },

        getToDoId: function(todoId, callback){
            
            toDos.toDo.findByPk(todoId)
            .then(todo => callback([], todo))
            .catch(errors => callback(["databaseError"], null))
        },

        deleteTodo: function(todoID, callback){
            
            toDos.toDo.destroy({
                where: { todoId: todoID }
            })
            .then(deletedToDo => callback([], deletedToDo))
            .catch(errors => callback(["databseError"], null))
        },

        updateTodo: function(todoID, newTodo, callback){
            
            toDos.toDo.update({toDo: newTodo}, {where: {todoId: todoID}})
            .then(updateTodo => callback([], this.updateTodo))
            .catch(errors => callback(["databaseError"], null))
        }
    }
}