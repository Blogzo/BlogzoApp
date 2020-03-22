
const express = require('express')
const router = express.Router()

router.post("/", function(request, response){

    request.session.isLoggedIn = false
    request.session.userId = null
    response.redirect("/")
})

module.exports = router