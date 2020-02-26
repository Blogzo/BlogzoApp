const blogRepo = require('../dal/blog-repository')
const accountRepo = require('../dal/account-repository')

function isLoggedIn(ifIsLoggedIn){

    const validation = []

    if(!ifIsLoggedIn){
        validation.push("Not auhtorized!")
    }
    return errors
}


exports.getAllBlogposts = function(callback){
    blogRepo.getBlogposts(function(errors, blogposts){
        callback(errors, blogposts)
    })
}


exports.getBlogpostId = function(blogId, callback){
    blogRepo.getBlogpostId(blogId, function(errors, blogpost){
        callback(errors, blogpost)
    })
}


exports.getUserId = function(personId, callback){
    accountRepo.getAccountById(personId, function(errors, account){
        callback(errors, account)
    })
}


exports.createBlogpost = function(title, content, posted, imageFile, userId, callback){
    blogRepo.createBlogpost(title, content, posted, imageFile, userId, function(errors, blogpost){
        callback(errors, blogpost)
    })
}

