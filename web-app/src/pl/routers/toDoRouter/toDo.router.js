
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
        
        toDoManager.createTodo(userId, todo, isLoggedIn, function(errors, newTodo){
            
            if(errors.length > 0){
                if(errors.includes("databaseError")){
                    response.status(500).render("errors.hbs")
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
                response.redirect("/toDoLists")
            }
            
        })
    })

    router.post("/deleteTodo/:todoId", function(request, response){
        
        const todoId = request.params.todoId
        const isLoggedIn = request.session.isLoggedIn

        toDoManager.deleteToDo(todoId, isLoggedIn, function(errors, deletedToDo){
            
            if(errors.length > 0){
                if(errors.includes("databaseError")){
                    response.status(500).render("errors.hbs")
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
                response.redirect("/toDoLists")
            }
        })
    })

    router.post("updatePost", function(request, response){
        
        const todo = request.body.todo
        const isLoggedIn = request.session.isLoggedIn

        toDoManager.updateTodo(todo, isLoggedIn, function(errors, updateTodo){
            
            if(errors.length > 0){
                if(errors.includes("databaseError")){
                    response.status(500).render("errors.hbs")
                }
                else if(errors.includes("Need to be logged in!")){
                    response.status(401).render("unauthorized401.hbs")
                }else{
                    const model = {
                        errors
                    }
                    response.render("todoLists.hbs", {model})
                }
            }else{
                response.redirect("/toDoLists")
            }
        })
    })
    return router
}


