
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
                    request.userID = decoded.sub
                    request.accountUsername = decoded.name
                    request.isLoggedIn = true
                    next()
                }
            }) 
        }catch(error){
            response.status(401).end()
            request.isLoggedIn = false
            return
        }
    }

    router.get("/toDoItems", authorization, function(request, response){
        
        const accountId = request.userID
        
        toDoManager.getAllToDosForAccount(accountId, request.isLoggedIn, function(errors, toDos){
            
            if(errors.length > 0){
                if(errors.includes("databaseErrors")){
                    response.status(500).end()
                }
                else if(errors.includes("Needs to be logged in!")){
                    response.status(401).end()   
                }
            }else{
                response.status(200).json(toDos)
            }
        })
    })

    router.put("/toDoItems/:todoId", authorization, function(request, response){
        
        const todo = request.body.todo
        const todoId = request.params.todoId
        const userId = request.userID
        console.log("userIdAPI:", userId);
        

        
        toDoManager.updateTodo(todoId, userId, todo, request.isLoggedIn, function(errors, newTodo){
            
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

    router.get("/toDoItems/:todoId", authorization, function(request, response){
        
        const todoId = request.params.todoId  
        const userId = request.userID
        
        toDoManager.getToDoItem(todoId, userId, request.isLoggedIn, function(errors, todo){

            if(errors.length > 0){
                if(errors.includes("databaseError")){
                    response.status(500).end()
                }
                else if(errors.includes("Need to be logged in!") || errors.includes("Unauthorized")){
                    console.log("vi är är", errors);
                    response.status(401).end()
                }
            }else{
                response.status(200).json(todo)
            }
        })
    })

    router.post("/toDoItems", authorization, function(request, response){

        const todo = request.body.todo
        const userId = request.userID
        const accountUsername = request.accountUsername
        console.log("userIdAPI:", userId);
        
        toDoManager.createTodo(userId, todo, accountUsername, function(errors, newTodo){
            
            if(errors){
                if (errors.includes("databaseError")){
                    response.status(500).end()
                }
                else if(errors.includes("Need to be logged in!")){
                    response.status(401).end()
                }else{
                    console.log("errorAPI", errors);
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
        const userId = request.userID
        
        toDoManager.deleteTodo(todoId, userId, request.isLoggedIn, function(errors, deletedToDo){
            
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
            if(errors.length > 0){
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
                const payload = { "sub": account.accountId, "name": account.accountUsername}
                jwt.sign(payload, serverSecret, function(error, result){
                    
                    if(error){
                        response.status(404).json({error: "invalid_grant"})
                    }else{
                        response.status(200).json({
                            access_token: result,
                            username: account.accountUsername,
                            accounId: account.accountId
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
        
        
        blogManager.getBlogpostById(blogId, request.isLoggedIn, function(errors, blogpost){
            
            if(errors.length > 0){
                if(errors.includes("databaseError")){
                    response.status(500).end()
                }
                else if(errors.includes("Need to be logged in!")){
                    response.status(401).end()
                }
            }else{
                const model = {
                    blogpost
                }
                response.status(200).json(model)
            }
        })
    })
    return router
}