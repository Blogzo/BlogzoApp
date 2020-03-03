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

        getUsernameById: function(userId, callback){

            const query = "SELECT username FROM accounts INNER JOIN blogposts ON accounts.personId = blogposts.userId WHERE userId = ?"
            const value = [userId]
            console.log("userIdInDAL:", userId)
            db.query(query, value, function(errors, username){
                if(errors){
                    callback(["DataBaseError"], null)
                }else{
                    callback([], username)
                }
            })
        },

        
        createBlogpost: function(title, content, posted, imageFile, userId, callback){

            const query = "INSERT INTO blogposts (title, content, posted, imageFile, userId) VALUES (?, ?, ?, ?, ?)"
            const values = [title, content, posted, imageFile, userId]
            db.query(query, values, function(errors, blogpost){
                if(errors){
                    callback(["DatabaseError"], null)
                }else{
                    callback([], blogpost.insertId)
                }
            })
        },

        getUsernamesById: function([userId], callback){
            const query = "SELECT username FROM accounts INNER JOIN blogposts On accouts.personId = blogposts.userId Where UserId = ?"
            const values = [userId]
            for(i in userId){
                db.query(query, values, function(errors, username){
                    console.log("usernamesInDal", username)
                    if(errors){
                        callback(["DatabaseError:"], null)
                    }else{
                        callback([], username)
                    }
                })
            }
        }
    }
}

