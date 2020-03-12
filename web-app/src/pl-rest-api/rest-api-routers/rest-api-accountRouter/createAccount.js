module.exports = function({accountManager}){
    const express = require('express')
    const router = express.Router()

    router.get("/", function(request, response){
        if(errors.includes("databaseError")){
            response.status(500).end()
        }
        else if(!account){
            response.status(404).end()
        }
        else{
            response.status(200).end()
            response.render("create-account.hbs")
        }
    })

    router.post("/", function(request, response){
        const uniqueError = []
        const email = request.body.email
        const username = request.body.username
        const userPassword = request.body.userPassword
        const userPassword2 = request.body.userPassword2
        const grantType = request.body.grant_type
        
    })

    return router
}