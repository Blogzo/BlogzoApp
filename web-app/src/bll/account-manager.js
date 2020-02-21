const accountRepo = require('../dal/account-repository')


exports.getAllAccounts = function(callback){

    accountRepo.getAllAccounts(function(errors, accounts){
        callback(errors, accounts)
    })
}

exports.getAccountById = function(id){
   
    if(isLoggedIn){
        return accountRepo.getAccountById(id)
    }else{
        throw "Unauthorized!"
    } 
}

exports.getAccount = function(callback){

    accountRepo.getAccount(function(errors,accounts){
        callback(errors, accounts)
    })
    
}


exports.createAccount = function(callback){

    accountRepo.createAccount(function(errors, account){
        callback(errors, account)
    })
}