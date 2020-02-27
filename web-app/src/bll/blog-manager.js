const blogRepo = require('../dal/blog-repository')
const accountRepo = require('../dal/account-repository')


function getValidationErrors(title, content){

    const errors = []

    if(title.length <= 5){
        errors.push("Title to short!")
    }
    if(content.length <= 10){
        errors.push("Content to short!")
    }
    if(title.length >= 50){
        errors.push("Title to long!")
    }
    if(content.length >= 100){
        errors.push("Title to long!")
    }
    
    return errors
}


exports.getAllBlogposts = function(callback){

    blogRepo.getBlogposts(function(errors, blogposts){
        callback(errors, blogposts)
    })
}


exports.getBlogpostId = function(blogId, isLoggedIn, callback){

    if(isLoggedIn){
        blogRepo.getBlogpostId(blogId, function(errors, blogpost){
            callback(errors, blogpost)
        })
    }else{
        throw "Unauthorized!"
    }
   
}


exports.createBlogpost = function(title, content, posted, imageFile, userId, isLoggedIn, callback){

    const errors = getValidationErrors(title, content)
    if(errors.length > 0){
        callback(errors)
        return
    }
    if(isLoggedIn){
        blogRepo.createBlogpost(title, content, posted, imageFile, userId, function(errors, blogpost){
            callback(errors, blogpost)
        })
    }else{
        throw "Unauthorized!"
    }
}

