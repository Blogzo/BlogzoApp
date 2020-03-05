
module.exports = function({blogManager}){

    const express = require('express')
    const router = express.Router()
    
    router.get("/", function(request, response){
        
        blogManager.getAllBlogposts(function(blogposts, errors){
            
            const model = {
                errors,
                blogposts
            }
            console.log("blogpostsModel:", { model })
            response.render("blogposts.hbs", { model })
        })
    })
    

    router.get("/create", function(request, response){
    
        response.render("create-blogpost.hbs")
    })
    
    
    router.get("/:blogId", function(request, response){
    
        const blogId = request.params.blogId
        const isLoggedIn = request.session.isLoggedIn
        blogManager.getBlogpostId(blogId, isLoggedIn, function(blogpost, errors){
            if(errors.length != ""){
                if(errors.includes("Need to be logged in!")){
                    response.render("unauthorized.hbs")
                }else{
                    const model = {
                        errors
                    }
                    response.render("blogpost.hbs",{ model })
                }
            }else{
                blogManager.getUsernameById(blogpost.dataValues.userId, function(username, errors){
                    //Without sequelize
                    /*const model = {
                        errors: errors,
                        blogpost: blogpost[0],
                        username: username[0]
                    }
                    response.render("blogpost.hbs", model)*/
                    
                    //With sequelize
                    const model = {
                        blogpost,
                        errors
                    }
                    console.log("blogpostModel:",{ model })
                    response.render("blogpost.hbs", { model })
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
       
        blogManager.createBlogpost(title, content, posted, file, userId, isLoggedIn, function(blogId, errors){
            if(errors.length != ""){
                if(errors.includes("Need to be logged in!")){
                    response.render("unauthorized.hbs")
                }else{
                    const model = {
                        errors
                    }
                    response.render("create-blogpost.hbs",{model})
                }
            }else{
                response.redirect("/blogposts/"+blogId.dataValues.blogId)
            }
        })
    })
    return router
}



