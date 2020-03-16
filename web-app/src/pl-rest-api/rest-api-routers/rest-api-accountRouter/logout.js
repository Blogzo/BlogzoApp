module.exports = function({accountManager}){
    
    const express = require('express')
    const router = express.router

    router.post("/", function(request, response){
        request.session.isLoggedIn = false
        response.status(201).end()
        response.redirect("/")
    })
    return router
}
