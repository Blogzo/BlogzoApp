document.addEventListener("DOMContentLoaded", function () {
    
    //error handling done
    document.querySelector("#create-account-page form").addEventListener("submit", function (event) {

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
            "http://localhost:8080/restAPI/create-account", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        }
        ).then(function(response){
            const statusCode = response.status
            if(statusCode == 201){
                return response.json()
            }else if(statuscode == 400){
                window.location.replace("/error-page")
            }else{
                const url = "/error-page"
                changeToPage(url)
            }
        }).then(function(model) {
            const url = "/login"
            changeToPage(url)
        }).catch(function(errors) {
            const url = "/error-page"
            changeToPage(url)
            
        })
    })

    document.querySelector("#create-todo-page form").addEventListener("submit", function (event) {
        
        event.preventDefault()

        const todo = document.querySelector("#create-todo-page .todo").value
        const userId = localStorage.userId
        const newToDo = {
            todo,
            userId   
        }
        
        fetch(
            "http://localhost:8080/restAPI/toDoLists", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.accessToken
            },
            body: JSON.stringify(newToDo)
        }
        ).then(function(response) {
            const statusCode = response.status
            if (statusCode == 201) {
                const url = "/toDolists"
                changeToPage(url)
            }else if(statusCode == 401){
                const url = "/unauthorized-page"
                changeToPage(url)
            }else{
                const url = "/error-page"
                changeToPage(url)
            }
        }).catch(function (error) {
            const url = "/error-page"
            changeToPage(url)
        })
    })

    document.querySelector("#toDoList-page form").addEventListener("submit", function (event) {
        
        event.preventDefault()

        const url = location.pathname
        const todoId = url.split("/")[2]

        fetch(
            "http://localhost:8080/restAPI/toDoLists/" + todoId, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.accessToken
            }
        }
        ).then(function (response) {
            const statuscode = response.status
            if (statuscode == 204) {
                const url = "/toDoLists"
                changeToPage(url)
            }else if(statuscode == 401){
                const url = "/unauthorized-page"
                changeToPage(url)
            }else{
                const url = "/error-page"
                changeToPage(url)
            }
        }).catch(function (error) {
            const url = "/error-page"
            changeToPage(url)
        })
    })

    document.querySelector("#update-todo-page form").addEventListener("submit", function (event) {
        
        event.preventDefault()
        const todo = document.querySelector("#update-todo-page .newTodo").value
        const url = location.pathname
        const todoId = url.split("/")[2]
        
        const newToDo = {
            todo
        }    
    
        fetch(
            "http://localhost:8080/restAPI/toDoLists/" + localStorage.userId + "/" + todoId, {
            method: "PUT",
            headers: {
                "Content-type": "Application/json",
                "Authorization": "Bearer " + localStorage.accessToken
            },
            body: JSON.stringify(newToDo)
        }
        ).then(function (response) {
            const statuscode = response.status
            if (statuscode == 204) {
                const url = "/toDoLists"
                changeToPage(url)
            }else if(statuscode == 401){
                const url = "/unauthorized-page"
                changeToPage(url)
            }else {
                const url = "/error-page"
                changeToPage(url)
            }
        }).catch(function (error) {
            const url = "/error-page"
            changeToPage(url)
        })
    })
    //error handling done
    document.querySelector("#login-page form").addEventListener("submit", function (event) {

        event.preventDefault()
    
        const username = document.querySelector("#login-page .username").value
        const password = document.querySelector("#login-page .userPassword").value
    
        const loginInfo = {
            grant_type: "password",
            Username: username,
            userPassword: password
        }
        fetch(
            
            "http://localhost:8080/restAPI/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginInfo)
            }
        ).then(function(response){
            const statuscode = response.status
            if(statuscode == 200){
                return response.json()
            }
            else if(statuscode == 400){
                return response.json()
            }
            else if(statuscode == 404){
                const error = document.querySelector("#login-page p")
                error.innerText = "Can not find that account!"
            }else{
                const url = "/error-page"
                changeToPage(url)
            }
        }).then(function(body){
            if(body.errors){
                const error = document.querySelector("#login-page p")
                error.innerText = body.errors
            }else{
                login(body.access_token)
                localStorage.userId = body.id_token.userId
                const url = "/"
                changeToPage(url)
            }
        }).catch(function(error){
            const url = "/error-page"
            changeToPage(url)
        })
    })
    
    document.querySelector("#toDoList-page form button").addEventListener("click", function (event) {
        
        event.preventDefault()
        const url = "/update-todo"
        changeToPage(url)
    })
})


function fetchAllBlogposts() {
        
    fetch(
        "http://localhost:8080/restAPI/blogposts"
    ).then(function(response){
        const statuscode = response.status
        if(statuscode == 200){
            return response.json()
        }else{
            const url = "/error-page"
            changeToPage(url)
        }
    }).then(function (blogposts) {
        const ul = document.querySelector("#blogposts-page ul")
        ul.innerText = ""
        for (const blogpost in blogposts) {
            const li = document.createElement("li")
            const anchor = document.createElement("a")
            anchor.innerText = blogposts[blogpost].title
            anchor.setAttribute("href", '/blogposts/' + blogposts[blogpost].blogId)
            li.appendChild(anchor)
            ul.append(li)
        }
    }).catch(function (error) {
        const url = "/error-page"
        changeToPage(url)
    })
}


function fetchBlogpost(blogId) {

    fetch(
        "http://localhost:8080/restAPI/blogposts/"+blogId, {
            headers: {
                "Authorization": "Bearer " + localStorage.accessToken
            }
        }
    ).then(function(response){
        const statuscode = response.status
        if (statuscode == 200) {
            return response.json()
        }else if(statuscode == 401){
            const url = "/unauthorized-page"
            changeToPage(url)
        }
    }).then(function (blogpost) {
        const title = document.querySelector("#blogpost-page .title")
        const content = document.querySelector("#blogpost-page .content")
        const posted = document.querySelector("#blogpost-page .posted")
        const image = document.querySelector("#blogpost-page .image")
        const user = document.querySelector("#blogpost-page .user")

        title.innerText = blogpost.blogpost.title
        content.innerText = blogpost.blogpost.content
        posted.innerText = blogpost.blogpost.posted
        image.innerText = blogpost.blogpost.imageFile
        user.innerText = blogpost.account.account.username

    }).catch(function (error) {
        const url = "/error-page"
        changeToPage(url)
    })
}


function fetchAllToDoLists() {
    
    fetch(
        "http://localhost:8080/restAPI/toDoLists/" + localStorage.userId, {
            headers: {
                "Authorization": "Bearer " + localStorage.accessToken
            }
        }
    ).then(function(response){
        const statuscode = response.status
        if (statuscode == 200){
            return response.json()
        }else if(statuscode == 401){
            const url = "/unauthorized-page"
            changeToPage(url)
        }else{
            const url = "/error-page"
            changeToPage(url)
        }
    }).then(function(toDoLists){
        const ul = document.querySelector("#toDoLists-page ul")
        ul.innerText = ""
        for (const toDo in toDoLists) {
            const li = document.createElement("li")
            const a = document.createElement("a")
            a.innerText = toDoLists[toDo].toDo
            a.setAttribute("href", '/toDoLists/' + toDoLists[toDo].todoId)
            li.appendChild(a)
            ul.append(li)
        }
    }).catch(function (error) {
        const url = "/error-page"
        changeToPage(url)
    })
}

function fetchToDo(todoId) {

    fetch(
        "http://localhost:8080/restAPI/toDoLists/" + localStorage.userId + "/" + todoId, {
            headers: {
                "Authorization": "Bearer " + localStorage.accessToken
            }
        }
    ).then(function (response) {
        const statuscode = response.status
        if (statuscode == 200) {
            return response.json()
        }else if(statuscode == 401){
            const url = "/unauthorized-page"
            changeToPage(url)
        }else {
            const url = "/error-page"
            changeToPage(url)
        }
    }).then(function (todo) {

        const toDo = document.querySelector("#toDoList-page .toDo")
        toDo.innerText = todo.toDo
    }).catch(function (error) {
        const url = "/error-page"
        changeToPage(url)
    })
}



