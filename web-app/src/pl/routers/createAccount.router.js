const express = require('express')
const accountManager = require('../../dal/account-repository')
const router = express.Router()

router.get("/", function(request, response){

    response.render("create-account.hbs")
})

router.post("/", function(request, response){

    const email = request.body.email
    const username = request.body.username
    const userPassword = request.body.userPassword
    if(email && userPassword){
        accountManager.createAccount(username, email, userPassword, function(error, account){
            console.log("accountSignIn:", account)
            if(error){
                response.send("<h1>Error with database</h1>")
            }
            else if(account > 0){
                response.redirect("/login")
            }
        })
    }
})

module.exports = router