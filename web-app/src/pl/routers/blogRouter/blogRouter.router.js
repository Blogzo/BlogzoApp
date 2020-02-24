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
    blogManager.getBlogpostId(blogId, function(errors, blogpost){
        console.log("blogpost", blogpost)
        const model = {
            errors: errors,
            blogpost: blogpost
        }
        response.render("blogpost.hbs", model)
    })
})

/*router.post('/public', upload.single('imageFile'), function(request, response, next){
    const file = request.body.file

    if(!file){
        const error = new Error("please upload a file")
        error.httpStatusCode = 400
        return next(error)
    }
    response.send(file)
})*/

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

    blogManager.createBlogpost(title, content, posted, imageFile, userId, function(error, blogId){

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