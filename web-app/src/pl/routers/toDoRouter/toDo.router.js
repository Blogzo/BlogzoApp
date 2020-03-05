
module.exports = function({toDoManager}){

    const express = require('express')
    const router = express.Router()

    router.get("/", function(request, response){
        
        const isLoggedIn = request.session.isLoggedIn   
        toDoManager.getAllToDos(isLoggedIn, function(toDos, errors){
            if(errors.includes("Need to be logged in!")){
                response.render("unauthorized.hbs")
            }else{
                console.log("toDOsInPL:", toDos)
                const model = {
                    toDos,
                    errors
                }
                console.log("modelTodo:", {model})
                response.render("toDoLists.hbs", { model })
            }
        })
    })


    router.post("/", function(request, response){
    
        const todo = request.body.todo
        const isLoggedIn = request.session.isLoggedIn
        toDoManager.createTodo(todo, isLoggedIn, function(newTodo, errors){
            if(errors.includes("Need to be logged in!")){
                response.render("unauthorized.hbs")
            }
            else if(!errors.includes("Need to be logged in!")){
                const model = {
                    errors
                }
                response.render("toDoLists.hbs", { model })
            }else{
                response.redirect("/toDoLists")
            }
        })
    })
    return router
}


