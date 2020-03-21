document.addEventListener("DOMContentLoaded", function () {

    document.querySelector("#create-account-page form").addEventListener("submit", function (event) {

        event.preventDefault()

        const username = document.querySelector("#create-account-page .username").value
        const email = document.querySelector("#create-account-page .email").value
        const userPassword = document.querySelector("#create-account-page .userPassword").value
        const userPassword2 = document.querySelector("#create-account-page .userPassword2").value
        //const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

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
                //"CSRF-Token": token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        }
        ).then(function(response){
            console.log("createAccountResponse", response)
            const statuscode = response.status
            if(statuscode == 201){
                const url = "/login"
                changeToPage(url)
            }else{
                console.log(statuscode)
                const url = "/error-page"
                changeToPage(url)
            }
        }).catch(function (error) {
            console.log(error)
            const url = "/error-page"
            changeToPage(url)
            //Update the view and display error
        })
    })

    document.querySelector("#create-todo-page form").addEventListener("submit", function (event) {
        console.log("inside createtodo")
        event.preventDefault()

        const todo = document.querySelector("#create-todo-page .todo").value

        const newToDo = {
            todo
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
            console.log("createTodoResponse:", response)
            const statusCode = response.status
            console.log(statusCode)
            if (statusCode == 201) {
                console.log("createTodoResponse:", response)
                const url = "/toDolists"
                changeToPage(url)
            }else if(statuscode == 401){
                const url = "/unauthorized-page"
                changeToPage(url)
            }else{
                console.log(statusCode)
                const url = "/error-page"
                changeToPage(url)
            }
        }).catch(function (error) {
            console.log(error)
            const url = "/error-page"
            changeToPage(url)
        })
    })

    document.querySelector("#toDoList-page form").addEventListener("submit", function (event) {
        console.log("inside deleteTodo")
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
            console.log("deleteResponse", response)
            const statuscode = response.status
            console.log("statuscode", statuscode)
            if (statuscode == 204) {
                const url = "/toDoLists"
                changeToPage(url)
            }else if(statuscode == 401){
                const url = "/unauthorized-page"
                changeToPage(url)
            }else{
                console.log(statuscode)
                const url = "/error-page"
                changeToPage(url)
            }
        }).catch(function (error) {
            console.log("error", error)
            const url = "/error-page"
            changeToPage(url)
        })
    })

    document.querySelector("#update-todo-page form").addEventListener("submit", function (event) {
        event.preventDefault()
        console.log("inside update todo")
        const todo = document.querySelector("#update-todo-page .newTodo").value
        const url = location.pathname
        const todoId = url.split("/")[2]
        
        const newToDo = {
            todo
        }    
    
        fetch(
            "http://localhost:8080/restAPI/toDoLists/" + todoId, {
            method: "PUT",
            headers: {
                "Content-type": "Application/json",
                "Authorization": "Bearer " + localStorage.accessToken
            },
            body: JSON.stringify(newToDo)
        }
        ).then(function (response) {
            console.log("updateResponse:", response)
            const statuscode = response.status
            console.log("statuscode", statuscode)
            if (statuscode == 204) {
                const url = "/toDoLists"
                changeToPage(url)
            }else if(statuscode == 401){
                const url = "/unauthorized-page"
                changeToPage(url)
            }else {
                console.log(statuscode)
                const url = "/error-page"
                changeToPage(url)
            }
        }).catch(function (error) {
            console.log("error", error)
            const url = "/error-page"
            changeToPage(url)
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
            console.log("loginResponse", response)
            const statuscode = response.status
            if(statuscode == 200){
                return response.json()
            }else if(statuscode == 404){
                console.log("usernmae to short or password do not match")
            }else{
                console.log(statuscode)
                const url = "/error-page"
                changeToPage(url)
            }
        }).then(function(body){
            console.log("bodyResponse", body)
            
            login(body.access_token)
            const url = "/"
            changeToPage(url)
    
        }).catch(function(error){
            console.log(error)
            
        })
    })
    
    document.querySelector("#toDoList-page form button").addEventListener("click", function (event) {
        console.log("Inside button click")
        event.preventDefault()
        const url = "/update-todo"
        changeToPage(url)
    })
})


function fetchAllBlogposts() {
    console.log("inside fetch")
    
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
        console.log(error)
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
        console.log(statuscode)
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
        console.log(error)
        const url = "/error-page"
        changeToPage(url)
    })
}


function fetchAllToDoLists() {
    
    console.log("accesstoken", localStorage.accessToken)
    fetch(
        "http://localhost:8080/restAPI/toDoLists", {
            headers: {
                "Authorization": "Bearer " + localStorage.accessToken
            }
        }
    ).then(function(response){
        const statuscode = response.status
        console.log(statuscode)
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
        console.log("toDoLists", toDoLists)
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
        console.log(error)
        const url = "/error-page"
        changeToPage(url)
    })
}

function fetchToDo(todoId) {

    fetch(
        "http://localhost:8080/restAPI/toDoLists/" + todoId, {
            headers: {
                "Authorization": "Bearer " + localStorage.accessToken
            }
        }
    ).then(function (response) {
        const statuscode = response.status
        console.log(statuscode)
        if (statuscode == 200) {
            return response.json()
        }else if(statuscode == 401){
            const url = "/unauthorized-page"
            changeToPage(url)
        }else {
            //error
            console.log(statuscode)
            const url = "/error-page"
            changeToPage(url)
        }
    }).then(function (todo) {
        console.log("todo:", todo)
        const toDo = document.querySelector("#toDoList-page .toDo")
        toDo.innerText = todo.toDo
    }).catch(function (error) {
        console.log(error)
        const url = "/error-page"
        changeToPage(url)
    })
}



