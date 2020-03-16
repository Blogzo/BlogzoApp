
document.addEventListener("DOMContentLoaded", function(){

    changeToPage(location.pathname)
	
	if(localStorage.accessToken){
		backend.login(localStorage.accessToken)
	}else{
		backend.logout()
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

    if(url == "/"){
        document.getElementById("home-page").classList.add("current-page")
    }else if(url == "/about"){
        document.getElementById("about-page").classList.add("current-page")
    }else if(url == "/blogposts"){
        document.getElementById("blogposts-page").classList.add("current-page")
        //fetchAllBlogposts()
    }else if(url == "/login"){
        document.getElementById("login-page").classList.add("current-page")
    }else if(new RegExp("^/blogposts/[0-9]+$").test(url)){
        document.getElementById("blogpost-page").classList.add("current-page")
        //const blogId = url.split("/")[2]
        //fetchBlogpost(blogId)
    }else if(url == "/create-blogpost"){
        document.getElementById("create-blogpost-page").classList.add("current-page")
    }else{
        document.getElementById("error-page").classList.add("current-page")
    }
}