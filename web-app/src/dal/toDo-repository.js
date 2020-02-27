const db = require('./db')

exports.getAllToDos = function(callback) {

    const query = "SELECT * FROM todoList"
    db.query(query, function(error, toDoList){
        if(error){
            callback(["DatabaseError"], null)
        }else{
            callback([], toDoList)
        }
    })
}

exports.createTodo = function(todo, callback) {

    const query = "INSERT INTO todoList (todo) VALUES (?)"
    const values = [todo]
    db.query(query, values, function(error, newTodo){
        if(error){
            callback(["DatabaseError"], null)
        }else{
            callback([], newTodo)
        }
    })
}