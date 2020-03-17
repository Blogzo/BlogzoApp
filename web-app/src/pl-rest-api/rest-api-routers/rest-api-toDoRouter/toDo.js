module.exports = function({toDoManager}){
    const express = require('express')
    const router = express.router

    router.get("/toDoLists", function(requst, response){
        if(errors.inclues("databaseErrors")){
            response.status(500).end()
        }
        else if(errors.inclues("Needs to be logged in!")){
            response.status(401).end()
        }
        else{
            response.status(200).end()
        }
    })

    router.post("/toDoLists", function(request, response){

        const todo = request.body.todo
        toDoManager.createTodo(todo, function(errors, newTodo){
            if(errors.length > 0){
                if (errors.inclues("databaseError")){
                    response.status(500).end()
                }
                else if(errors.inclues("Need to be logged in!")){
                    response.status(401).end()
                }
            }else{
                response.status(200).end()
            }
        })
    })

    return router
}