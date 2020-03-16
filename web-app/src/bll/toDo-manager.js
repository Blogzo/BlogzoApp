
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
                callback(0, errors)
                return
            }else{
                toDoRepository.getAllToDos(function(toDos, errors){
                    callback(toDos, errors)
                })
            }
        },

        createTodo: function(newTodo, isLoggedIn, callback){

            const errors = this.getValidationErrors(newTodo, isLoggedIn)
            if(errors.length > 0){
                callback(0, errors)
                return
            }
            if(isLoggedIn){
                toDoRepository.createTodo(newTodo, function(todo, errors){
                    callback(todo, errors)
                })
            }
        },
        deleteToDo: function(deletedToDo, isLoggedIn, callback){

            const errors = this.getValidationErrors(0, isLoggedIn)
            if(errors.length > 0){
                console.log("errorsDeleteBLL:", errors)
                callback([], errors)
            }else{
                toDoRepository.deleteToDo(deletedToDo, function(todo, errors){
                    callback(todo, errors)
                })
            }
        }
    }
}

