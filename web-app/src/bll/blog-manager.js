
module.exports = function({blogRepository, accountRepository}){

    return {

        getErrors: function(title, content, isLoggedIn){
            
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
                errors.push("Content to long!")
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

        getBlogpostById: function(blogId, isLoggedIn, callback){
            
            const errors = this.getErrors(0, 0, isLoggedIn)
            
            if(errors.length > 0){
                callback(errors)
                return
            }else{
                blogRepository.getBlogpostById(blogId, function(errors, blogpost){
                    callback(errors, blogpost)
                })
            }   
        },

        createBlogpost: function(title, content, posted, imageFile, userId, isLoggedIn, username, callback){
            const errors = this.getErrors(title, content, isLoggedIn)
            if(errors.length > 0){
                callback(errors)
                return
            }else{
                accountRepository.getAccountId(username, function(errors, accountId){
                    if(accountId != userId){
                        throw "unauthorized!"
                    }else{
                        blogRepository.createBlogpost(title, content, posted, imageFile, accountId, function(errors, blogpost){
                            callback(errors, blogpost)
                        }) 
                    }    
                })
            }
        }
    }
}


