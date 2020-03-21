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
    }else if(url == "/update-todo"){
        document.getElementById("update-todo-page").classList.add("current-page")
    }else if(url == "/create-account"){
        document.getElementById("create-account-page").classList.add("current-page")
    }else if(url == "/login"){
        document.getElementById("login-page").classList.add("current-page")
    }else if(new RegExp("^/blogposts/[0-9]+$").test(url)){
        document.getElementById("blogpost-page").classList.add("current-page")
        const blogId = url.split("/")[2]
        fetchBlogpost(blogId)
    }else if(new RegExp("^/toDoLists/[0-9]+$").test(url)){
        document.getElementById("toDoList-page").classList.add("current-page")
        const todoId = url.split("/")[2]
        fetchToDo(todoId)
    }else if(url == "toDoLists"){
        document.getElementById("toDoLists-page").classList.add("current-page")
    }else if(url == "/logout"){
        logout()
    }else if(url == "/create-todo"){
        document.getElementById("create-todo-page").classList.add("current-page")
    }else if(url == "/toDoLists/delete"){
        
    }else{
        document.getElementById("error-page").classList.add("current-page")
    }
}

function login(idToken){
    
    localStorage.accessToken = idToken
    document.body.classList.remove("isLoggedOut")
    document.body.classList.add("isLoggedIn")
}

function logout(){

    localStorage.accessToken = ""
    document.body.classList.remove("isLoggedIn")
    document.body.classList.add("isLoggedOut")
}

