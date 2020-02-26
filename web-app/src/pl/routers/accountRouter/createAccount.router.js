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
    if(email && userPassword){
        accountManager.createAccount(username, email, userPassword, function(errors, account){
            if(errors != ""){
                response.send("<h1><b>Something went wrong</b></h1>")
                return
            }
            else if(account.lenght != ""){
                request.session.userId = account
                response.redirect("/login")
            }
        })
    }
})

module.exports = router