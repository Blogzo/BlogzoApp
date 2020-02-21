const express = require('express')
const router = express.Router()
const blogManager = require('../../../dal/blog-repository')


router.get("/", function(request, response){

    blogManager.getBlogposts(function(error, blogposts){

        if(error){
            response.send("<h1><b>Something went wrong</b></h1>")
            return
        }else{
            const model = {
                blogposts
            }
            response.render("blogposts.hbs", model)
        }
    })
})

router.get("/create", function(request, response){

    response.render("create-blogpost.hbs")
})

router.get("/:id", function(request, response){

    const blogpostId = request.params.id
    try {
        const blogpost = blogManager.getBlogpostId(blogpostId)
        const model = {blogpost: blogpost}
        response.render("blogpost.hbs", model) 
    }catch(error){
        const model = {error: error}
        response.render("unauthorized.hbs", model)
    }
})

router.post("/create", function(request, response){

    const title = request.body.title
    const content = request.body.content
    const posted = request.body.posted
    const imgeFile = request.body.imgeFile
    const userId = request.session.userId

    blogManager.createBlogpost(title, content, posted, imgeFile, userId, function(error, blogpost){

        if(error){
            response.send(
                '<h1><b>Something went wrong</b></h1>'
            )
        }else{
            response.redirect("/blogposts/"+blogpost)
        }
    })
})


module.exports = router