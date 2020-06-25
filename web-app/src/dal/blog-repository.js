const db = require('./db')

module.exports = function({}){

    return {

        getBlogposts: function(callback){
            
            const query = "SELECT * FROM blogposts"
           
            db.query(query, function(errors, blogposts){
                console.log("blogpostsDAL", blogposts);
                
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
                console.log("getBlogpostIdDAL", blogpost);
                
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
                console.log("DAL");
                
                
                if(errors){
                    callback(["databaseError"], null)
                }else{
                    console.log("BlogpostDAL", status.insertId);
                    
                    callback([], status.insertId)
                }
            })
        },
    }
}

