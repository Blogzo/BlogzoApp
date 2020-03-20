//import { fetchAllBlogposts, fetchBlogpost, fetchAllToDoLists } from'./communicationBackend'

document.addEventListener("DOMContentLoaded", function(){

    changeToPage(location.pathname)
	
	if(localStorage.accessToken){
		login(localStorage.accessToken)
	}else{
		logout()
	}
	
	document.body.addEventListener("click", function(event){
		if(event.target.tagName == "A"){
			event.preventDefault()
			const url = event.target.getAttribute("href")
			goToPage(url)
		}
    })
    
    document.querySelector("#create-account-page").addEventListener("submit", function(event){

        event.preventDefault()

        const username = document.querySelector("#create-account-page .username").value
        const email = document.querySelector("#create-account-page .email").value
        const userPassword = document.querySelector("#create-account-page .userPassword").value
        const userPassword2 = document.querySelector("#create-account-page .userPassword2").value
        const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

        const user = {
            username,
            email,
            userPassword,
            userPassword2
        }

        fetch(
            "http://localhost:8080/restAPI/create-account", {
                method: "POST",
                headers: {
                    "CSRF-Token": token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user)
            }
        ).then(function(response){
            if(response.status(200).end()){
                console.log("createAccountResponse", response)
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

    document.querySelector("#create-todo-page").addEventListener("submit", function(event){

        event.preventDefault()

        const toDo = document.querySelector("#create-todo-page .name").value

        const newToDo = {
            toDo
        }

        fetch(
            "http://localhost:8080/restAPI/toDoLists", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+localStorage.accessToken
                },
                body: JSON.stringify(newToDo)
            }
        ).then(function(response){
            if(response.status(200).end()){
                console.log(response)
                return response.json()
                //Update view
            }else{
                //Display error
            }
            console.log("response", response)
            response.status(200).end()
            console.log(response)
            return response.json()
            //Update view
            
        }).catch(function(error){
            console.log(error)
            //Update the view and display error
        })

        document.querySelector("#toDoLists-page").addEventListener("submit", function(event){

            event.preventDefault()

            const toDos = document.querySelector("#toDoLists li")

            fetch(
                "http://localhost:8080/restAPI/toDoLists/deletePost", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(toDos)
                }
            ).then(function(response){
                console.log("deleteResponse", response)
                const statuscode = response.status
                if(statuscode != 200){
                    return response.text()
                }
            }).catch(function(error){
                console.log("error", error)
            })
        })
    })

    document.querySelector("#toDoLists-page").addEventListener("submit", function(event){
        
        const toDo = document.querySelector("toDoLists li")
        
        event.preventDefault()

        fetch(
            "http:/localhost:8080/restAPI/toDoLists/updatePost", {
                method: "PUT",
                headers: {
                    "Content-type": "Application/json"
                },
                body: JSON.stringify(toDo)
            }
        ).then(function(response){
            console.log("updateResponse:", response)
            const statuscode = response.status
            if(statuscode != 200){
                return response.text()
            }
        }).catch(function(error){
            console.log("error", error)
        })
    }) 
    
    document.querySelector("#login-page").addEventListener("submit", function(event){

        event.preventDefault()

        const username = document.querySelector("#login-page .username").value
        const userpassword = document.querySelector("#login-page .userPassword").value

        fetch(
            "http://localhost:8080/restAPI/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "grant_type=userPassword&username="+username+"&userPassword"+userpassword            
            }
        ).then(function(response){
            console.log("loginResponse", response)
            const statuscode = response.status
            if(statuscode == 200){
                return response.text()
            }else{
                //error
            }
        }).then(function(body){
            console.log("bodyResponse", body)
            //Read out info about user account from id_token
            login(body.access_token)
            //console.log(accessToken)

        }).catch(function(error){
            console.log(error)

        })
    })
})

window.addEventListener("popstate", function(event){
	const url = location.pathname
	changeToPage(url)
})

function goToPage(url){
	changeToPage(url)
	history.pushState({}, "", url)
	
}

function changeToPage(url){

    const currentPageDiv = document.getElementsByClassName("current-page")[0]
    if(currentPageDiv){
        currentPageDiv.classList.remove("current-page")
    }

    //put into array 

    if(url == "/"){
        document.getElementById("home-page").classList.add("current-page")
    }else if(url == "/about"){
        document.getElementById("about-page").classList.add("current-page")
    }else if(url == "/blogposts"){
        document.getElementById("blogposts-page").classList.add("current-page")
        fetchAllBlogposts()
    }else if(url == "/toDoLists"){
        document.getElementById("toDoLists-page").classList.add("current-page")
        fetchAllToDoLists()
    }else if(url == "/create-account"){
        document.getElementById("create-account-page").classList.add("current-page")
    }else if(url == "/login"){
        document.getElementById("login-page").classList.add("current-page")
    }else if(new RegExp("^/blogposts/[0-9]+$").test(url)){
        document.getElementById("blogpost-page").classList.add("current-page")
        const blogId = url.split("/")[2]
        fetchBlogpost(blogId)
    }else if(url == "/create-blogpost"){
        document.getElementById("create-blogpost-page").classList.add("current-page")
    }else if(url == "toDoLists"){
        document.getElementById("toDoLists-page").classList.add("current-page")
    }else if(url == "/create-todo"){
        document.getElementById("create-todo-page").classList.add("current-page")
    }else if(url == "/toDoLists/delete"){
        
    }else{
        document.getElementById("error-page").classList.add("current-page")
    }
}

function login(accessToken){
    
    localStorage.accessToken = accessToken
    document.body.classList.remove("isLoggedOut")
    document.body.classList.add("isLoggedIn")
}

function logout(){

    localStorage.accessToken = ""
    document.body.classList.remove("isLoggedIn")
    document.body.classList.add("isLoggedOut")
}

function fetchBlogpost(blogId){
    
    fetch(
        "http://localhost:8080/restAPI/blogposts/"+blogId,
    ).then(function(response){
        const statuscode = response.status
        console.log("blogpostsResponse:", response)
        if(statuscode != 200){
            console.log(statuscode+ " "+response.body)
        }else{
            return response.json()
        }
    }).then(function(blogposts){
        console.log("blogposts:", blogposts)
        const titleSpan = document.querySelector("#blogpost-page .title")
        const contentSpan = document.querySelector("#blogpost-page .content")
        const postedSpan = document.querySelector("#blogpost-page .posted")
        const imageSpan = document.querySelector("#blogpost-page .image")
        titleSpan.innerText = blogposts.title
        contentSpan.innerText = blogposts.content
        postedSpan.innerText = blogposts.posted
        imageSpan.innerText = blogposts.image
    }).catch(function(error){
        console.log("Fetch error", error)
    })
}

function fetchAllBlogposts(){

    fetch(
        "http://localhost:8080/restAPI/blogposts"
    ).then(function(response){
        const statuscode = response.status
        console.log("blogpostsResponse:", response)
        if(statuscode != 200){
            console.log(statuscode+ " "+response.body)
        }else{
            return response.json()
        }
    }).then(function(blogposts){
        console.log("blogposts:", blogposts)
        const titleSpan = document.querySelector("#blogpost-page .title")
        const contentSpan = document.querySelector("#blogpost-page .content")
        const postedSpan = document.querySelector("#blogpost-page .posted")
        const imageSpan = document.querySelector("#blogpost-page .image")
        const user = document.querySelector('#blogpost-page .user')
        titleSpan.innerText = blogpost.blogpost.title
        contentSpan.innerText = blogpost.blogpost.content
        postedSpan.innerText = blogpost.blogpost.posted
        imageSpan.innerText = blogpost.blogpost.imageFile
        user.innerText = blogpost.account.account.username
    }).catch(function(error){
        console.log("Fetch error", error)
    })
}

function fetchAllToDoLists(){
    console.log("inside fetchAllTodos")
    fetch(
        "http://localhost:8080/restAPI/toDoLists"
    ).then(function(response){
        console.log("toDoResponse", response)
        const statuscode = response.status
        if(statuscode != 200){
            console.log(statuscode + " " + response.body)
        }else{
            return response.json()
        }                
    }).then(function(toDolists){
        console.log("Todo", toDolists)
        const ul = document.querySelector("#toDoLists-page ul")
        ul.innerText = ""
        for(const toDo in toDolists){
            const li = document.createElement("li")
            const p = document.createElement("p")
            p.innerText = toDolists[toDo].toDo
            li.appendChild(p)
            ul.append(li)
        }
    }).catch(function(error){
        console.log(error)
    })
}
