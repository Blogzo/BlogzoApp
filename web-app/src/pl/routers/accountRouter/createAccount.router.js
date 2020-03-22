
module.exports = function({accountManager}){
    
    const express = require('express')
    const router = express.Router()

    router.get("/", function(request, response){

        response.render("create-account.hbs")
    })

    router.post("/", function(request, response){

        const uniqueError = []
        const email = request.body.email
        const username = request.body.username
        const userPassword = request.body.userPassword
        const userPassword2 = request.body.userPassword2
           
        accountManager.createAccount(username, email, userPassword, userPassword2, function(errors, account){
            
            console.log("errorPL:", errors)
            console.log("newAccountPL", account)

            if(errors){
                if(errors.includes("databaseError")){
                    response.status(500).render("error500.hbs")
                }
                //check SequelizeUniqueConstraintError
                else if(errors.includes("Username already exists!")){
                    uniqueError.push("Username already exists!")
                    errors = uniqueError
                    const model = {
                        errors,
                        username,
                        email
                    }
                    response.render("create-account.hbs", model)
                }
                else if(errors.includes("Email already exists!")){
                    uniqueError.push("Email already exists!")
                    errors = uniqueError
                    const model = {
                        errors,
                        username,
                        email
                    }
                    response.render("create-account.hbs", model)
                }
                else if(errors.includes("Password do not match!")){
                    uniqueError.push("Password do not match!")
                    errors = uniqueError
                    const model = {
                        errors,
                        username,
                        email
                    }
                    response.render("create-account.hbs", model)
                }else{
                    const model = {
                        errors,
                        username,
                        email
                    }
                    console.log("modelcreateAccount:", model)
                    response.render("create-account.hbs", model)
                }
            }else{
                request.session.userId = account.dataValues.personId
                response.redirect("/login")
            }
        })
    })
    return router
}