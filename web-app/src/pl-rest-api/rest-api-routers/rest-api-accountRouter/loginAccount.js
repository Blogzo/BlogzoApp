module.exports = function({accountManager}){
    const express = require('express')
    const router = express.router

    router.get("/", function(request, response){
            response.status(200).end()
            response.render("login.hbs")
        
    })

    router.post("/login", function(request, response){

        const grantType = request.body.grant_type
        const invalidRequest = request.body.invalid_request
        const username = request.body.username
        const password = request.body.password
        const token = request.body.idToken
        
    
        if(grantType != "password"){
            response.status(400).json({error: "unsupported_grant_type", error_description: "The authorization grant type is not supported by the authorization server."})
            return
        }
        if(username != correctUsername || password != correctPassword){
            response.status(400).json({error: "invalid_request", error_description: "The request is malformed, a required parameter is missing or a parameter has an invalid value."})
        }
        if(!token){ //ändra om detta till invalid grant
            response.status(401).json({error: "invalid_client", error_description: "Client authentication failed (e.g., unknown client, no client authentication included, or unsupported authentication method)."})
        }
        if(!isLoggedIn){
            response.status(401).json({error: "unauthorized_client", error_description: "The client is not authorized."})
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
    return router
}

