document.addEventListener("DOMContentLoaded", function () {

    document.querySelector("#create-account-page form").addEventListener("submit", function (event) {

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
        ).then(function (response) {
            if (response.status(200).end()) {
                console.log("createAccountResponse", response)
                return response.json()
                //Update view
            } else {
                //Display error
            }
        }).catch(function (error) {
            console.log(error)
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
        ).then(function (response) {
            const statusCode = response.status
            console.log(statusCode)
            if (statusCode == 201) {
                console.log("createTodoResponse:", response)
                const url = "/toDolists"
                changeToPage(url)
            } else {
                console.log(statusCode)
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
        console.log("todoId", todoId)

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
            } else {
                console.log(statuscode)
            }
        }).catch(function (error) {
            console.log("error", error)
            const url = "/error-page"
            changeToPage(url)
        })
    })

    document.querySelector("#update-todo-page form").addEventListener("submit", function (event) {
        console.log("inside update todo")
        const todo = document.querySelector("#update-todo-page .newTodo").value
        const url = location.pathname
        const todoId = url.split("/")[2]
    
    
        const newToDo = {
            todo
        }
    
        event.preventDefault()
    
    
        fetch(
            "http://localhost:8080/restAPI/toDoLists/" + todoId, {
            method: "PUT",
            headers: {
                "Content-type": "Application/json"
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
            } else {
                console.log(statuscode)
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
        const userpassword = document.querySelector("#login-page .userPassword").value
    
        fetch(
            "http://localhost:8080/restAPI/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "grant_type=userPassword&username=" + username + "&userPassword" + userpassword
        }
        ).then(function (response) {
            console.log("loginResponse", response)
            const statuscode = response.status
            if (statuscode == 200) {
                return response.json()
            } else {
                console.log(statuscode)
            }
        }).then(function (body) {
            console.log("bodyResponse", body)
            //Read out info about user account from id_token
            login(body.access_token)
            //console.log(accessToken)
    
        }).catch(function (error) {
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

    fetch(
        "http://localhost:8080/restAPI/blogposts"
    ).then(function (response) {
        const statuscode = response.status
        if (statuscode == 200) {
            return response.json()
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
    })
}


function fetchBlogpost(blogId) {

    fetch(
        "http://localhost:8080/restAPI/blogposts/" + blogId
    ).then(function (response) {
        const statuscode = response.status
        if (statuscode == 200) {
            return response.json()
        } else {
            //error
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
    })
}


function fetchAllToDoLists() {

    fetch(
        "http://localhost:8080/restAPI/toDoLists"
    ).then(function (response) {
        const statuscode = response.status
        if (statuscode == 200) {
            return response.json()
        }
    }).then(function (toDoLists) {
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
    })
}

function fetchToDo(todoId) {

    fetch(
        "http://localhost:8080/restAPI/toDoLists/" + todoId
    ).then(function (response) {
        const statuscode = response.status
        if (statuscode == 200) {
            return response.json()
        } else {
            //error
            console.log(statuscode)
        }
    }).then(function (todo) {
        console.log("todo:", todo)
        const toDo = document.querySelector("#toDoList-page .toDo")
        toDo.innerText = todo.toDo
    }).catch(function (error) {
        console.log(error)
    })
}



