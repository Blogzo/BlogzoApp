
module.exports = function({accountManager}){
	
	const express = require('express')
	const router = express.Router()

	router.get("/", function(request, response){

		response.render("login.hbs")
	})

	router.post("/", function(request, response){

		const username = request.body.username
		const userPassword = request.body.password
		const validationErrors = []
		if (username && userPassword) {
			accountManager.getUserPassword(username, userPassword, function(errors, account){
				if(errors != ""){
					response.send("<h1>Something went wrong!</h1>")
				} 
				else if(account.length == ""){
					validationErrors.push("Wrong username/password!")
					const model = {
						validationErrors
					}
					response.render("login.hbs", model)	
				}else{
					request.session.isLoggedIn = true
					request.session.username = username
					response.redirect("/blogposts")
				}
			})
		}	
	})
	return router 
}