
module.exports = function({blogManager}){

    const express = require('express')
    const router = express.Router()
    
    router.get("/", function(request, response){
        
        blogManager.getAllBlogposts(function(errors, blogposts){
            if(errors.length > 0){
                if(errors.includes("databaseError")){
                    response.send("<h1>Something went wrong!</h1>")
                }else{
                    const model = {
                        errors
                    }
                    response.render("blogposts.hbs", { model })
                }
            }else{
                const model = {
                    blogposts  
                }
                console.log("blogpostsModel:", model)
                response.render("blogposts.hbs", model) 
            }
        })
    })
    

    router.get("/create", function(request, response){
    
        response.render("create-blogpost.hbs")
    })
    
    
    router.get("/:blogId", function(request, response){
    
        const blogId = request.params.blogId
        const isLoggedIn = request.session.isLoggedIn
        console.log("loggedin", isLoggedIn)
        blogManager.getBlogpostId(blogId, isLoggedIn, function(errors, blogpost){
            console.log("errorsInPL", errors)
            if(errors.length > 0){
                if(errors.includes("databaseError")){
                    response.send("<h1>Something went wrong!</h1>")
                }
                else if(errors.includes("Need to be logged in!")){
                    response.render("unauthorized.hbs")
                }else{
                   
                    const model = {
                        errors
                    }
                    response.render("blogpost.hbs", model)   
                }
            }else{
                console.log("errorsWithTheFuckingShit:", errors)
                blogManager.getUsernameById(blogpost.userId, function(errors, username){
                    console.log("errorsWithTheFuckingShit:", errors)
                    const model = {
                        blogpost,
                        errors,
                        username
                    }
                    console.log("blogpostModel:", model)
                    console.log("UsernameBlogpost",  model.username.account.dataValues.username)
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
        const isLoggedIn = request.session.isLoggedIn
        if(!file){
            const error = new Error("please upload a file")
            error.httpStatusCode = 400
            return next(error)
        }
       
        blogManager.createBlogpost(title, content, posted, file, userId, isLoggedIn, function(errors, blogId){
            console.log("errorInPl:", errors)
            if(errors.length > 0){
                if(errors.includes("databaseError")){
                    response.send("<h1>Something went wrong!</h1>")
                }
                else if(errors.includes("Need to be logged in!")){
                    response.render("unauthorized.hbs")
                }else{
                 
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



