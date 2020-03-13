const backend = require('./communicationBackend')
document.addEventListener("DOMContentLoaded", function(){
    console.log("inside DOM")
    changeToPage(location.pathname)
	
	if(localStorage.accessToken){
		backend.login(localStorage.accessToken)
	}else{
		backend.logout()
	}
	
	document.body.addEventListener("click", function(event){
        console.log("inside click event")
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
	console.log("inside goToPage")
	changeToPage(url)
	history.pushState({}, "", url)
	
}

function changeToPage(url){
    console.log("inside changeToPage")
    const currentPageDiv = document.getElementsByClassName("current-page")[0]
    if(currentPageDiv){
        currentPageDiv.classList.remove("current-page")
    }

    switch(url){

        case "/":
            document.getElementById("home-page").classList.add("current-page")
            console.log("inside /")
        case "/sign-up":
            document.getElementById("signUp-page").classList.add("current-page")
        case "/login":
            document.getElementById("login-page").classList.add("current-page")
            console.log("inside /login")
        case "/blogposts":
            document.getElementById("blogposts-page").classList.add("current-page")
            backend.fetchAllBlogposts()
        case new RegExp("^/blogposts/[0-9]+$").test(url):
            document.getElementById("blogpost-page").classList.add("current-page")
		    const blogId = url.split("/")[2]
		    backend.fetchBlogpost(blogId)
        case "/create-blogpost":
            document.getElementById("create-blogpost-page").classList.add("current-page")
        case "/toDoLists":
            document.getElementById("toDoLists-page").classList.add("current-page")
            backend.fetchAllToDoLists()
        default:
            document.getElementById("error-page").classList.add("current-page")
            return
    }
}