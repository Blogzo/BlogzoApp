const blogposts = require('./defineTables')

module.exports = function({}){

    return {

        getBlogposts: function(callback){

            blogposts.Blogpost.findAll({
                raw: true, 
                include: [{ model: blogposts.Account, attributes: ['accountUsername']}],
            })
            .then(allBlogposts => callback([], allBlogposts))
            .catch(errors => callback(["databaseError"], null))  
        },

        getBlogpostId: function(blogId, callback){
            
            blogposts.Blogpost.findByPk(blogId)
            .then(Blogpost => callback([], Blogpost.dataValues))
            .catch(errors => callback(["databaseError"], null))
        },

        createBlogpost: function(Title, Content, Posted, ImageFile, UserId, callback){
            
            blogposts.Blogpost.create({title: Title, content: Content, imageFile: ImageFile, posted: Posted, userId: UserId }).then(function(newBlogpost){
                callback([], newBlogpost)
            }).catch(function(errors){
                callback(["databaseError"], null)
            })
        },

        getUsernameById: function(UserId, callback){
            
            blogposts.Blogpost.findOne({where: {userId: UserId},include: [{ model: blogposts.Account, attributes: ['accountUsername'] }],
            }).then(function(username){
                callback([], username)
            }).catch(function(errors){
                callback(["databaseError"], null)
            })
        }
    }
}








