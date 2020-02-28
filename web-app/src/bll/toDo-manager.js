
module.exports = function({toDoRepository}){

    return {

        getValidationErrors: function(name){

            const errors = []

            if(name.length == 0){
                errors.push("Need to write something!")
            }
            else if(name.length < 5){
                errors.push("Name to short!")
            }
            else if(name.length > 20){
                errors.push("Name to long!")
            }
            return errors

        },

        getAllToDos: function(isLoggedIn, callback){

            if(isLoggedIn){
                toDoRepository.getAllToDos(function(errors, toDos){
                    callback(errors, toDos)
                })
            }
        },

        createTodo: function(newTodo, isLoggedIn, callback){

            const errors = this.getValidationErrors(newTodo)
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
    }
}

