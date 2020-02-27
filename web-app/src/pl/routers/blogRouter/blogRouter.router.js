const express = require('express')
const router = express.Router()
const multer = require('multer')
const blogManager = require('../../../bll/blog-manager')
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
        console.log("model:", model)
        response.render("blogposts.hbs", model)
    })
})

router.get("/create", function(request, response){

    response.render("create-blogpost.hbs")
})


router.get("/:blogId", function(request, response){

    const blogId = request.params.blogId
    const username = request.session.username
    const isLoggedIn = request.session.isLoggedIn
    blogManager.getBlogpostId(blogId, isLoggedIn, function(errors, blogpost){
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
    const isLoggedIn = request.session.isLoggedIn
    if(!file){
        const error = new Error("please upload a file")
        error.httpStatusCode = 400
        return next(error)
    }
   
    blogManager.createBlogpost(title, content, posted, file, userId, isLoggedIn, function(errors, blogId){
        console.log("error:", errors)
        if(errors.length != ""){
            const model = {
                errors: errors
            }
            response.render("create-blogpost.hbs", model)
        }else{
            response.redirect("/blogposts/"+blogId)
        }
    })
})


module.exports = router