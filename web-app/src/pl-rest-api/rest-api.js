
const express = require('express')
const jwt = require('jsonwebtoken')

module.exports = function({accountManager, blogManager, toDoManager}){

    const router = express.Router()

    const correctUsername = "Admin"
    const correctPassword = "abc123"
    const serverSecret = "sdfkjdslkfjslkfd"

    router.use(function(request, response, next){

        response.setHeader("Access-Control-Allow-Origin", "*")
        response.setHeader("Access-Control-Allow-Methods", "*")
        response.setHeader("Access-Control-Allow-Headers", "*")
        response.setHeader("Access-Control-Expose-Headers", "*")
        next()
    })

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
    router.get("/toDoLists", authorization, function(requst, response){
        if(errors.inclues("databaseErrors")){
            response.status(500).end()
        }
        else if(errors.inclues("Needs to be logged in!")){
            response.status(401).end()
            
        }
        else{
            response.status(200).end()
        }
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
        
        accountManager.createAccount(username,email,userPassword,userPassword2, function(errors, account){
            console.log("errorPL:", errors)
            console.log("newAccountPL", account)
            
            if(errors.length > 0){
                
                if(errors.includes("databaseError")){
                    response.status(500).end()
                }
                else if(errors.inclused("email must be unique!")){
                    response.status(400)
                }
            }else{

                const payload = {id: userId, "username": username, "password": password}

                jwt.sign(payload, serverSecret).then(function(error, result){
                    console.log("result", result)
                    if(error){
                        response.status(500).end()
                    }else{
                        const idToken = jwt.sign({sub: 1, email: email, username: username},serverSecret)
                        response.status(200).json(result)
                    }
                })

                response.status(201).json({
                    access_token: accessToken,
                    id_token: idToken
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
        const username = request.body.username
        const password = request.body.password


        if(grantType != "password"){
            response.status(400).json({error: "unsupported_grant_type", error_description: "The authorization grant type is not supported by the authorization server."})
            return
        }
        if(username != correctUsername || password != correctPassword){
            response.status(400).json({error: "invalid_request", error_description: "The request is malformed, a required parameter is missing or a parameter has an invalid value."})
        }
        if(!token){ //ändra om detta till invalid grant
            response.status(401).json({error: "invalid_client", error_description: "Client authentication failed (e.g., unknown client, no client authentication included, or unsupported authentication method)."})
        }
        if(!isLoggedIn){
            response.status(401).json({error: "unauthorized_client", error_description: "The client is not authorized."})
        }
        if(username == correctUsername && password == correctPassword){
            // TODO: Put user authorization info in the access token.
            const payload = {id: userId, "username": username, "password": password}
            // TODO: Better to use jwt.sign asynchronously.
            jwt.sign(payload, serverSecret).then(function(error, result){
                console.log(result)
                if(error){
                    response.status(500).end()
                }else{
                    const idToken = jwt.sign(
                        {sub: 1, email: email, username: username},
                        serverSecret
                    )
                    
                    response.status(200).json({
                        access_token: result,
                        id_token: idToken
                    })
                }
            }).catch(function(error){
                console.log(error)
                response.status(400).json({error: "invalid_grant"})
            })
        }
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
            
            if(errors.includes("databaseError")){  
                response.status(500).end()
            }
            else if(errors.length > 0){
                response.status(500).end()
            }else{
                response.status(200).json(blogposts)
            }
        })
    })

    router.get("/blogposts/create", authorization, function(request, response){
        response.status(200).end()
    })

    router.get("/blogposts/:blogId", authorization, function(request, response){
        const blogId = request.params.blogId  
        console.log("loggedin", token)
        blogManager.getBlogpostId(blogId, function(errors, blogpost){
            console.log("errorsInPL:", errors)
            if(errors.length > 0){
                if(errors.includes("databaseError")){
                    response.status(500).end()
                }
                else if(errrors.includes("Need to be logged in!")){
                    response.status(401).end()
                }else{
                    response.status(200).end()
                }
            }else{
                blogManager.getUsernameById(blogpost.userId, function(errors, username){
                    console.log("errorsWithThisFuckingShit:", errors)
                    response.status(200).json(blogpost)
                })
            }
        })
    })

    router.post("/blogposts/create", authorization, function(request, response, next){
        const title = request.body.title
        const content = request.body.content
        const posted = request.body.posted
        console.log("userid", userId)
        const file = request.file.originalname

        if(!file){
            const error = new Error("please upload a file")
            error.httpStatusCode = 400
            return next(error)
        }

        blogManager.createBlogpost(title, content, posted, file, userId, function(errors, blogId){
            console.log("errorInPL:", errors)
            if(errors.length > 0){
                if(errors.includes("databaseError")){
                    response.status(500).end()
                }
                else if(errors.includes("Need to be logged in!")){
                    response.status(401).end()
                }
            }else{
                response.setHeader("Location", "/blogposts/"+blogId)
                response.status(201).end()
            }
        })
    })
    return router
}