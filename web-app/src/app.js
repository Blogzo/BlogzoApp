const express = require('express')

const app = express()

app.get('/', function(request, response){
    
    response.send("Hello, world!")
})

app.listen(8080, function(){

    console.log("Web app listening on port 8080.")
})