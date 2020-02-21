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

router.get("/:blogId", function(request, response){

    const blogpostId = request.params.id
    blogManager.getBlogpostId(blogpostId, function(error, blogpost){

        if(error){
            console.log(error)
        }else{
            const model = {
                blogpost
            }
            response.render("blogpost.hbs", model)
        }
    })
})

router.post("/create", function(request, response){

    const title = request.body.title
    const content = request.body.content
    const posted = request.body.posted
    const imageFile = request.body.imageFile
    const userId = 1
    console.log("userId:", userId)
    console.log("title:", title)
    console.log("content:", content)
    console.log("posted:", posted)
    console.log("image:", imageFile)

    blogManager.createBlogpost(title, content, posted, imageFile, userId, function(error, blogpost){

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