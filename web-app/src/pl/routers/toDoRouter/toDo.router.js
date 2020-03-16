
module.exports = function({toDoManager}){

    const express = require('express')
    const router = express.Router()

    router.get("/", function(request, response){
        
        const isLoggedIn = request.session.isLoggedIn   
        toDoManager.getAllToDos(isLoggedIn, function(errors, toDos){
            if(errors.length > 0){
                if(errors.includes("databaseError")){
                    response.send("<h1>Something went wrong!</h1>")
                }
                else if(errors.includes("Need to be logged in!")){
                    response.render("unauthorized.hbs")
                }else{
                    console.log("toDOsInPL:", toDos)
                    const model = {
                        errors
                    }
                    console.log("modelTodo:", { model })
                    response.render("toDoLists.hbs", { model })
                }
            }else{
                const model = {
                    toDos
                }
                response.render("toDoLists.hbs", { model })
            }
        })
    })


    router.post("/", function(request, response){
    
        const todo = request.body.todo
        const isLoggedIn = request.session.isLoggedIn
        toDoManager.createTodo(todo, isLoggedIn, function(errors, newTodo){
            if(errors.length > 0){
                if(errors.includes("databaseError")){
                    response.send("<h1>Something went wrong!</h1>")
                }
                else if(errors.includes("Need to be logged in!")){
                    response.render("unauthorized.hbs")
                }else{
                    const model = {
                        errors
                    }
                    console.log("todoErrorPL:", {model})
                    response.render("toDoLists.hbs", { model })
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
                if(errors.includes("databaseError")){
                    response.send("<h1>Something went wrong!</h1>")
                }
                else if(errors.includes("Need to be logged in!")){
                    response.render("unauthorized.hbs")
                }else{
                    const model = {
                        errors
                    }
                    console.log("todoErrorPL:", {model})
                    response.render("toDoLists.hbs", { model })
                }
            }else{
                response.redirect("/toDoLists")
            }
        })
    })
    return router
}


