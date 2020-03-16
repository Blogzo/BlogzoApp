document.addEventListener("DOMContentLoaded", function(){

    document.querySelector("#create-account-page").addEventListener("submit", function(event){

        changeToPage(location.pathname)
	
            if(localStorage.accessToken){
                login(localStorage.accessToken)
            }else{
                logout()
        }

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
            const statuscode = response.status
            if(statuscode == 200){
                return response.json()
            }else{
                //error
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

module.exports = {

    fetchAllBlogposts(){

        fetch(
            "http://localhost:3000/blogposts"
        ).then(function(response){
            const statuscode = response.status
            if(statuscode == 200){
                return response.json()
            }
        }).then(function(blogposts){
            const u1 = document.querySelector("#blogposts-page u1")
            u1.innerText = ""
            for(const blogpost in blogposts){
                const li = document.createElement("li")
                const anchor = document.createElement("a")
                anchor.innerText = blogpost.name
                anchor.setAttribute("href", '/blogposts/'+blogpost.id)
                li.appendChild(anchor)
                u1.append(li)
            }
        }).catch(function(error){
            console.log(error)
        })
    },
    
    fetchBlogpost(blogId){
    
        fetch(
            "http://localhost:3000/blogposts/"+blogId
        ).then(function(response){
            const statuscode = response.status
            if(statuscode == 200){
                return response.json()
            }else{
                //error
            }
        }).then(function(blogpost){
            const nameSpan = document.querySelector("#blogpost-page .name")
            const idSpan = document.querySelector("#blogpost-page .blogId")
            nameSpan.innerText = blogpost.name
            idSpan.innerText = blogpost.blogId
        }).catch(function(error){
            console.log(error)
        })
    },
    
    fetchAllToDoLists(){
    
        fetch(
            "http://localhost:3000/toDoLists"
        ).then(function(response){
            const statuscode = response.status
            if(statuscode == 200){
                return response.json()
            }
        }).then(function(toDolists){
            const u1 = document.querySelector("#blogposts-page u1")
            u1.innerText = ""
            for(const toDo in toDolists){
                const li = document.createElement("li")
                const anchor = document.createElement("a")
                anchor.innerText = blogpost.name
                anchor.setAttribute("href", '/toDolists/'+toDo.id)
                li.appendChild(anchor)
                u1.append(li)
            }
        }).catch(function(error){
            console.log(error)
        })
    },
    
    login(accessToken){
    
        localStorage.accessToken = accessToken
        document.body.classList.remove("isLoggedOut")
        document.body.classList.add("isLoggedIn")
    },
    
    logout(){
    
        localStorage.accessToken = ""
        document.body.classList.remove("isLoggedIn")
        document.body.classList.add("isLoggedOut")
    }
}

