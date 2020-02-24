const db = require('./db')

exports.getBlogposts = function(callback){

    const query = "SELECT * FROM blogposts"
    db.query(query, function(error, blogposts){
        if(error){
            callback(["DatabaseError"], null)
        }else{
            callback([], blogposts)
        }
    })
}

exports.getBlogpostId = function(blogId ,callback){

    const query = "SELECT * FROM blogposts WHERE blogId = ?"
    const value = [blogId]
    db.query(query, value, function(error, blogpost){
        if(error){
            callback(["DatabaseError"], null)
        }else{
            callback([], blogpost)
        }
    })
}


exports.createBlogpost = function(title, content, posted, imageFile, userId, callback){

    const query = "INSERT INTO blogposts (title, content, posted, imageFile, userId) VALUES (?, ?, ?, ?, ?)"
    const values = [title, content, posted, imageFile, userId]
    console.log("blogValues:", values)
    db.query(query, values, function(error, blogpost){
        console.log("blogpost:", blogpost)
        if(error){
            callback("DatabaseError", null)
        }else{
            callback(null, blogpost.insertId)
        }
    })
}