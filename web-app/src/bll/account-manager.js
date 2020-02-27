const accountRepo = require('../dal/account-repository')

function getValidationErrors(username){

    const errors = []

    if(username.length <= 5){
        errors.push("Username to short!")
    }
    if(username.length >= 20){
        errors.push("Username to long!")
    }
    return errors
}

exports.getAccountById = function(personId){
   
    accountRepo.getAccountById(personId, function(errors, account){
        callback(errors, account)
    })
}

exports.getAccount = function(username, userPassword, callback){

    accountRepo.getAccount(username, userPassword, function(errors, account){
        callback(errors, account)
    })
}


exports.createAccount = function(username, email, userPassword, callback){

    const errors = getValidationErrors(username)
    if(errors.length > 0){
        callback(errors)
        return
    }
    accountRepo.createAccount(username, email, userPassword, function(errors, account){
        callback(errors, account)
    })
}