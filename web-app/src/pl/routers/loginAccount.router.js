const express = require('express')
const accountManager = require('../../dal/account-repository')
const router = express.Router()


router.get("/", function(request, response){

    response.render("login.hbs")
})

router.post("/", function(request, response){

    const username = request.body.username
	const userPassword = request.body.password
	const validationErrors = []
	if (username && userPassword) {
		accountManager.getAccount(username, userPassword, function(error, result){
			console.log("resultlogin", result)
			if(error){
				response.send("<h1>Error with database</h1>")
			}
			else if(result.length > 0){
				request.session.isLoggedIn = true
				request.session.username = username
				response.redirect("/home")
			}else{
				validationErrors.push("Wrong username/password!")
				const model = {
					validationErrors
				}
				response.render("login.hbs", model)
			}
		})
	}	
})

module.exports = router
