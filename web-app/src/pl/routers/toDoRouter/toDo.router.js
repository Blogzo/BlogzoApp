
module.exports = function({toDoManager}){

    const express = require('express')
    const router = express.Router()

    router.get("/", function(request, response){
        
        const isLoggedIn = request.session.isLoggedIn
        const userId = request.session.userId
        toDoManager.getAllToDosForAccount(userId, isLoggedIn, function(errors, toDos){
            
            if(errors.length > 0){
                if(errors.includes("databaseError")){
                    response.status(500).render("error500.hbs")
                }
                else if(errors.includes("Need to be logged in!")){
                    response.status(401).render("unauthorized401.hbs")
                }else{
                    const model = {
                        errors
                    }
                    response.render("toDoLists.hbs", model)
                }
            }else{
                const model = {
                    toDos
                }
                response.render("toDoLists.hbs", model)
            }
        })
    })

    router.post("/", function(request, response){
    
        const todo = request.body.todo
        
        const userId = request.session.userId
        const isLoggedIn = request.session.isLoggedIn
        
        const accountUsername = request.session.accountUsername
        
        toDoManager.createTodo(userId, todo, accountUsername, isLoggedIn, function(errors, newTodo){
            
            if(errors.length > 0){
                if(errors.includes("databaseError")){
                    response.status(500).render("errors.hbs")
                }
                else if(errors.includes("Need to be logged in!") || errors.includes("Unauthorized")){
                    response.status(401).render("unauthorized401.hbs")
                }else{
                    const model = {
                        errors
                    }
                    response.render("toDoLists.hbs", model)
                }
            }else{
                response.redirect("/toDoLists")
            }
        })
    })
    return router
}


