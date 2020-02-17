const express = require('express')
const accountManager = require('../../bll/account-manager')
const router = express.Router()

router.get("/", function(request, response){

    accountManager.getAllAccounts(function(errors, accounts){
        const model = {
            errors: errors,
            accounts: accounts
        }
        response.render("accounts.hbs",  model)
    })
})

module.exports = router