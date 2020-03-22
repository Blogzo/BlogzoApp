const db = require('./db')

module.exports = function({}){

    return {

        getAllToDos: function(userId, callback){

            const query = "SELECT * FROM todoList WHERE userId = ?"
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

            const query = "INSERT INTO todoList (todo, userId) VALUES (?,?)"
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
            
            const query = "DELETE FROM todoList (todo) VALUES (?)"
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
            
            const query = "SELECT todo FROM todoList WHERE todoId = ?"
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
            
            const query = "UPDATE todoLists SET todo = ? WHERE TodoId = ?"
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

