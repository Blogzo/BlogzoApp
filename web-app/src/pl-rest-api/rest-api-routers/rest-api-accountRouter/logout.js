module.exports = function({accountManager}){
    
    const express = require('express')
    const router = express.router

    router.post("/", function(request, response){
        request.body.IdToken = false
        response.status(201).end()
        response.redirect("/")
    })
    return router
}
