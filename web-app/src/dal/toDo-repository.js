const db = require('./db')

module.exports = function({}){

    return {

        getAllToDosForAccount: function(userId, callback){

            const query = "SELECT * FROM todoItems WHERE userId = ?"
            const values = [userId]
           
            db.query(query, values, function(error, toDoList){
                if(error){
                    callback(["databaseError"], null)
                }else{
                    callback([], toDoList)
                }
            })
        },

        createTodo: function(todo, userId, callback){

            const query = "INSERT INTO todoItems (todo, accountId) VALUES (?,?)"
            const values = [todo, userId]
            
            db.query(query, values, function(error, newTodo){
                if(error){
                    callback(["databaseError"], null)
                }else{
                    callback([], newTodo)
                }
            })
        },

        deleteTodo: function(todo, callback){
            
            const query = "DELETE FROM todoItems (todo) VALUES (?)"
            const values = [todo]
            
            db.query(query, values, function(error, deletedToDo){
                if(error){
                    callback(["databaseError"], null)
                }else{
                    callback([], deletedToDo)
                }
            })
        },
        
        getToDoId: function(todoId, callback){
            
            const query = "SELECT todo FROM todoItems WHERE todoId = ?"
            const values = [todoId]
            
            db.query(query, values, function(error, todo){
                if(error){
                    callback(["databaseError"], null)
                }else{
                    callback([], todo)
                }
            })
        },

        updateTodo: function(todoId, todo, callback){
            
            const query = "UPDATE todoItems SET todo = ? WHERE TodoId = ?"
            const values = [todoId, todo]
            
            db.query(query, values, function(error, newTodo){
                if(error){
                    callback(["databaseError"], null)
                }else{
                    callback([], newTodo)
                }
            })
        }
    }
}

