
module.exports = function({accountManager}){
	
	const express = require('express')
	const router = express.Router()

	router.get("/", function(request, response){

		response.render("login.hbs")
	})

	router.post("/", function(request, response){

		const username = request.body.username
		const userPassword = request.body.password
		
		accountManager.getUserPassword(username, userPassword, function(account, errors){
			console.log("loginError:", errors)
			if(errors.includes("databaseError")){
				response.send("<h1>Something went wrong!</h1>")
			}
			else if(errors.length > 0){
				const model = {
					errors: errors
				}
				response.render("login.hbs", model)	
			}else{
				request.session.isLoggedIn = true
				request.session.username = username
				response.redirect("/blogposts")
			}
		})
		
	})
	return router 
}