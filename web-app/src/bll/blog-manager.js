const blogRepo = require('../dal/blog-repository')
const express = require('express')
const app = express()

app.use(function(request, response, next){
   
    response.locals.isLoggedIn = request.session.isLoggedIn
    next()
})

exports.getBlogpostId = function(id){

    if(request.session.isLoggedIn){
        return blogRepo.getBlogpostId(id)
    }else{
        throw "Unauthorized!"
    }
}