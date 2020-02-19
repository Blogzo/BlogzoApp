const express = require('express')
const router = express.Router()

router.get("/", function(request, response){

    response.render("logout.hbs")
})

router.post("/", function(request, response){

    request.session.isLoggedIn = false
    response.render("start.hbs")
})

module.exports = router