const db = require('./db')

module.exports = function({}){

    return {

        getBlogposts: function(callback){
            
            const query = "SELECT * FROM blogposts"
           
            db.query(query, function(errors, blogposts){
                
                if(errors){
                    callback(["databaseError"], null)
                }else{
                    callback([], blogposts)
                }
            })
        },

        getBlogpostById: function(blogId, callback){

            const query = "SELECT * FROM blogposts WHERE blogId = ?"
            const value = [blogId]
           
            db.query(query, value, function(errors, blogpost){
                
                if(errors){
                    callback(["databaseError"], null)
                }else{
                    callback([], blogpost)
                }
            })
        },

        createBlogpost: function(title, content, posted, imageFile, accountId, callback){

            const query = "INSERT INTO blogposts (title, content, posted, imageFile, accountId) VALUES (?, ?, ?, ?, ?)"
            const values = [title, content, posted, imageFile, accountId]
            
            db.query(query, values, function(errors, status){
                
                if(errors){
                    callback(["databaseError"], null)
                }else{
                    callback([], status.insertId)
                }
            })
        },
    }
}

