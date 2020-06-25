const blogposts = require('./defineTables')

module.exports = function({}){

    return {

        getBlogposts: function(callback){

            blogposts.Blogpost.findAll({
                raw: true
            })
            .then(allBlogposts => callback([], allBlogposts))
            .catch(errors => callback(["databaseError"], null))  
        },

        getBlogpostById: function(blogId, callback){
            
            blogposts.Blogpost.findByPk(blogId)
            .then(Blogpost => callback([], Blogpost.dataValues))
            .catch(errors => callback(["databaseError"], null))
        },

        createBlogpost: function(Title, Content, Posted, ImageFile, UserId, callback){

            blogposts.Blogpost.create({
                title: Title, content: Content, imageFile: ImageFile, posted: Posted, accountId: UserId 
            })
            .then(newBlogpost => callback([], newBlogpost.dataValues.blogId))
            .catch(errors => callback(["databaseError"], null))
            
        }
    }
}








