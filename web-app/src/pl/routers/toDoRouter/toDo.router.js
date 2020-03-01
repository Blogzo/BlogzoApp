
module.exports = function({toDoManager}){

    const express = require('express')
    const router = express.Router()

    router.get("/", function(request, response){
        
        const isLoggedIn = request.session.isLoggedIn   
        toDoManager.getAllToDos(isLoggedIn, function(errors, toDos){
            if(errors.includes("Need to be logged in!")){
                response.render("unauthorized.hbs")
            }else{
                const model = {
                    toDos: toDos
                }
                response.render("toDoLists.hbs", model)
            }
        })
    })


    router.post("/", function(request, response){
    
        const todo = request.body.todo
        const isLoggedIn = request.session.isLoggedIn
        toDoManager.createTodo(todo, isLoggedIn, function(errors, newTodo){
            if(errors != ""){
                if(errors.includes("Need to be logged in!")){
                    response.render("unauthorized.hbs")
                }else{
                    const model = {
                        errors: errors
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


