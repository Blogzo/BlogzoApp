document.addEventListener("DOMContentLoaded", function(){

  

})

function changeToPage(url){

    const currentPageDiv = document.getElementsByClassName("current-page")[0]
    if(currentPageDiv){
        currentPageDiv.classList.remove("current-page")
    }

    switch(url){

        case "/":
            document.getElementById("home-page").classList.add("current-page")
        case "/sign-up":
            document.getElementById("signUp-page").classList.add("current-page")
        case "/login":
            document.getElementById("login-page").classList.add("current-page")
        case "/blogposts":
            document.getElementById("blogposts-page").classList.add("current-page")
        case "/create-blogpost":
            document.getElementById("create-blogposts-page").classList.add("current-page")
        case "/toDoLists":
            document.getElementById("toDoLists-page").classList.add("current-page")
        default:
            document.getElementById("error-page").classList.add("current-page")
            return
    }
}