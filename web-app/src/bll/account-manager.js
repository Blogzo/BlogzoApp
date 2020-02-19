const accountRepo = require('../dal/account-repository')

exports.getAllAccounts = function(callback){

    accountRepo.getAllAccounts(function(errors, accounts){
        callback(errors, accounts)
    })
}

exports.getAccount = function(callback){

    accountRepo.getAccount(function(errors, account){
        callback(errors, account)
        console.log("account", account)
    })
}


exports.createAccount = function(callback){

    accountRepo.createAccount(function(errors, account){
        callback(errors, account)
    })
}