
const express = require('express')
const router = express.Router()

router.post("/", function(request, response){

    request.session.isLoggedIn = false
    response.redirect("/")
})

module.exports = router