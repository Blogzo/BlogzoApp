const blogposts = require('./defineTables')

module.exports = function({}){

    return {

        getBlogposts: function(callback){

            blogposts.Blogpost.findAll({
                include: [{ model: blogposts.Account, attributes: ['username']}],
            }).then(function(allBlogposts){
                callback([], allBlogposts)

            }).catch(function(errors){
                callback(errors, [])
            })  
        },

        getBlogpostId: function(blogId, callback){
            
            blogposts.Blogpost.findByPk(blogId).then(function(Blogpost){
                callback([], Blogpost)
            }).catch(function(errors){
                callback(errors, [])
            })
        },

        createBlogpost: function(Title, Content, Posted, ImageFile, UserId, callback){
            
            blogposts.Blogpost.create({title: Title, content: Content, imageFile: ImageFile, posted: Posted, userId: UserId }).then(function(newBlogpost){
                callback([], newBlogpost)
            }).catch(function(errors){
                callback(errors, [])
            })
        },

        getUsernameById: function(UserId, callback){
            
            blogposts.Blogpost.findOne({where: {userId: UserId},include: [{ model: blogposts.Account, attributes: ['username'] }],
            }).then(function(username){
                callback([], username)
            }).catch(function(errors){
                callback(errors, [])
            })
        }
    }
}








