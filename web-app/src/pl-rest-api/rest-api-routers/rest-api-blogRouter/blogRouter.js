module.exports = function({blogManager}){
    const express = require('express')
    const router = express.router

    /* router.get("/", function(request, response){
        
        blogManager.getAllBlogposts(function(blogposts, errors){
            if(errors.includes("databaseError")){
                response.status(500).end()
            }
            else if(errors.length > 0){
                response.status(404).end()
                const model = {
                    errors
                }
                response.render("blogposts.hbs", model)
            }
            else{
                const model = {
                    blogposts
                }
                response.render("toDoLists.hbs", model)
                response.status(200).end(blogposts)
            }
        })  
    }) */

    router.get("/", function(request, response){
        // TODO: Extracting the payload is better put in a function
        // (preferably a middleware function).
        const authorixationHeader = request.get('authorization')
        const accessToken = authorixationHeader.substr("Bearer ".length)
    
        try {
            // TODO: Better to use jwt.verify asynchronously.
            const payload = jwt.verify(accessToken, serverSecret)
            
            // Use payload to implement authorization...
            
        }catch(e){
            response.status(401).end()
            return
        }
        
        blogpostHandler.getAllBlogposts(function(blogposts, errors){
            
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

    router.get("/create", function(request, response){
        response.status(200).end()
    })

    router.get("/:blogId", function(request, response){
        const blogId = request.params.blogId
        const token = request.body.accessToken
        console.log("loggedin", token)
        blogManager.getBlogpostId(blogId, token, function(errors, blogpost){
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
                    const model = {
                        blogpost,
                        errors,
                        username
                    }
                    console.log("blogpostmodel:", model)
                    console.log("usernameBlogpost", model.username.account.dataValues.username)
                    response.render("blogpost.hbs", model)
                })
            }
        })
    })

    router.post("/create", function(request, response, next){
        const title = request.body.title
        const content = request.body.content
        const posted = request.body.posted
        const userId = request.session.userId
        console.log("userid", userId)
        const file = request.file.originalname
        const token = request.body.accessToken

        if(!file){
            const error = new Error("please upload a file")
            error.httpStatusCode = 400
            return next(error)
        }

        blogManager.createBlogpost(title, content, posted, file, userId, token, function(errors, blogId){
            console.log("errorInPL:", errors)
            if(errors.length > 0){
                if(errors.includes("databaseError")){
                    response.status(500).end()
                }
                else if(errors.includes("Need to be logged in!")){
                    response.status(401).end()
                }
                else{
                    const model = {
                        errors
                    }
                    response.render("create-blogpost.hbs", model)
                }
            }else{
                response.redirect("/blogposts/"+blogId.dataValues.blogId)
            }
        })
    })
    return router
}

