
module.exports = function({toDoRepository}){

    return {

        getValidationErrors: function(name, isLoggedIn){

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
            else if(!isLoggedIn){
                errors.push("Need to be logged in!")
            }
            return errors

        },

        getAllToDos: function(isLoggedIn, callback){
            const errors = this.getValidationErrors(0, isLoggedIn)
            if(errors.length > 0){
                console.log("errortodoBLL:", errors)
                callback(errors, [])
                return
            }else{
                toDoRepository.getAllToDos(function(errors, toDos){
                    callback(errors, toDos)
                })
            }
        },

        createTodo: function(newTodo, isLoggedIn, callback){

            const errors = this.getValidationErrors(newTodo, isLoggedIn)
            if(errors.length > 0){
                callback(errors, [])
                return
            }
            if(isLoggedIn){
                toDoRepository.createTodo(newTodo, function(errors, todo){
                    callback(errors, todo)
                })
            }
        },
        deleteToDo: function(deletedToDo, isLoggedIn, callback){

            const errors = this.getValidationErrors(deletedToDo, isLoggedIn)
            if(errors.length > 0){
                console.log("errorsDeleteBLL:", errors)
                callback([], errors)
            }else{
                toDoRepository.deleteToDo(deletedToDo, function(errors, todo){
                    callback(errors, todo)
                })
            }
        }
    }
}

