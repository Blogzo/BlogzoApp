module.exports = function({toDoManager}){
    const express = require('express')
    const router = express.router

    router.get("/", function(requst, response){
        if(errors.inclues("databaseErrors")){
            response.status(500).end()
        }
        else if(errors.inclues("Needs to be logged in!")){
            response.status(401).end()
            response.redirect("unathorized!")
        }
        else if(errors.length > 0){
            const model = {
                errors
            }
            response.render("toDoLists.hbs", { model })
        }
        else{
            const model = {
                toDos
            }
            response.render("toDoLists.hbs", { model })
        }
    })

    return router
}