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

           
        },

        createBlogpost: function(title, content, posted, imageFile, userId, callback){

          
        }
    }
}








