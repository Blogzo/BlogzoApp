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

        const user = {
            username,
            email,
            userPassword,
            userPassword2
        }

        fetch(
            "http://localhost:3000/restAPI/create-account", {
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
            "http://localhost:3000/restAPI/login", {
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
        const u1 = document.querySelector("#blogposts-page ul")
        u1.innerText = ""
        for(const blogpost in blogposts){
            const li = document.createElement("li")
            const anchor = document.createElement("a")
            anchor.innerText = blogposts[blogpost].title
            anchor.setAttribute("href", '/blogposts/'+blogposts[blogpost].blogId)
            li.appendChild(anchor)
            u1.append(li)
        }
    }).catch(function(error){
        console.log("Fetch error", error)
    })
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
        titleSpan.innerText = blogpost.title
        contentSpan.innerText = blogpost.content
        postedSpan.innerText = blogpost.posted
        imageSpan.innerText = blogpost.image
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
            console.log(statuscode+ " "+response.body)
        }else{
            return response.json()
        }                
    }).then(function(toDolists){
        console.log("Todo", toDolists)
        const ul = document.querySelector("#toDoLists-page ul")
        ul.innerText = ""
        for(const toDo in toDolists){
            const li = document.createElement("li")
            const anchor = document.createElement("a")
            anchor.innerText = toDolists.toDo
            anchor.setAttribute("href", '/toDoLists/'+toDo.id)
            li.appendChild(anchor)
            ul.append(li)
        }
    }).catch(function(error){
        console.log(error)
    })
}




