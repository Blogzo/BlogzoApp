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

app.post("/login", function(request, response){

    const grantType = request.body.grant_type
    const invalidRequest = request.body.invalid_request
    const username = request.body.username
    const password = request.body.password
    

    if(grantType != "password"){
        response.status(400).json({error: "unsupported_grant_type", error_description: "The authorization grant type is not supported by the authorization server."})
        return
    }
    if(username != correctUsername || password != correctPassword){
		response.status(400).json({error: "invalid_request", error_description: "The request is malformed, a required parameter is missing or a parameter has an invalid value."})
	}

	if(/*invalid client*/){ //ändra om detta till invalid grant
		response.status(401).json({error: "invalid_client", error_description: "Client authentication failed (e.g., unknown client, no client authentication included, or unsupported authentication method)."})
	}
	if(!isLoggedIn){
		response.status(401).json({error: "unauthorized_client", error_description: "The client is not authorized."})
	}
	if(/*invalid_scope*/){
        response.status(400).json({error: "invalid_scope", error_description: "The scope is malformed or invalid."})
    }
    if(username == correctUsername && password == correctPassword){
        // TODO: Put user authorization info in the access token.
        const payload = {id: 1, "username": username, "password": password}
        // TODO: Better to use jwt.sign asynchronously.
        jwt.sign(payload, serverSecret).then(function(result){
            console.log(result)
           
            const idToken = jwt.sign(
                {sub: 1, email: email, username: username},
                "fregtrhyhtrytu"
            )
    
            response.status(200).json({
                access_token: result,
                id_token: idToken
            })
        }).catch(function(error){
            console.log(error)
            response.status(400).json({error: "invalid_grant"})
        })
        // TODO: Put user info in the id token.
		// Try to use the standard claims:
		// https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims
        
    }


})
