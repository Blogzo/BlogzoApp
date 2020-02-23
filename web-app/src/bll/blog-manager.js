const blogRepo = require('../dal/blog-repository')


exports.getAllBlogposts = function(callback){
    blogRepo.getBlogposts(function(errors, blogposts){
        callback(errors, blogposts)
    })
}


exports.getBlogpostId = function(id){

    if(request.session.isLoggedIn){
        return blogRepo.getBlogpostId(id)
    }else{
        throw "Unauthorized!"
    }
}