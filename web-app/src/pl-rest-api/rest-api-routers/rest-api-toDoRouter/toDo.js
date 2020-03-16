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

    router.post("/", function(request, response){

        const todo = request.body.todo
        const isLoggedIn = request.sesion.isLoggedIn
        toDoManager.createTodo(todo, isLoggedIn, function(errors, newTodo){
            if(errors.length > 0){
                if (errors.inclues("databaseError")){
                    response.status(500).end()
                }
                else if(errors.inclues("Need to be logged in!")){
                    response.status(401).end
                }else{
                    const model = {
                        errors
                    }
                    console.log("rotoErrorPL:", {model})
                    response.render("toDoLists.hbs", {model})
                }
            }else{
                response.redirect("/toDoLists")
            }
        })
    })

    router.post("/deletePost", function(request, response){
        const todo = request.body.todo
        const isLoggedIn = request.session.isLoggedIn

        toDoManager.deleteToDo(todo, isLoggedIn, function(errors, deletedToDo){
            if(errors.length > 0){
                if (errors.inclues("databaseError")){
                    response.status(500).end()
                }
                else if(errors.inclues("Need to be logged in!")){
                    response.status(401).end
                }else{
                    const model = {
                        errors
                    }
                    console.log("rotoErrorPL:", {model})
                    response.render("toDoLists.hbs", {model})
                }
            }else{
                response.redirect("/toDoLists")
            }
        })
    })

    return router
}