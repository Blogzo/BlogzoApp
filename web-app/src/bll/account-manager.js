const accountRepo = require('../dal/account-repository')

function isLoggedIn(ifIsLoggedIn){

    if(!ifIsLoggedIn){

    }
    return errors
}


exports.getAllAccounts = function(callback){

    accountRepo.getAllAccounts(function(errors, accounts){
        callback(errors, accounts)
    })
}

exports.getAccountById = function(personId, callback){
   
    accountRepo.getAccountById(personId, function(errors, account){
        callback(errors, account)
    })
}

exports.getAccount = function(username, userPassword, callback){

    accountRepo.getAccount(username, userPassword, function(errors, account){
        console.log("account", account)
        callback(errors, account)
    })
}


exports.createAccount = function(username, email, userPassword, callback){

    accountRepo.createAccount(username, email, userPassword, function(errors, account){
        callback(errors, account)
    })
}