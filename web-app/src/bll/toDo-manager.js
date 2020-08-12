
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
            console.log("createTodoUserIds", userId);
            if(errors.length > 0){
                callback(errors, [])
                return
            }else{                
                accountRepository.getAccountId(accountUsername, function(errors, accountId){
                    console.log("accountIdSOmwhfdkjsa", accountId);
                    if(accountId != userId){
                        console.log("IAMHERE!!");
                        const error = ["Unauthorized"]
                        callback(error)
                        console.log(error,"errorTodo");
                    }else{
                        console.log("NOIMHERE!");
                        toDoRepository.createTodo(accountId, newTodo, function(errors, todo){
                            console.log("bllerror", errors);
                            callback(errors, todo)
                            
                        })
                    }
                })
            }
        },

        deleteTodo: function(todoId, userId, accountUsername, isLoggedIn, callback){

            const errors = this.getErrors(0, isLoggedIn)
            
            if(errors.length > 0){
                callback(errors, [])
                return
            }else{  
                accountRepository.getAccountId(accountUsername, function(errors, accountId){
            
                    if(accountId != userId){
                        const error = ["Unauthorized"]
                        callback(error)
                    }else{
                        toDoRepository.deleteTodo(todoId, function(errors, todo){
                    
                            callback(errors, todo)
                        })
                    }
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

