const express = require('express')
const router = express.Router()
const toDoManager = require('../../../bll/toDo-manager')
const toDoRepo = require('../../../dal/toDo-repository')

router.get("/", function(request, response){

    toDoManager.getAllToDos(function(errors, toDos){
        const model = {
            errors: errors,
            toDos: toDos
        }
        response.render("toDoLists.hbs", model)
    })
})

router.post("/", function(request, response){
   
    const todo = request.body.todo

    toDoRepo.createTodo(todo, function(error, newTodo){
        console.log("todo in router:", newTodo)
        if(error){
            response.send("<h1><b>Something went wrong</b></h1>")
        }else{
            response.redirect("/toDoLists")
        }
    })
})


module.exports = router