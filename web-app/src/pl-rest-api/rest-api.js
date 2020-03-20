
const express = require('express')
const jwt = require('jsonwebtoken')

module.exports = function({accountManager, blogManager, toDoManager}){

    const router = express.Router()
    const serverSecret = "sdfkjdslkfjslkfd"



    var authorization = function(request, response, next){
        
        try{

            const authorizationHeader = request.get('authorization')
            const accessToken = authorizationHeader.substr("Bearer ".length)
            
            const payload = jwt.verify(accessToken, serverSecret, function(error, decoded){
                if(error){
                    response.status(401).end()
                }else{
                    response.status(200).json(decoded)
                    next()
                }
            })
            
        }catch(error){
            response.status(400).end()
            return
        }
        
    }

    //ToDos!
    router.get("/toDoLists", function(requst, response){
        const isLoggedIn = true
        toDoManager.getAllToDos(isLoggedIn, function(errors, toDos){
            if(errors.length > 0){
                if(errors.includes("databaseErrors")){
                    response.status(500).end()
                }
                else if(errors.inclues("Needs to be logged in!")){
                    response.status(401).end()   
                }
            }else{
                response.status(200).json(toDos)
            }
        })
    })

    router.get("/toDoLists/:todoId", function(request, response){
        const todoId = request.params.todoId  
        const isLoggedIn = true
        toDoManager.getToDoById(todoId, isLoggedIn, function(errors, toDo){
            console.log("errorsInPL:", errors)
            if(errors.length > 0){
                if(errors.includes("databaseError")){
                    response.status(500).end()
                }
                else if(errrors.includes("Need to be logged in!")){
                    response.status(401).end()
                }
            }else{
                blogManager.getUsernameById(blogpost.userId, function(errors, toDo){
                    if(errors.length > 0){
                        if(errors.includes("databaseError")){
                            response.status(500).end()
                        }
                    }else{
                        const model = {
                            toDo
                        }
                        response.status(200).json(model)
                    }
                })
            }
        })
    })

    router.post("/toDoLists", authorization, function(request, response){

        const todo = request.body.todo
        toDoManager.createTodo(todo, function(errors, newTodo){
            if(errors.length > 0){
                if (errors.inclues("databaseError")){
                    response.status(500).end()
                }
                else if(errors.inclues("Need to be logged in!")){
                    response.status(401).end()
                }
            }else{
                response.status(201).end()
            }
        })
    })

    router.delete("/toDoLists/deletePost", authorization, function(request, response){
        const todo = request.body.todo
        const isLoggedIn = true

        toDoManager.deleteTodo(todo, isLoggedIn, function(errors, deletedToDo){
            if(errors.length > 0){
                if(errors.includes("databaseError")){
                    response.status(500).end()
                }
                else if(errors.includes("Need to be logged in!")){
                    response.status(401).end
                }
            }else{
                response.status(200).end()
            }
        })
    })

    router.put("/toDoLists/updatePost", authorization, function(request, response){
        const todo = request.body.todo
        const isLoggedIn = true

        toDoManager.updateTodo(todo, isLoggedIn, function(request, response){
            if(errors.length > 0){
                if(errors.includes("databaseError")){
                    response.status(500).end()
                }
                else if(errors.includes("Need to be logged in!")){
                    response.status(401).end()
                }
            }else{
                response.status(200).end()
            }
        })
    })

    //createAccount!
    router.get("/create-account", function(request, response){
        if(errors.includes("databaseError")){
            response.status(500).end()
        }
        else if(!account){
            response.status(404).end()
        }
        else{
            response.status(200).end()
        }
    })

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
                        //const idToken = jwt.sign({sub: account.userId, email: account.email, username: account.username},serverSecret)
                        response.status(201).json({
                            access_token: result,
                            id_token: payload
                        })
                    }
                })
            }
        })  
    })

    //loginAccount
    router.get("/login", function(request, response){
        response.status(200).end()
        response.render("login.hbs")

    })

    router.post("/login", function(request, response){

        const grantType = request.body.grant_type
        const invalidRequest = request.body.invalid_request
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
                            id_token: payload
                        })
                        console.log("access and id", result, idToken)
                    }
                })
            }
        })
    })
    //logout!
    router.post("/logout", function(request, response){
        localStorage.accessToken = ""
        localStorage.idToken = ""
        response.status(200).end()
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

    router.get("/blogposts/:blogId", function(request, response){
        const blogId = request.params.blogId  
        const isLoggedIn = true
        blogManager.getBlogpostId(blogId, isLoggedIn, function(errors, blogpost){
            console.log("errorsInPL:", errors)
            if(errors.length > 0){
                if(errors.includes("databaseError")){
                    response.status(500).end()
                }
                else if(errrors.includes("Need to be logged in!")){
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

    router.get("/blogposts/create", authorization, function(request, response){
        response.status(200).end()
    })
    return router
}