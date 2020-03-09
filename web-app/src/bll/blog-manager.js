
module.exports = function({blogRepository}){

    return {

        getValidationErrors: function(title, content, isLoggedIn){
            const errors = []

            if(title.length < 5){
                errors.push("Title to short!")
            }
            if(content.length < 10){
                errors.push("Content to short!")
            }
            if(title.length >  50){
                errors.push("Title to long!")
            }
            if(content.length > 100){
                errors.push("Title to long!")
            }
            if(isLoggedIn == false){
                errors.push("Need to be logged in!")
            }
            
            return errors

        },

        getAllBlogposts: function(callback){

            blogRepository.getBlogposts(function(blogposts, errors){
                console.log("blogpostsinBLL:", blogposts)
                callback(blogposts, errors)
            })
        },

        getBlogpostId: function(blogId, isLoggedIn, callback){
            
            const errors = this.getValidationErrors(0, 0, isLoggedIn)
            console.log("errrosInBLL:", errors)
            if(errors.length > 0){
                callback(0, errors)
                return
            }else{
                blogRepository.getBlogpostId(blogId, function(blogpost, errors){
                    callback(blogpost, errors)
                })
            }    
        },

        getUsernameById: function(userId, callback){
            blogRepository.getUsernameById(userId, function(username, errors){
                console.log("usernameInBLL:", username)
                callback(username, errors)
            })
        },

        createBlogpost: function(title, content, posted, imageFile, userId, isLoggedIn, callback){
            
            const errors = this.getValidationErrors(title, content, isLoggedIn)
            if(errors.length > 0){
                callback(0, errors)
                return
            }else{
                blogRepository.createBlogpost(title, content, posted, imageFile, userId, function(blogpost, errors){
                    callback(blogpost, errors)
                })
            }    
        }
    }
}


