const db = require('./db')

exports.getBlogposts = function(callback){

    const query = "SELECT * FROM blogposts"
    db.query(query, function(error, blogposts){
        if(error){
            callback("DatabaseError", null)
        }else{
            callback(null, blogposts)
        }
    })
}

exports.getBlogpostId = function(id ,callback){

    const query = "SELECT * FROM blogposts WHERE blogId = ?"
    const value = [id]
    db.query(query, value, function(error, blogpost){
        if(error){
            callback("DatabaseError", null)
        }else{
            return blogpost
        }
    })
}

exports.createBlogpost = function(title, content, posted, imgeFile, userId, callback){

    const query = "INSERT INTO blogposts (title, content, posted, imgeFile, userId) VALUES (?, ?, ?, ?, ?)"
    const values = [title, content, posted, imgeFile, userId]
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