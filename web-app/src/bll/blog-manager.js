
module.exports = function({blogRepository}){

    return {

        getValidationErrors: function(title, content){
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

        },

        getAllBlogposts: function(callback){

            blogRepository.getBlogposts(function(errors, blogposts){
                callback(errors, blogposts)
            })
        },

        getBlogpostId: function(blogId, isLoggedIn, callback){

            if(isLoggedIn){
                blogRepository.getBlogpostId(blogId, function(errors, blogpost){
                    callback(errors, blogpost)
                })
            }else{
                throw "Unauthorized!"
            }
        },

        createBlogpost: function(title, content, posted, imageFile, userId, isLoggedIn, callback){

            const errors = this.getValidationErrors(title, content)
            if(errors.length > 0){
                callback(errors)
                return
            }
            if(isLoggedIn){
                blogRepository.createBlogpost(title, content, posted, imageFile, userId, function(errors, blogpost){
                    callback(errors, blogpost)
                })
            }else{
                throw "Unauthorized!"
            }
        }
    }
}


