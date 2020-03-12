module.exports = function({blogManager}){
    const express = require('express')
    const router = express.router

    router.get("/", function(request, response){
        
        blogManager.getAllBlogposts(function(blogposts, errors){
            if(errors.includes("databaseError")){
                response.status(500).end()
            }
            else if(errors.length > 0){
                response.status(404).end()
                const model = {
                    errors
                }
                response.render("blogposts.hbs", { model })
            }
            else{
                const model = {
                    blogposts
                }
                response.render("toDoLists.hbs", { model })
                response.status(200).end()
            }
        })  
    })

    router.get("/create", function(request, response){
        response.status(200).end()
        response.render("create.hbs")
    })

    return router
}

