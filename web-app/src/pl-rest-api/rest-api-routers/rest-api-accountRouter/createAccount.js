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
        
        accountManager.createAccount(username,email,userPassword,userPassword2, function(errors, account){
            console.log("errorPL:", errors)
            console.log("newAccountPL", account)
            
            if(errors.length > 0){
                
                if(errors.includes("databaseError")){
                    response.status(500).end()
                }
                else if(errors.inclused("email must be unique!")){
                    uniqueError.push("Email must be unique!")
                    errors = uniqueError
                    const model = {
                        errors
                    }
                    response.render("create-account.bhs", model)
                }
                else{
                    const model = {
                        errors
                    }
                    console.log("modelcreateAccount:", model)
                    response.render("create-account.bhs", model)
                }
            }else{
                response.status(201).end()
                request.session.userId = account.dataValues.personId
                response.redirect("/login")
            }
        })  
    })
    return router
}