document.addEventListener("DOMContentLoaded", function(){

    const password = document.getElementById('password')
    const rePassword = document.getElementById('rePassword')
    const form = document.getElementById("signUpForm")
    const validationErrors = []

    function validate(){

        if(password.value != rePassword.value){
            validationErrors.push("Password don't match!")
        }
        window.alert("Don't match!")
        validationErrors = 0
    }

    form.addEventListener("submit", function(event){

        validate()

    })
})