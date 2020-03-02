
module.exports = function({blogManager}){

    const express = require('express')
    const router = express.Router()
    
    router.get("/", function(request, response){
        
        blogManager.getAllBlogposts(function(errors, blogposts){
            if(errors.length != ""){
                console.log(errors)
            }else{
                for(i in blogposts){
                    blogManager.getUsernameById(blogposts[i].userId, function(errors, username){
                        if(errors.length != ""){
                            console.log(errors)
                        }else{
                        //for(i in blogposts){
                        //    console.log("userids:", blogposts[i].userId)
                        //}
                            const model = {
                                errors: errors,
                                blogposts: blogposts,
                                username: username[i]
                            }
                            console.log("blogpostsModel:", model)
                            response.render("blogposts.hbs", model)
                        }
                    })
                }
            }
        })
    })
    

    router.get("/create", function(request, response){
    
        response.render("create-blogpost.hbs")
    })
    
    
    router.get("/:blogId", function(request, response){
    
        const blogId = request.params.blogId
        const isLoggedIn = request.session.isLoggedIn
        blogManager.getBlogpostId(blogId, isLoggedIn, function(errors, blogpost){
            if(errors.length != ""){
                if(errors.includes("Need to be logged in!")){
                    response.render("unauthorized.hbs")
                }
            }else{
                blogManager.getUsernameById(blogpost[0].userId, function(errors, username){
                    if(errors.length != ""){
                        console.log("error:", errors)
                    }else{
                        const model = {
                            errors: errors,
                            blogpost: blogpost[0],
                            username: username[0]
                        }
                        response.render("blogpost.hbs", model)
                    }
                })    
            }
        })
    })
    
    
    router.post("/create", function(request, response, next){
    
        const title = request.body.title
        const content = request.body.content
        const posted = request.body.posted
        const userId = request.session.userId
        const file = request.file.originalname
        const isLoggedIn = request.session.isLoggedIn
        if(!file){
            const error = new Error("please upload a file")
            error.httpStatusCode = 400
            return next(error)
        }
       
        blogManager.createBlogpost(title, content, posted, file, userId, isLoggedIn, function(errors, username, blogId){
            console.log("error:", errors)
            if(username.length != ""){
                usernameById = request.session.usernameById
            }
            if(errors.length != ""){
                if(errors.includes("Need to be logged in!")){
                    response.render("unauthorized.hbs")
                }else{
                    const model = {
                        errors: errors
                    }
                    response.render("create-blogpost.hbs", model)
                }
            }else{
                console.log("blogIdInPL:", blogId)
                response.redirect("/blogposts/"+blogId)
            }
        })
    })
    return router
}



