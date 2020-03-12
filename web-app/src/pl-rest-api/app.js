const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const blogpostHandler = require('../bll/blog-manager')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

const correctUsername = "Admin"
const correctPassword = "abc123"
const serverSecret = "sdfkjdslkfjslkfd"

app.get("blogposts", function(request, response){
    // TODO: Extracting the payload is better put in a function
	// (preferably a middleware function).
    const authorixationHeader = request.get('authorization')
    const accessToken = authorixationHeader.substr("Bearer ".length)

    try {
        // TODO: Better to use jwt.verify asynchronously.
		const payload = jwt.verify(accessToken, serverSecret)
		
		// Use payload to implement authorization...
		
	}catch(e){
		response.status(401).end()
		return
    }
    
    blogpostHandler.getAllBlogposts(function(blogposts, errors){

        if(errors.length > 0){
            response.status(500).end()
        }else{
            response.status(200).json(blogposts)
        }
    })

    
})


