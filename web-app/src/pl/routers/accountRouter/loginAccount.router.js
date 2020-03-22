
module.exports = function({accountManager}){
	
	const express = require('express')
	const router = express.Router()

	router.get("/", function(request, response){

		response.render("login.hbs")
	})

	router.post("/", function(request, response){

		const username = request.body.username
		const userPassword = request.body.password
		
		accountManager.getUserPassword(username, userPassword, function(errors, account){

			if(errors){
				if(errors.includes("databaseError")){
                    response.status(500).render("error500.hbs")
				}else{
					const model = {
						errors: errors,
						username
					}
					response.render("login.hbs", model)	
				}
			}
			else if(!account){
				response.status(404).render("notFound.hbs")
			}else{
				request.session.isLoggedIn = true
				request.session.username = username
				response.redirect("/blogposts")
			}
		})
	})
	return router 
}