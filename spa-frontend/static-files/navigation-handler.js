//import { fetchAllBlogposts } from'./communicationBackend'

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
    }else if(url == "/create-account"){
        document.getElementById("create-account-page").classList.add("current-page")
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
        console.log("ErrorFetchingBlogposts:", error)
    })
}


function fetchBlogpost(blogId){

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
        console.log("ErrorFetchingBlogpost:", error)
    })
}


function fetchAllToDoLists(){

    fetch(
        "http://localhost:3000/toDoLists"
    ).then(function(response){
        const statuscode = response.status
        if(statuscode == 200){
            return response.json()
        }
    }).then(function(toDolists){
        const u1 = document.querySelector("#toDoLists-page u1")
        u1.innerText = ""
        for(const toDo in toDolists){
            const li = document.createElement("li")
            const anchor = document.createElement("a")
            anchor.innerText = blogpost.name
            anchor.setAttribute("href", '/toDoLists/'+toDo.id)
            li.appendChild(anchor)
            u1.append(li)
        }
    }).catch(function(error){
        console.log("ErrorFetchingToDoLists:", error)
    })
}