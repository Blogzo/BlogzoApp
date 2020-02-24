const blogRepo = require('../dal/blog-repository')


exports.getAllBlogposts = function(callback){
    blogRepo.getBlogposts(function(errors, blogposts){
        callback(errors, blogposts)
    })
}


exports.getBlogpostId = function(callback){
    blogRepo.getBlogpostId(function(errors, blogId){
        callback(errors, blogId)
    })
}

