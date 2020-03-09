const db = require('./db')

module.exports = function({}){

    return {

        getAllToDos: function(callback){

            const query = "SELECT * FROM todoList"
            db.query(query, function(error, toDoList){
                if(error){
                    callback(["databaseError"], null)
                }else{
                    callback([], toDoList)
                }
            })
        },

        createTodo: function(todo, callback){

            const query = "INSERT INTO todoList (todo) VALUES (?)"
            const values = [todo]
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

