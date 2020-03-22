const express = require('express')

const app = express()

app.use(express.static("static-files"))

app.use(function(request, response, next){
  response.sendFile(__dirname+"/static-files/index.html")
})

app.listen(3000, () => {
    console.log('Server is up!');
})