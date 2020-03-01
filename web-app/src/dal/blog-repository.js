const db = require('./db')

module.exports = function({}){

    return {

        getBlogposts: function(callback){
            const query = "SELECT * FROM blogposts"
            db.query(query, function(errors, blogposts){
                if(errors){
                    callback(["DatabaseError"], null)
                }else{
                    callback([], blogposts)
                }
            })
        },

        getBlogpostId: function(blogId, callback){

            const query = "SELECT * FROM blogposts WHERE blogId = ?"
            const value = [blogId]
            db.query(query, value, function(errors, blogpost){
                if(errors){
                    callback(["DatabaseError"], null)
                }else{
                    callback([], blogpost)
                }
            })
        },

        createBlogpost: function(title, content, posted, imageFile, userId, callback){

            const query = "INSERT INTO blogposts (title, content, posted, imageFile, userId) VALUES (?, ?, ?, ?, ?)"
            const values = [title, content, posted, imageFile, userId]
            db.query(query, values, function(errors, blogpost){
                console.log("blogpost:", blogpost)
                if(errors){
                    callback(["DatabaseError"], null)
                }else{
                    callback([], blogpost.insertId)
                }
            })
        }
    }
}

