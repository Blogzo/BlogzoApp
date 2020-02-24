document.addEventListener("DOMContentLoaded", function(){

    const password = document.getElementById('password')
    const rePassword = document.getElementById('rePassword')
    const form = document.getElementById("signUpForm")
    const validationErrors = []

    

    form.addEventListener("submit", function(event){

        if(password.value != rePassword.value){
            validationErrors.push("Password does not match!")
            window.alert(validationErrors)
            validationErrors = 0
            event.preventDefault()
        }
    
    })
})