
module.exports = function({toDoManager}){

    const express = require('express')
    const router = express.Router()

    router.get("/", function(request, response){
        
        const isLoggedIn = request.session.isLoggedIn   
        toDoManager.getAllToDos(isLoggedIn, function(errors, toDos){
            const model = {
                errors: errors,
                toDos: toDos
            }
            response.render("toDoLists.hbs", model)
        })
    })


    router.post("/", function(request, response){
    
        const todo = request.body.todo
        const isLoggedIn = request.session.isLoggedIn
        toDoManager.createTodo(todo, isLoggedIn, function(errors, newTodo){
            console.log("todo in router:", newTodo)
            if(errors){
                const model = {
                    errors: errors
                }
                response.render("toDoLists.hbs", model)
            }else{
                response.redirect("/toDoLists")
            }
        })
    })
    return router
}


