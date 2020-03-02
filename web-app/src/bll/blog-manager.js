
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

            blogRepository.getBlogposts(function(errors, blogposts){
                callback(errors, blogposts)
            })
        },

        getBlogpostId: function(blogId, isLoggedIn, callback){
            
            const errors = this.getValidationErrors(0, 0, isLoggedIn)
            if(errors.length > 0){
                callback(errors)
                return
            }else{
                blogRepository.getBlogpostId(blogId, function(errors, blogpost){
                    callback(errors, blogpost)
                })
            }    
        },

        getUsernameById: function(userId, callback){
            blogRepository.getUsernameById(userId, function(errors, username){
                console.log("usernameInBLL:", username)
                console.log("errorInBLL:", errors)
                callback(errors, username)
            })
        },

        getusernamesById: function(userId, callback){
            blogRepository.getusernamesById(userId, function(errors, username){
                console.log("usernamesInBLL:", username)
                console.log("error2InBLL", errors)
                callback(errors, username)
            })
        },

        createBlogpost: function(title, content, posted, imageFile, userId, isLoggedIn, callback){
            
            const errors = this.getValidationErrors(title, content, isLoggedIn)
            if(errors.length > 0){
                callback(errors)
                return
            }else{
                blogRepository.createBlogpost(title, content, posted, imageFile, userId, function(errors, blogpost){
                    callback(errors, blogpost)
                })
            }    
        }
    }
}


