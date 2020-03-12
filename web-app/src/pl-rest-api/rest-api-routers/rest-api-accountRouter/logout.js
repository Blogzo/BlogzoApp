module.exports = function({accountManager}){
    const express = require('express')
    const router = express.router

    router.get("/", function(request, response){
        if(errors.includes("databaseError")){
            response.status(500).end()
        }
        else if(!account){
            response.status(404).end()
        }
        else{
            response.status(200).end()
            response.redirect("/")
        }
    })
    
    return router
}

