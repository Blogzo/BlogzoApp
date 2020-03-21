
const express = require('express')
const jwt = require('jsonwebtoken')

module.exports = function({accountManager, blogManager, toDoManager}){

    const router = express.Router()
    const serverSecret = "sdfkjdslkfjslkfd"

    var authorization = function(request, response, next){
        
        try{

            const authorizationHeader = request.get('authorization')
            const accessToken = authorizationHeader.substr("Bearer ".length)
            console.log("accessToken", accessToken)
            
            jwt.verify(accessToken, serverSecret, function(error, decoded){
                if(error){
                    console.log("decoded", decoded)
                    
                    console.log("error", error)
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

    //ToDos!
    router.get("/toDoLists", authorization, function(request, response){
        const isLoggedIn = true
        toDoManager.getAllToDos(isLoggedIn, function(errors, toDos){
            if(errors.length > 0){
                if(errors.includes("databaseErrors")){
                    response.status(500).end()
                }
                else if(errors.includes("Needs to be logged in!")){
                    console.log("inside need to be logged in")
                    response.status(401).end()   
                }
            }else{
                response.status(200).json(toDos)
            }
        })
    })

    router.put("/toDoLists/:todoId", authorization, function(request, response){
        const todo = request.body.todo
        const todoId = request.params.todoId
        const isLoggedIn = true
        toDoManager.updateTodo(todoId, todo, isLoggedIn, function(errors, newTodo){
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
                    response.status(400).json(errors)
                }
            }else{
                response.status(204).end()
            }
        })
    })

    router.get("/toDoLists/:todoId", authorization, function(request, response){
        const todoId = request.params.todoId  
        const isLoggedIn = true
        toDoManager.getToDoId(todoId, isLoggedIn, function(errors, todo){
            console.log("errorsInPL:", errors)
            console.log("todoInPL:", todo)

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

    router.post("/toDoLists", authorization, function(request, response){

        const todo = request.body.todo
        toDoManager.createTodo(todo, function(errors, newTodo){
            if(errors.length > 0){
                if (errors.includes("databaseError")){
                    response.status(500).end()
                }
                else if(errors.includes("Need to be logged in!")){
                    response.status(401).end()
                }else{
                    response.status(400).json(errors)
                }
            }else{
                response.setHeader("Location", "/toDoLists/"+newTodo)
                response.status(201).end()
            }
        })
    })

    router.delete("/toDoLists/:todoId", authorization, function(request, response){
        const todoId = request.params.todoId
        const isLoggedIn = true
        console.log("todoId", todoId)
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



    //createAccount!

    router.post("/create-account", function(request, response){
        const email = request.body.email
        const username = request.body.username
        const userPassword = request.body.userPassword
        const userPassword2 = request.body.userPassword2
        console.log("newUsername:", username)
        
        accountManager.createAccount(username, email, userPassword, userPassword2, function(errors, account){
            console.log("errorPL:", errors)
            console.log("newAccountPL", account)
            
            if(errors.length > 0){
                if(errors.includes("databaseError")){
                    response.status(500).end()
                }
                else if(errors.includes("email must be unique!")){
                    response.status(400).end()
                }else if(errors.includes("username must be unique!")){
                    response.status(400).end()
                }else{
                    const model = {
                        errors
                    }
                    response.status(400).json(model)
                }
            }else{

                const payload = {id: account.personId, "username": account.username, "password": account.userPassword}
                console.log("Payload:", payload)
                jwt.sign(payload, serverSecret, function(error, result){
                    console.log("result", result)
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

    //loginAccount
   
    router.post("/login", function(request, response){

        const grantType = request.body.grant_type
        //const invalidRequest = request.body.invalid_request
        const username = request.body.Username
        const userPassword = request.body.userPassword

        console.log("body", request.body)
        console.log("Usernamen and password", username, userPassword)
        if(grantType != "password"){
            response.status(400).json({error: "unsupported_grant_type", error_description: "The authorization grant type is not supported by the authorization server."})
            return
        }

        accountManager.getUserPassword(username, userPassword, function(errors, account){
            if(errors.length > 0){
                if(errors.includes("DatabaseError")){
                    response.status(500).end()
                }else{
					const model = {
						errors: errors
					}
					response.status(404).json(model)	
				}
            }
            else if(!account){
                response.status(404).end()
            }else {
                const payload = {id: account.personId, "username": username, "password": userPassword}
                console.log("loginPayload", payload)
                // TODO: Better to use jwt.sign asynchronously.
                jwt.sign(payload, serverSecret, function(error, result){
                    console.log("result", result)
                    if(error){
                        console.log(error)
                        response.status(404).json({error: "invalid_grant"})
                    }else{
                        response.status(200).json({
                            access_token: result,
                        })
                        console.log("accessToken", result)
                    }
                })
            }
        })
    })

    //blogRouter!

    router.get("/blogposts", function(request, response){
        
        blogManager.getAllBlogposts(function(errors, blogposts){
            console.log("blogposts", blogposts)
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
        blogManager.getBlogpostId(blogId, isLoggedIn, function(errors, blogpost){
            console.log("errorsInPL:", errors)
            if(errors.length > 0){
                if(errors.includes("databaseError")){
                    response.status(500).end()
                }
                else if(errors.includes("Need to be logged in!")){
                    response.status(401).end()
                }
            }else{
                blogManager.getUsernameById(blogpost.userId, function(errors, account){
                    if(errors.length > 0){
                        if(errors.includes("databaseError")){
                            response.status(500).end()
                        }
                    }else{
                        const model = {
                            blogpost,
                            account
                        }
                        response.status(200).json(model)
                    }
                })
            }
        })
    })
    return router
}