const express = require('express')
const router = express.Router()
const multer = require('multer')
const blogManager = require('../../../bll/blog-manager')
const blogRepo = require('../../../dal/blog-repository')
var upload = multer({ dest: './pl/public/blogpost-img' })

var storage = multer.diskStorage({
    destination: function (request, file, cb) {
        cb(null, __dirname + '../../../public/blogpost-img')
    },
    filename: function(request, file, cb) {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
})
var upload = multer({ storage: storage}).single('imageFile')

router.get("/", function(request, response){

    blogManager.getAllBlogposts(function(errors, blogposts){
        const model = {
            errors: errors,
            blogposts: blogposts,
        }
        console.log("all blogpost model:", model)
        response.render("blogposts.hbs", model)
    })
})

router.get("/create", function(request, response){

    response.render("create-blogpost.hbs")
})


router.get("/:blogId", function(request, response){

    const blogId = request.params.blogId
    const username = request.session.username

    blogManager.getBlogpostId(blogId, function(errors, blogpost){
        const model = {
            errors: errors,
            blogpost: blogpost[0],
            username
        }
        console.log("model:", model)
        response.render("blogpost.hbs", model)
    })
})


router.post("/create", upload, function(request, response, next){

    const title = request.body.title
    const content = request.body.content
    const posted = request.body.posted
    const userId = request.session.userId
    const file = request.file.originalname
    console.log("userId", userId)

    if(!file){
        const error = new Error("please upload a file")
        error.httpStatusCode = 400
        return next(error)
    }
   
    blogManager.createBlogpost(title, content, posted, file, userId, function(errors, blogId){
        console.log("error:", errors)
        if(errors.length != ""){
            response.send(
                '<h1><b>Something went wrong</b></h1>'
            )
        }else{
            response.redirect("/blogposts/"+blogId)
        }
    })
})


module.exports = router