const express = require('express')
const router = express.Router()
const blogManager = require('../../../bll/blog-manager')
const blogRepo = require('../../../dal/blog-repository')


router.get("/", function(request, response){

    blogManager.getAllBlogposts(function(errors, blogposts){
        const model = {
            errors: errors,
            blogposts: blogposts
        }
        response.render("blogposts.hbs", model)
    })
})

router.get("/create", function(request, response){

    response.render("create-blogpost.hbs")
})

router.get("/:blogId", function(request, response){

    const blogId = request.params.blogId
    blogRepo.getBlogpostId(blogId, function(error, blogpost){

        if(error){
            console.log(error)
        }else{
            const model = {
                blogpost
            }
            console.log("model:", model)
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

    blogRepo.createBlogpost(title, content, posted, imageFile, userId, function(error, blogId){

        if(error){
            response.send(
                '<h1><b>Something went wrong</b></h1>'
            )
        }else{
            response.redirect("/blogposts/"+blogId)
        }
    })
})


module.exports = router