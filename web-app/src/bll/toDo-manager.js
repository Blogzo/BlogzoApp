
module.exports = function({toDoRepository, accountRepository}){

    return {

        getErrors: function(name, isLoggedIn){

            const errors = []

            if(name.length < 5){
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

        getAllToDosForAccount: function(accountId, isLoggedIn, callback){
            
            const errors = this.getErrors(0, isLoggedIn)
            
            if(errors.length > 0){
                callback(errors)
                return
            }else{
                toDoRepository.getAllToDosForAccount(accountId, function(errors, toDos){
                   
                    callback(errors, toDos)
                })
            }
        },

        getToDoItem: function(todoId, isLoggedIn, callback){
            
            const errors = this.getErrors(0, isLoggedIn)
            
            if(errors.length > 0){
                callback(errors, [])
                return
            }else{
                toDoRepository.getToDoItem(todoId, function(errors, todo){
                   
                    callback(errors, todo)
                })
            }   
        },

        createTodo: function(userId, newTodo, accountUsername, isLoggedIn, callback){
            
            const errors = this.getErrors(newTodo, isLoggedIn)
            
            if(errors.length > 0){
                callback(errors, [])
                return
            }else{                
                accountRepository.getAccountId(accountUsername, function(errors, accountId){
        
                    if(accountId != userId){
                        const error = ["Unauthorized"]
                        callback(error)
                    }else{
                        toDoRepository.createTodo(accountId, newTodo, function(errors, todo){
                            callback(errors, todo)
                        })
                    }
                })
            }
        },

        deleteTodo: function(todoId, isLoggedIn, callback){

            const errors = this.getErrors(0, isLoggedIn)
            
            if(errors.length > 0){
                callback(errors, [])
                return
            }else{  
                toDoRepository.deleteTodo(todoId, function(errors, todo){
            
                    callback(errors, todo)
                })
            }
        },

        updateTodo: function(todoId, userId, updateTodo, accountUsername, isLoggedIn, callback){
            
            const errors = this.getErrors(updateTodo, isLoggedIn)
            
            if(errors.length > 0){
                callback(errors, [])
            }else{
                accountRepository.getAccountId(accountUsername, function(errors, accountId){
            
                    if(accountId != userId){
                        const error = ["Unauthorized"]
                        callback(error)
                    }else{
                        toDoRepository.updateTodo(todoId, updateTodo, function(errors, todo){
                    
                            callback(errors, todo)
                        })
                    }
                })
            }
        }
    }
}

