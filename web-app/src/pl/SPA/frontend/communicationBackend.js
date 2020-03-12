document.addEventListener("DOMContentLoaded", function(){

    document.querySelector("#create-account-page").addEventListener("submit", function(event){

        event.preventDefault()

        const username = document.querySelector("#create-account-page .username").value
        const email = document.querySelector("#create-account-page .email").value
        const userPassword = document.querySelector("#create-account-page .userpassword").value

        const user = {
            username,
            email,
            userPassword
        }

        fetch(
            "http://localhost:3000/create-account", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+localStorage.accessToken
                },
                body: JSON.stringify(user)
            }
        ).then(function(response){
            if(response.status(200).end()){
                console.log(response)
                return response.json()
                //Update view
            }else{
                //Display error
            }

        }).catch(function(error){
            console.log(error)
            //Update the view and display error
            
        })


    })

    document.querySelector("#login-page").addEventListener("submit", function(event){

        event.preventDefault()

        const username = document.querySelector("#login-page .username").value
        const userpassword = document.querySelector("#login-page .userPassword").value

        fetch(
            "http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "grant_type=userPassword&username="+username+"&userPassword"+userpassword            
            }
        ).then(function(response){
            if(response.status(200).end()){
                return response.json()
            }

        }).then(function(body){
            //Read out info about user account from id_token
            login(body.access_token)
            console.log(accessToken)

        }).catch(function(error){
            console.log(error)

        })
    })
})