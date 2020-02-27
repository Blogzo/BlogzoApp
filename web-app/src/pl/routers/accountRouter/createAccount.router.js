const express = require('express')
const accountManager = require('../../../bll/account-manager')
const router = express.Router()

router.get("/", function(request, response){

    response.render("create-account.hbs")
})

router.post("/", function(request, response){

    const email = request.body.email
    const username = request.body.username
    const userPassword = request.body.userPassword
    accountManager.createAccount(username, email, userPassword, function(errors, account){
        if(errors != ""){
            const model = {
                errors: errors
            }
            response.render("create-account.hbs", model)
        }            
        else if(account.lenght != ""){
             request.session.userId = account
             response.redirect("/login")
        }
    })
})

module.exports = router