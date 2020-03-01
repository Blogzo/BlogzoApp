
module.exports = function({accountManager}){
	
	const express = require('express')
	const router = express.Router()

	router.get("/", function(request, response){

		response.render("login.hbs")
	})

	router.post("/", function(request, response){

		const username = request.body.username
		const userPassword = request.body.password
		if (username && userPassword) {
			accountManager.getUserPassword(username, userPassword, function(errors, account){
				console.log("loginError:", errors)
				if(errors != ""){
					if(errors.includes("Username do not exists!")){
						const model = {
							errors: errors
						}
						response.render("login.hbs", model)	
					}
					else if(errors.includes("Wrong password!")){
						const model = {
							errors: errors
						}
						response.render("login.hbs", model)	
					}
				}else if(account){
					request.session.isLoggedIn = true
					request.session.username = username
					response.redirect("/blogposts")
				}
			})
		}	
	})
	return router 
}