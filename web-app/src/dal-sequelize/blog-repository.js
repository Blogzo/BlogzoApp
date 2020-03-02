const blogposts = require('./defineTables')

module.exports = function({}){

    return {

        getBlogposts: function(callback){

            blogposts.Blogpost.findAll().then(function(allBlogposts){
                console.log(allBlogposts)
                callback(allBlogposts)

            }).catch(function(errors){
                console.log(errors)
                callback(errors)

            })
            
        },

        getBlogpostId: function(blogId, callback){
            blogposts.Blogpost.findById(blogId).then(function(Blogpost){
                console.log(Blogpost)
                callback(Blogpost)
            }).catch(function(errors){
                console.log(errors)
                callback(errors)
            })
        },

        createBlogpost: function(Title, Content, Posted, ImageFile, UserId, callback){
            blogposts.Blogpost.create({title: Title, content: Content, imageFile: ImageFile, posted: Posted, userId: UserId }).then(function(createBlogpost){
                console.log(createBlogpost)
                callback(createBlogpost)
            }).catch(function(errors){
                console.log(errors)
                callback(errors)
            })
          
        },

        getUsernameById: function(userId, callback){
            blogposts.Blogpost.find(username).findById(userId).then(function(getUsernameById){
                console.log(getUsernameById)
                callback(getUsernameById)
            }).catch(function(errors){
                console.log(errors)
                callback(errors)
            })
        }
    }
}








