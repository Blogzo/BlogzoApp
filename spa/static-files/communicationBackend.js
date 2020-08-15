document.addEventListener("DOMContentLoaded", function () {
    
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
                window.location.replace("/error-page")
            }
        }).then(function(model) {
            const url = "/login"
            changeToPage(url)
        }).catch(function(errors) {
            window.location.replace("/error-page")
        })
    })

    document.querySelector("#create-todo-page form").addEventListener("submit", function (event) {
        
        event.preventDefault()
        
        const todo = document.querySelector("#create-todo-page .todo").value
        const newToDo = {
            todo
        }

        fetch(
            "http://localhost:8080/restAPI/toDoItems", {
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
                const url = "/toDoItems"
                changeToPage(url)
            }else if(statusCode == 401){
                window.location.replace("/unauthorized-page")
            }else{
                window.location.replace("/error-page")
            }
        }).catch(function (error) {
            window.location.replace("/error-page")
        })
    })

    document.querySelector("#toDoItem-page form").addEventListener("submit", function (event) {
        
        event.preventDefault()

        const url = location.pathname
        const todoId = url.split("/")[2]
        
        fetch(
            "http://localhost:8080/restAPI/toDoItems/" + todoId, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.accessToken
            }
        }
        ).then(function (response) {
            const statuscode = response.status
            if (statuscode == 204) {
                const url = "/toDoItems"
                changeToPage(url)
            }else if(statuscode == 401){
                window.location.replace("/unauthorized-page")
            }else{
                window.location.replace("/error-page")
            }
        }).catch(function (error) {
            window.location.replace("/error-page")
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
            "http://localhost:8080/restAPI/toDoItems/" + todoId, {
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
                const url = "/toDoItems"
                changeToPage(url)
            }else if(statuscode == 401){
                window.location.replace("/unauthorized-page")
            }else {
                window.location.replace("/error-page")
            }
        }).catch(function (error) {
            window.location.replace("/error-page")
        })
    })

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
                window.location.replace("/error-page")
            }
        }).then(function(body){
            
            if(body.errors){
                const error = document.querySelector("#login-page p")
                error.innerText = body.errors
            }else{
                login(body.access_token)
                const url = "/"
                changeToPage(url)
            }
        }).catch(function(error){
            
            window.location.replace("/error-page")
        })
    })
    
    document.querySelector("#toDoItem-page form button").addEventListener("click", function (event) {
        
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
            window.location.replace("/error-page")
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
        window.location.replace("/error-page")
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
            window.location.replace("/unauthorized-page")
        }
    }).then(function (blogpost) {
        const title = document.querySelector("#blogpost-page .title")
        const content = document.querySelector("#blogpost-page .content")
        const posted = document.querySelector("#blogpost-page .posted")
        const image = document.querySelector("#blogpost-page .image")

        title.innerText = blogpost.blogpost.title
        content.innerText = blogpost.blogpost.content
        posted.innerText = blogpost.blogpost.posted
        image.innerText = blogpost.blogpost.imageFile

    }).catch(function (error) {
        window.location.replace("/error-page")
    })
}


function fetchAllToDoItems() {
    
    fetch(
        "http://localhost:8080/restAPI/toDoItems/", {
            headers: {
                "Authorization": "Bearer " + localStorage.accessToken
            }
        }
    ).then(function(response){
        const statuscode = response.status
        if (statuscode == 200){
            return response.json()
        }else if(statuscode == 401){
            window.location.replace("/unauthorized-page")

        }else{
            window.location.replace("/error-page")
        }
    }).then(function(toDoItems){
        
        const ul = document.querySelector("#toDoItems-page ul")
        ul.innerText = ""
        for (const toDo in toDoItems) {
            const li = document.createElement("li")
            const a = document.createElement("a")
            a.innerText = toDoItems[toDo].todo
            a.setAttribute("href", '/toDoItems/' + toDoItems[toDo].todoId)
            li.appendChild(a)
            ul.append(li)
        }
    }).catch(function (error) {
        window.location.replace("/error-page")
    })
}

function fetchToDo(todoId) {

    fetch(
        "http://localhost:8080/restAPI/toDoItems/" + todoId, {
            headers: {
                "Authorization": "Bearer " + localStorage.accessToken
            }
        }
    ).then(function (response) {
        const statuscode = response.status
        if (statuscode == 200) {
            return response.json()
        }else if(statuscode == 401){
            window.location.replace("/unauthorized-page")
        }else {
            window.location.replace("/error-page")
        }
    }).then(function (todo) {
        const toDo = document.querySelector("#toDoItem-page .toDo")
        toDo.innerText = todo.todo
    }).catch(function (error) {
        window.location.replace("/error-page")
    })
}



