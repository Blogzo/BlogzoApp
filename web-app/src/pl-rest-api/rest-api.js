
const express = require('express')
const jwt = require('jsonwebtoken')

module.exports = function({accountManager, blogManager, toDoManager}){

    const router = express.Router()
    const serverSecret = "sdfkjdslkfjslkfd"

    var authorization = function(request, response, next){
        
        try{

            const authorizationHeader = request.get('authorization')
            const accessToken = authorizationHeader.substr("Bearer ".length)
            
            jwt.verify(accessToken, serverSecret, function(error, decoded){
                if(error){
                    response.status(401).end()
                }else{
                    next()
                }
            }) 
        }catch(error){
            response.status(401).end()
            return
        }
    }

    router.get("/toDoItems/:accountId", authorization, function(request, response){
        
        const isLoggedIn = true
        const accountId = request.params.accountId
        console.log("accountIdRESTAPI", accountId);
        

        toDoManager.getAllToDosForAccount(accountId, isLoggedIn, function(errors, toDos){
            
            if(errors.length > 0){
                if(errors.includes("databaseErrors")){
                    response.status(500).end()
                }
                else if(errors.includes("Needs to be logged in!")){
                    response.status(401).end()   
                }
            }else{
                console.log("toDos", toDos);
                
                response.status(200).json(toDos)
            }
        })
    })

    router.put("/toDoItems/:todoId", authorization, function(request, response){
        
        const todo = request.body.todo
        const todoId = request.params.todoId
        const userId = request.body.accountId
        const accountUsername = request.body.accountUsername
        console.log("accountusernameUpdateREST", accountUsername);
        console.log("todoIdUpdateREST", todoId);
        console.log("userIdUpdateREST", userId);
        
        const isLoggedIn = true
        
        toDoManager.updateTodo(userId, todoId, todo, accountUsername, isLoggedIn, function(errors, newTodo){
            console.log("newTodoUpdateREST", newTodo);
            
            if(errors.length > 0){
                if(errors.includes("databaseError")){
                    response.status(500).end()
                }
                else if(errors.includes("Need to be logged in!")){
                    response.status(401).end()
                }
                else if(!newTodo){
                    response.status(404).end()
                }
                else{
                    response.status(400).json({ errors })
                }
            }else{
                response.status(204).end()
            }
        })
    })

    router.get("/toDoItems/:userId/:todoId", authorization, function(request, response){
        
        const todoId = request.params.todoId  
        const isLoggedIn = true
        
        toDoManager.getToDoId(todoId, isLoggedIn, function(errors, todo){

            if(errors.length > 0){
                if(errors.includes("databaseError")){
                    response.status(500).end()
                }
                else if(errors.includes("Need to be logged in!")){
                    response.status(401).end()
                }
            }else{
                response.status(200).json(todo)
            }
        })
    })

    router.post("/toDoItems", authorization, function(request, response){

        const todo = request.body.todo
        const userId = request.body.userId
        const accountUsername = request.body.accountUsername
        console.log("userIdREST", userId);
        console.log("accountUsernameREST", accountUsername);
        
        
        toDoManager.createTodo(userId, todo, accountUsername, function(errors, newTodo){
            
            if(errors){
                if (errors.includes("databaseError")){
                    response.status(500).end()
                }
                else if(errors.includes("Need to be logged in!")){
                    response.status(401).end()
                }else{
                    response.status(400).json(errors)
                }
            }else{
                response.setHeader("Location", "/toDoItems/"+newTodo)
                response.status(201).end()
            }
        })
    })

    router.delete("/toDoItems/:todoId", authorization, function(request, response){
        
        const todoId = request.params.todoId
        console.log("todoIdDeleteREST", todoId);
        
        const isLoggedIn = true
        
        toDoManager.deleteTodo(todoId, isLoggedIn, function(errors, deletedToDo){
            
            if(errors.length > 0){
                if(errors.includes("databaseError")){
                    response.status(500).end()
                }
                else if(errors.includes("Need to be logged in!")){
                    response.status(401).end()
                }
                else if(!deletedToDo){
                    response.status(404).end()
                }
            }else{
                response.status(204).end()
            }
        })
    })

    router.post("/create-account", function(request, response){
        
        const email = request.body.email
        const username = request.body.username
        const userPassword = request.body.userPassword
        const userPassword2 = request.body.userPassword2
        
        accountManager.createAccount(username, email, userPassword, userPassword2, function(errors, account){
            
            if(errors){
                if(errors.includes('databaseError')){
                    response.status(500).end()
                }
                else if(errors.includes('email must be unique!')){
                    response.status(400).json({ errors })
                }
                else if(errors.includes('Username already exists!')){
                    response.status(400).json({ errors })
                }
                else if(errors.includes('Password do not match!')){
                    response.status(400).json({ errors })
                }
            }else{
                const payload = {userId: account.personId, "username": account.username, "password": account.userPassword}
                jwt.sign(payload, serverSecret, function(error, result){
                    
                    if(error){
                        response.status(500).end()
                    }else{
                        response.status(201).json({
                            access_token: result
                        })
                    }
                })
            }
        })  
    })
   
    router.post("/login", function(request, response){

        const grantType = request.body.grant_type
        const username = request.body.Username
        const userPassword = request.body.userPassword
        
        if(grantType != "password"){
            response.status(400).json({error: "unsupported_grant_type", error_description: "The authorization grant type is not supported by the authorization server."})
            return
        }

        accountManager.getLoginInformation(username, userPassword, function(errors, account){
            if(errors){
                if(errors.includes('DatabaseError')){
                    response.status(500).end()
                }
                else if(errors.includes('Username do not exists')){
                    response.status(400).json({ errors })
                }
                else if(errors.includes('Wrong password')){
                    response.status(400).json({ errors })
                }
            }
            else if(!account){
                response.status(404).end()
            }else {
                const payload = {accountId: account.accountId, "accountUsername": username, "accountPassword": userPassword}
                jwt.sign(payload, serverSecret, function(error, result){
                    
                    if(error){
                        response.status(404).json({error: "invalid_grant"})
                    }else{
                        response.status(200).json({
                            access_token: result,
                            id_token: payload
                        })
                    }
                })
            }
        })
    })

    router.get("/blogposts", function(request, response){
        
        blogManager.getAllBlogposts(function(errors, blogposts){
            
            if(errors.length > 0){
                if(errors.includes("databaseError")){  
                    response.status(500).end()
                }            
            }else{
                response.status(200).json(blogposts)
            }
        })
    })

    router.get("/blogposts/:blogId", authorization, function(request, response){
        
        const blogId = request.params.blogId  
        const isLoggedIn = true
        
        blogManager.getBlogpostById(blogId, isLoggedIn, function(errors, blogpost){
            
            if(errors.length > 0){
                if(errors.includes("databaseError")){
                    response.status(500).end()
                }
                else if(errors.includes("Need to be logged in!")){
                    response.status(401).end()
                }
            }else{
                console.log("blogpostREST", blogpost);
                
                const model = {
                    blogpost
                }
                response.status(200).json(model)
            }
        })
    })
    return router
}